<?php
namespace HimaPro;

class Router {
  private static $routes = array();
  public static $appPath = "";

  public static function setup($appPath = null){
    if ($appPath) {
      self::$appPath = $appPath;
    }
  }
  public static function any($path, $callback) {
    self::$routes['GET'][self::$appPath.$path] = $callback;
    self::$routes['POST'][self::$appPath.$path] = $callback;
    self::$routes['PUT'][self::$appPath.$path] = $callback;
    self::$routes['DELETE'][self::$appPath.$path] = $callback;
    self::$routes['PATCH'][self::$appPath.$path] = $callback;
    self::$routes['HEAD'][self::$appPath.$path] = $callback;
  }
  public static function get($path, $callback) {
    self::$routes['GET'][self::$appPath.$path] = $callback;
  }
  public static function post($path, $callback) {
    self::$routes['POST'][self::$appPath.$path] = $callback;
  }
  public static function put($path, $callback) {
    self::$routes['PUT'][self::$appPath.$path] = $callback;
  }
  public static function delete($path, $callback) {
    self::$routes['DELETE'][self::$appPath.$path] = $callback;
  }
  public static function patch($path, $callback) {
    self::$routes['PATCH'][self::$appPath.$path] = $callback;
  }
  public static function head($path, $callback) {
    self::$routes['HEAD'][self::$appPath.$path] = $callback;
  }
  public static function run() {
    $request_path = explode("?", $_SERVER["REQUEST_URI"])[0];
    $request_method = $_SERVER['REQUEST_METHOD'];
    foreach (self::$routes[$request_method] as $route_path => $callback) {
      if($request_path == self::$appPath){
        call_user_func_array($callback, array());
        exit;
      }
      $pattern = str_replace('/', '\/', $route_path);
      $pattern = preg_replace('/({\w+})/', '([^\/]+)', $pattern);
      $pattern = '/^' . $pattern . '$/';
      if (preg_match($pattern, $request_path, $params)) {
        array_shift($params);
        call_user_func_array($callback, $params);
        exit();
      }
    }
    if ($_SERVER["REQUEST_URI"]) {
      if (self::$routes[$request_method][self::$appPath."/404"]) {
        call_user_func_array(self::$routes[$request_method][self::$appPath."/404"], array());
      } else {
        echo "404 not found";
        http_response_code(404);
      }
    }
  }
}
