<?php

use HimaPro\Router;
use HimaPro\Helpers;
use AdelDev\AdelSQL;
session_start();

$tag = isset($_GET['tag']) ? $_GET['tag'] : "/";
$routes = array(
  ["group" => "sports", "item" => "sport"],
  ["group" => "trainers", "item" => "trainer"],
  ["group" => "players", "item" => "player"],
  ["group" => "employees", "item" => "employee"],
  ["group" => "costs", "item" => "cost"],
  ["group" => "users", "item" => "user"],
  ["group" => "options", "item" => "option"],
  // ["group" => "salaries", "item" => "salary"],
  // ["group" => "subscriptions", "item" => "subscription"],
);

foreach ($routes as $route) {
  $group = $route["group"];
  $item = $route["item"];
  $perPage = isset($_GET["perPage"]) && (int) $_GET["perPage"] ? (int) $_GET["perPage"] : 50;
  $page = isset($_GET["page"]) && (int) $_GET["page"] ? (int) $_GET["page"] : 1;

  // Get All
  Router::get("/$group", function () use ($group, $perPage, $page, $tag) {
    $res = AdelSQL::getAll($group, $tag);
    $res = Helpers::pager($res, $perPage, $page);
    echo Helpers::response(gettype($res) == "array", $res);
  });

  // Get by param: key
  Router::get("/$item/{key}", function ($key) use ($group, $tag) {
    $res = AdelSQL::get($group, $key, $tag);
    if ($res == false) {
      $res = "$key doesn't exist";
    }
    echo Helpers::response(gettype($res) == "object", $res);
  });

  // insert
  Router::post("/$group", function () use ($group, $tag) {
    Router::middleware(["auth"]);
    $data = json_decode(file_get_contents("php://input"), true);
    $res = AdelSQL::insert($group, $data["name"], $data["content"], $tag);
    if ($res == false) {
      $result = $data["name"] . " already exist";
    } else $result = "inserted successfully";
    echo Helpers::response($res, $result);
  });

  // Update by param: key
  Router::post("/$item/{key}/update", function ($key) use ($group, $tag) {
    Router::middleware(["auth"]);
    $data = json_decode(file_get_contents("php://input"), true);
    $res = AdelSQL::update($group, $key, $data["content"], $tag);
    if ($res == false) {
      $result = $data["name"] . " doesn't exist";
    } else $result = "updated successfully";
    echo Helpers::response($res, $result);
  });

  // Delete by param: key
  Router::post("/$item/{key}/delete", function ($key) use ($group, $tag) {
    Router::middleware(["auth"]);
    $res = AdelSQL::delete($group, $key, $tag);
    if ($res == false) {
      $result = $key . " doesn't exist";
    } else $result = "deleted successfully";
    echo Helpers::response($res, $result);
  });

  // search by query: "q"
  Router::get("/$group/search", function () use ($group, $tag, $perPage, $page) {
    if (isset($_GET["q"])) {
      $res = AdelSQL::Search($group, $_GET["q"], $tag);
      $res = Helpers::pager($res, $perPage, $page);
      echo Helpers::response(true, $res);
    } else {
      echo Helpers::response(false, "no query provided");
    }
  });

  // Count all stored data in a table
  Router::get("/$group/count", function () use ($group, $tag) {
    echo Helpers::response(true, AdelSQL::Count($group, $tag));
  });
}
