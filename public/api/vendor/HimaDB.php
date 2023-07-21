<?php

namespace HimaPro;

class HimaDB {

  # initialize
  private static $path;
  public static function setup($path) {
    if (!file_exists($path)) {
      mkdir($path, 0777, true);
    }
    self::$path = $path;
  }

  # public preview functions
  public static function list($index = 0, $perPage = 50, $subPath = null) {
    $dirPath = self::getDirPath($subPath);
    if (!file_exists($dirPath)) {
      return array();
    }
    $items = array();
    $files = glob($dirPath . '/*');
    foreach ($files as $file) {
      if (is_dir($file)) {
        $items[] = array(
          'name' => basename($file),
          'modified' => filemtime($file),
          'type' => 'table',
        );
      } else {
        $key = basename($file, '.json');
        $items[] = array(
          'name' => $key,
          'modified' => filemtime($file),
          'type' => 'item'
        );
      }
    }
    return self::pager($index, $perPage, $items);
  }
  public static function get($key, $subPath = null) {
    $filePath = self::getFilePath($key, $subPath);
    if (!file_exists($filePath)) {
      return null;
    }
    $json = file_get_contents($filePath);
    $data = json_decode($json, true);
    return array(
      "content" => $data[0],
      "modified" => filemtime($filePath)
    );
  }
  public static function exist($key, $subPath = null) {
    $filePath = self::getFilePath($key, $subPath);
    if (!file_exists($filePath)) {
      return false;
    } else {
      return true;
    }
  }
  public static function search($query, $index = 0, $perPage = 50, $subPath = null) {
    $founds = self::findStringInFiles(self::getDirPath($subPath), $query);
    return self::pager($index, $perPage, $founds);
  }
  public static function searchFile($key, $query, $subPath = null) {
    $filename = self::getFilePath($key, $subPath);
    if (file_exists($filename)) {
      $handle = fopen($filename, "r");
      $buffer_size = 40960;
      $buffer = "";
      while (!feof($handle)) {
        $buffer .= fread($handle, $buffer_size);
        $pos = strpos($buffer, $query);
        if ($pos !== false) {
          fclose($handle);
          return true;
        }
        $buffer = substr($buffer, $buffer_size / 2);
      }
      fclose($handle);
      return false;
    } else {
      return "not found";
    }
  }

  # public control functions
  public static function add($key, $value, $subPath = null) {
    $filePath = self::getFilePath($key, $subPath);
    if (file_exists($filePath)) {
      return false;
    }
    self::createSubPath($subPath);
    $data = array($value);
    $json = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filePath, $json);
    return true;
  }
  public static function update($key, $value, $subPath = null) {
    $filePath = self::getFilePath($key, $subPath);
    self::createSubPath($subPath);
    $data = array($value);
    $json = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filePath, $json);
    return true;
  }
  public static function rename($old, $new, $subPath = null) {
    $oldName = self::getFilePath($old, $subPath);
    $newName = self::getFilePath($new, $subPath);
    if (file_exists($oldName)) {
      if (file_exists($newName)) {
        return "new name already exist";
      } else {
        rename($oldName, $newName);
        return "success";
      }
    } else {
      return "not found";
    }
  }
  public static function delete($key, $subPath = null) {
    $filePath = self::getFilePath($key, $subPath);
    if (!file_exists($filePath)) {
      return false;
    }
    unlink($filePath);
    self::clean($subPath);
    return true;
  }
  public static function deleteList($subPath = null) {
    $dirPath = self::getDirPath($subPath);
    if (!file_exists($dirPath)) {
      return false;
    }
    system('rm -rf -- ' . escapeshellarg($dirPath), $retval);
    self::clean($subPath);
    return true;
  }

  # control functions
  private function clean($subPath = null) {
    $dirPath = self::getDirPath($subPath);
    if (!file_exists($dirPath)) {
      return;
    }
    $files = glob($dirPath . '/*');
    foreach ($files as $file) {
      if (is_dir($file)) {
        self::clean($subPath . '/' . basename($file));
        if (count(glob($file . '/*')) === 0) {
          rmdir($file);
        }
      }
    }
    if (count(glob($dirPath . '/*')) === 0) {
      rmdir($dirPath);
    }
  }
  private static function pager($index, $perPage, $arr) {
    $arrs = array_chunk($arr, (int)$perPage);
    return array(
      "total-pages" => count($arrs) > 0 ? count($arrs) : 1,
      "total-items" => count($arr),
      "per-page" => (int)$perPage,
      "current-page" => (int)$index+1,
      "items" => $arrs[(int)$index] ?? (object)[]
    );
  }
  private static function findStringInFiles($folder, $searchString) {
    $results = array();
    $files = scandir($folder);
    foreach ($files as $file) {
      if ($file != '.' && $file != '..') {
        $filePath = $folder . DIRECTORY_SEPARATOR . $file;
        if (is_dir($filePath)) {
          $results = array_merge($results, self::findStringInFiles($filePath, $searchString));
        } else {
          $handle = fopen($filePath, 'r');
          while (!feof($handle)) {
            $chunk = fread($handle, 8192);
            if (strpos($chunk, $searchString) !== false) {
              $name = explode(".", end(explode("/", $file)))[0];
              $subPath = str_replace(self::$path, "", dirname($filePath));
              $results[] = array(
                'name' => $name,
                'modified' => filemtime($filePath),
                'subPath' => $subPath == "" ? "/" : $subPath
              );
              break;
            }
          }
          fclose($handle);
        }
      }
    }
    return $results;
  }
  private static function getDirPath($subPath = null) {
    if ($subPath === null) {
      return self::$path;
    }
    return self::$path . '/' . trim($subPath, '/');
  }
  private function getFilePath($key, $subPath = null) {
    $dirPath = self::getDirPath($subPath);
    return $dirPath . '/' . $key . '.json';
  }
  private function createSubPath($subPath = null) {
    if ($subPath === null) {
      return;
    }
    $fullPath = self::$path . '/' . trim($subPath, '/');
    if (!file_exists($fullPath)) {
      mkdir($fullPath, 0777, true);
    }
  }
  
}
