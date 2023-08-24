<?php

use HimaPro\Router;
use HimaPro\Helpers;
use HimaPro\I18n;
use AdelDev\AdelSQL;

Router::middleware("api", function () {
  error_reporting(0);
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
  header('Access-Control-Allow-Headers: Accept, Content-Type, Access-Control-Allow-Headers, X-Requested-With');
  header('Content-Type: application/json');
});

Router::middleware("auth", function ($email = null, $password = null, $callback = null) {
  $credentials = AdelSQL::GetAll("users", "/admins");

  // auth check with token
  if ($email === "token") {
    if (count($credentials) == 0) {
      $callback(false, I18n::invalid_token);
      return;
    }
    foreach ($credentials as $credential) {
      if ($password == $credential->content->token) {
        $callback(true, I18n::success_auth);
        return;
      } else {
        $callback(false, I18n::invalid_token);
        return;
      }
    }
  }

  // auth login with email and password
  if (isset($email) && isset($password) && $email != "token") {
    $result = false;
    foreach ($credentials as $credential) {
      if ($email == $credential->content->email && password_verify($password, $credential->content->password)) {
        $token = Helpers::randStr(50, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
        $account = $credential->content;
        $account->token = $token;
        $done = AdelSQL::Update("users", $credential->name, $account,  "/admins");
        unset($account->password);
        $callback($done,  $account);
        $result = true;
        return;
      }
    }
    if ($result == false) {
      $callback(false, I18n::invalid_logins);
    }
  } else {
    $callback(false, I18n::not_auth);
  }
});
