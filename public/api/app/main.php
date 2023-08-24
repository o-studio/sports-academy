<?php

use HimaPro\Router;
use HimaPro\Helpers;
use AdelDev\AdelSQL;
use HimaPro\I18n;

Router::any('/', function () {
  echo Helpers::response(false, array(
    "message" => I18n::welcome,
    "try" => array(
      "/api/users",
      "/api/user/1",
    ),
  ));
});

Router::any('/404', function () {
  echo Helpers::response(false, I18n::e404);
});

Router::group("/auth", function () {
  Router::any('/status', function () {
    if (isset($_GET["token"])) {
      Router::middleware(["auth"], [
        "auth" => ["token", $_GET["token"], function ($ok, $result) {
          echo Helpers::response($ok, $result);
        }]
      ]);
    } else {
      echo Helpers::response(false, I18n::need_token);
    }
  });

  Router::post('/login', function () {
    $data = json_decode(file_get_contents("php://input", true));
    if (!isset($data->email) && !isset($data->password)) {
      echo Helpers::response(false, I18n::need_logins);
    } else if (!isset($data->email)) {
      echo Helpers::response(false, I18n::need_email);
    } else if (!isset($data->password)) {
      echo Helpers::response(false, I18n::need_password);
    } else {
      // Router::middleware(["validate"], [
      //   "validate" => ["login", $data, function(){}]
      // ]);
      Router::middleware(["auth"], [
        "auth" => [$data->email, $data->password, function ($ok, $result) {
          echo Helpers::response($ok, $result);
        }]
      ]);
    }
  });

  Router::post('/logout', function () {
    if (isset($_GET["token"])) {
      foreach (AdelSQL::GetAll("users", "/admins") as $user) {
        if ($user->content->token == $_GET["token"]) {
          $user->content->token = null;
          $done = AdelSQL::Update("users", $user->name, $user->content, "/admins");
          echo Helpers::response($done, I18n::success_logout);
        }
      }
    } else {
      echo Helpers::response(false, I18n::need_token);
    }
  });

  Router::post('/register', function () {
    $token = Helpers::randStr(50, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
    $username = Helpers::randStr(10);
    $data = json_decode(file_get_contents("php://input", true));
    // Router::middleware(["validate"], [
    //   "validate" => ["register", $data, function(){}]
    // ]);
    $account = (object) [
      "name" => $data->name,
      "email" => $data->email,
      "username" => $username,
      "password" => password_hash($data->password, PASSWORD_DEFAULT),
      "token" => $token,
      "role" => 0
    ];
    foreach (AdelSQL::GetAll("users", "/admins") as $user) {
      if ($user->content->email == $data->email) {
        echo Helpers::response(false, I18n::email_exist);
        return;
      }
    }
    $done = AdelSQL::insert("users", $username, $account, "/admins");
    unset($account->password);
    echo Helpers::response($done, $account);
  });
});

Router::group("/tests", function () {
  Router::get("/test1", function () {

    echo Helpers::response(true, password_hash("hima135", PASSWORD_DEFAULT));
  });
  Router::get("/test2", function () {
    
  });
  Router::get("/test3", function () {
    echo Helpers::response(true, $_SESSION);
  });
});
