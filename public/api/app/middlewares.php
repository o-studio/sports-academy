<?php

use HimaPro\Router;
use HimaPro\Helpers;

Router::middleware("api", function () {
  // session_start();
  error_reporting(0);
  header ('Access-Control-Allow-Origin: *');
  header ('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
  header ('Access-Control-Allow-Headers: Accept, Content-Type, Access-Control-Allow-Headers, X-Requested-With');
  header('Content-Type: application/json');
});

Router::middleware("auth", function () {
  $credentials = json_decode(file_get_contents("./vendor/Users.json"));
  foreach ($credentials as $credential) {
    if (isset($_GET["token"]) && $_GET["token"] == $credential->TOKEN) {
      $_SESSION["result"] = "auth success";
      $result = true;
      return;
    }
  }
  if (isset($_SESSION["USER"]) && isset($_SESSION["PASS"])) {
    $result = false;
    foreach ($credentials as $credential) {
      if ($_SESSION["USER"] == $credential->USER && password_verify($_SESSION["PASS"], $credential->PASS)) {
        $_SESSION["result"] = $credential->TOKEN;
        $result = true;
        return;
      }
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
