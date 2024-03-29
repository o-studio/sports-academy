<?php

namespace HimaPro;

class Helpers {
  public static function response(bool $status, $value) {
    $data = array(
      "ok" => $status,
      "result" => $value
    );
    return preg_replace_callback('/^ +/m', function ($m) {
      return str_repeat(' ', strlen($m[0]) / 2);
    }, json_encode($data, JSON_PRETTY_PRINT));
  }

  public static function randStr(int $length = null, string $chars = null) {
    $length = $length ?? 10;
    $chars = $chars ?? '0123456789abcdefABCDEF';
    $charsLnth = strlen($chars);
    $randStr = 'a';
    for ($i = 0; $i < $length - 1; $i++) {
      $randStr .= $chars[rand(0, $charsLnth - 1)];
    }
    return $randStr;
  }

  public static function containsKeyValue($array, $key, $value) {
    foreach ($array as $item) {
      if (isset($item->$key) && $item->$key === $value) {
        return true;
      }
    }
    return false;
  }

  public static function pager(array $arr, $perPage, $page) {
    $arrs = array_chunk($arr, (int) $perPage);
    if ($page <= count($arrs) || count($arrs) == "0") {
      return (object) [
        "total-pages" => count($arrs) > 0 ? count($arrs) : 1,
        "total-items" => count($arr),
        "per-page" => (int) $perPage,
        "current-page" => (int) $page,
        "items" => $arrs[(int) $page - 1] ?? []
      ];
    } else {
      return "page $page not found";
    }
  }

}
