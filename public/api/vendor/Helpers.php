<?php
namespace HimaPro;



class Helpers {
  public static function response ($status, $value) {
    $data = array(
      "ok" => $status,
      "result" => $value
    );
    return preg_replace_callback ('/^ +/m', function ($m) {
      return str_repeat (' ', strlen ($m[0]) / 2);
    }, json_encode ($data, JSON_PRETTY_PRINT));
  }
  
  public static function randStr($length = 10) {
    $chars = '0123456789abcdefABCDEF';
    $charsLnth = strlen($chars);
    $randStr = 'a';
    for ($i = 0; $i < $length - 1; $i++) {
      $randStr .= $chars[rand(0, $charsLnth - 1)];
    }
    return $randStr;
  }

  public static function containsKeyValue($array, $key, $value){
    foreach ($array as $item) {
      if (isset($item->$key) && $item->$key === $value) {
       return true;
      }
    }
    return false;
  }

  public static function pager($arr, $perPage, $page) {
    $arrs = array_chunk($arr, (int)$perPage);
    if ($page <= count($arrs)) {
      return array(
        "total-pages" => count($arrs) > 0 ? count($arrs) : 1,
        "total-items" => count($arr),
        "per-page" => (int)$perPage,
        "current-page" => (int)$page,
        "items" => $arrs[(int)$page-1] ?? (object)[]
      );
    } else {
      return "page $page not found";
    }
    
  }
  
  public static function auth() {
    if (isset($_COOKIE["USER"]) && isset($_COOKIE["PASS"])) {
      $credentials = (object) json_decode(file_get_contents("./Users.json"));
      $result = false;
      $i = 0;
      foreach ($credentials as $credential) {
        if ($_COOKIE["USER"]==$credential->USER && password_verify($_COOKIE["PASS"], $credential)) {
          $result = true;
        }
        $i = $i + 1;
      }
      if ($result == true) {
        return $result;
      } else {
        echo self::response(false, "wrong username or password");
        exit();
      }
    } else {
      echo self::response(false, "not authorized");
      exit();
    }
  }

}
