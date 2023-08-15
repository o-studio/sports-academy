<?php

use HimaPro\Router;
use HimaPro\Helpers;

Router::middleware("api", function () {
  session_destroy();
  session_name("user");
  session_start();
  error_reporting(0);
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
});

Router::middleware("auth", function ($token=null) {
  if(isset($_SESSION["TOKEN"]) && isset($_GET["token"]) && $_SESSION["TOKEN"] == $_GET["token"]) return;
  if (isset($_SESSION["USER"]) && isset($_SESSION["PASS"]) && gettype($token) == "string") {
    $credentials = json_decode(file_get_contents("./vendor/Users.json"));
    $result = false;
    $i = 0;
    foreach ($credentials as $credential) {
      if ($_SESSION["USER"] == $credential->USER && password_verify($_SESSION["PASS"], $credential->PASS)) {
        $_SESSION["TOKEN"] = $token;
        $result = true;
        return;
      }
      $i++;
    }

    if ($result == false) {
      echo Helpers::response(false, "wrong username or password");
      exit();
    }
  } else {
    echo Helpers::response(false, "not authorized");
    exit();
  }
});

