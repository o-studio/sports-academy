<?php

namespace HimaPro;

class Router {

  public static $routes = array();
  public static $middlewares = array();
  private static $appPath = "";
  private static $groupPrefex = "";

  public static function setup($appPath = null) {
    $scriptPath = explode("/", $_SERVER["SCRIPT_NAME"]);
    array_pop($scriptPath);
    $scriptPath = str_replace($_SERVER["DOCUMENT_ROOT"], "", implode("/", $scriptPath));
    $appPath = $appPath ?? $scriptPath;
    self::$appPath = $appPath;
  }

  public static function any($path, $callback) {
    $path = self::$appPath . self::$groupPrefex . $path;
    self::$routes['GET'][$path] = $callback;
    self::$routes['POST'][$path] = $callback;
    self::$routes['PUT'][$path] = $callback;
    self::$routes['DELETE'][$path] = $callback;
    self::$routes['PATCH'][$path] = $callback;
    self::$routes['HEAD'][$path] = $callback;
  }

  public static function get($path, $callback) {
    $path = self::$appPath . self::$groupPrefex . $path;
    self::$routes['GET'][$path] = $callback;
    return new static;
  }

  public static function post($path, $callback) {
    $path = self::$appPath . self::$groupPrefex . $path;
    self::$routes['POST'][$path] = $callback;
  }

  public static function put($path, $callback) {
    $path = self::$appPath . self::$groupPrefex . $path;
    self::$routes['PUT'][$path] = $callback;
  }

  public static function delete($path, $callback) {
    $path = self::$appPath . self::$groupPrefex . $path;
    self::$routes['DELETE'][$path] = $callback;
  }

  public static function patch($path, $callback) {
    $path = self::$appPath . self::$groupPrefex . $path;
    self::$routes['PATCH'][$path] = $callback;
  }

  public static function head($path, $callback) {
    $path = self::$appPath . self::$groupPrefex . $path;
    self::$routes['HEAD'][$path] = $callback;
  }
  
  public static function middleware($name, $callback = null) {
    if (gettype($name) == "string" && is_callable($callback)) {
      self::$middlewares[$name] = $callback;
    } else if (gettype($name) == "array") {
      foreach ($name as $n) {
        call_user_func_array(self::$middlewares[$n], gettype($callback[$n]) == "array" ? $callback[$n] : array());
      }
    }
  }

  public static function group($groupPrefex, $callback) {
    self::$groupPrefex = $groupPrefex;
    call_user_func_array($callback, array());
    self::$groupPrefex = "";
  }

  public static function run() {
    $request_path = explode("?", $_SERVER["REQUEST_URI"])[0];
    $request_method = $_SERVER['REQUEST_METHOD'];
    foreach (self::$routes[$request_method] as $route_path => $callback) {
      if ($request_path == self::$appPath) {
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
      if (self::$routes[$request_method][self::$appPath . "/404"]) {
        call_user_func_array(self::$routes[$request_method][self::$appPath . "/404"], array());
      } else {
        echo "404 not found";
        http_response_code(404);
      }
    }
  }
}
