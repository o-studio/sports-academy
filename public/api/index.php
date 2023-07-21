<?php

use HimaPro\Router;
use HimaPro\Helpers;
use API\Users;
use API\Sports;

use function PHPSTORM_META\type;

include "vendor/HimaRouter.php";
include "vendor/Helpers.php";
include "routes/Users.php";
include "routes/Sports.php";

Router::setup("/api");

error_reporting(0);
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

# no auth
Router::any('/', function () {
  echo Helpers::response(false, array(
    "message"=> "welcome",
    "try"=> array(
      "/api/v1/",
      "/api/v1/AZ-az-09",
    ),
  ));
});

Router::any('/404', function () {
  echo Helpers::response(false, "404 not found");
});

Router::get('/users', function () {
  $perPage = isset($_GET["perPage"]) ? (int) $_GET["perPage"] : 2 ;
  $page = isset($_GET["page"]) ? (int) $_GET["page"] : 1 ;
  $users = Users::getAll();
  $users = Helpers::pager($users, $perPage, $page);
  echo Helpers::response(gettype($users) == "array", $users);
});

Router::get('/user/{id}', function ($id) {
  $user = Users::get($id);
  echo Helpers::response(gettype($user) == "object", $user);
});

Router::post('/auth/login', function () {
  $data = json_decode(file_get_contents('php://input'), true);
  $expiration = time() + (86400 * 30); // Cookie will expire 30 days

  setcookie("USER", $data->USER, $expiration, "/");
  setcookie("PASS", $data->PASS, $expiration, "/");

  if(Helpers::auth()){
    echo Helpers::response(true, "auth success");
  }
});

// print_r($_SERVER);
Router::run();
