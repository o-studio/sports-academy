<?php

use HimaPro\Router;
use HimaPro\Helpers;

Router::any('/', function () {
  echo Helpers::response(false, array(
    "message" => "welcome",
    "try" => array(
      "/api/users",
      "/api/user/1",
    ),
  ));
});

Router::any('/404', function () {
  echo Helpers::response(false, "404 not found");
});

Router::group("/auth", function () {
  Router::any('/status', function () {
    Router::middleware(["auth"]);
    echo Helpers::response(true, "auth success");
  });

  Router::post('/login', function () {
    $data = json_decode(file_get_contents("php://input"));
    $_SESSION["USER"] =$data->USER;
    $_SESSION["PASS"] =$data->PASS;
    
    Router::middleware(["auth"], ["auth"=> array($data->TOKEN)]);
    echo Helpers::response(true, "auth success");
  });
  
  Router::post('/logout', function () {
    unset($_SESSION["USER"]);
    unset($_SESSION["PASS"]);
    
    echo Helpers::response(true, "logout success");
  });

});

Router::group("/tests", function(){
  Router::get("/test1", function(){
    $_SESSION["USER"] = "content";
    $_SESSION["PASS"] = "content";
    echo Helpers::response(true, $_SESSION);
  });
  Router::get("/test2", function(){
    unset($_SESSION["USER"]);
    unset($_SESSION["PASS"]);
    echo Helpers::response(true, $_SESSION);
  });
  Router::get("/test3", function(){
    echo Helpers::response(true, $_SESSION);
  });
});