<?php

use HimaPro\Router;
use HimaPro\Helpers;
use AdelDev\AdelSQL;
use HimaPro\I18n;

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

  if ($tag === "/admins" && ($group == "users" || $item == "user")) {
    Router::any("/users", function () {
      echo Helpers::response(false, I18n::not_access);
    });
    Router::any("/$item/{id}", function () {
      echo Helpers::response(false, I18n::not_access);
    });
    break;
  }

  // Get All
  Router::get("/$group", function () use ($group, $perPage, $page, $tag) {
    $res = AdelSQL::getAll($group, $tag);
    usort($res, function ($a, $b) {
      return strcmp($b->modified, $a->modified);
    });
    $res = Helpers::pager($res, $perPage, $page);
    echo Helpers::response(gettype($res) == "object", $res);
  });

  // Get by param: key
  Router::get("/$item/{key}", function ($key) use ($group, $tag) {
    $res = AdelSQL::get($group, $key, $tag);
    if ($res == false) {
      $res = "$key " . I18n::not_exist;
    }
    echo Helpers::response(gettype($res) == "object", $res);
  });

  // insert
  Router::post("/$group", function () use ($group, $tag) {
    if (isset($_GET["token"])) {
      Router::middleware(["auth"], [
        "auth" => ["token", $_GET["token"], function ($ok, $result) use ($group, $tag) {
          if ($ok == false) {
            echo Helpers::response($ok, $result);
            return;
          }
          $data = json_decode(file_get_contents("php://input"), true);
          $res = AdelSQL::insert($group, $data["name"], $data["content"], $tag);
          if ($res == false) {
            $result = $data["name"] . " " . I18n::exist;
          } else $result = I18n::success_insert;
          echo Helpers::response($res, $result);
        }]
      ]);
    } else {
      echo Helpers::response(false, I18n::need_token);
    }
  });

  // Update by param: key
  Router::post("/$item/{key}/update", function ($key) use ($group, $tag) {
    if (isset($_GET["token"])) {
      Router::middleware(["auth"], [
        "auth" => ["token", $_GET["token"], function ($ok, $result) use ($group, $key, $tag) {
          if ($ok == false) {
            echo Helpers::response($ok, $result);
            return;
          }
          $data = json_decode(file_get_contents("php://input"), true);
          $res = AdelSQL::update($group, $key, $data["content"], $tag);
          if ($res == false) {
            $result = $data["name"] . " " . I18n::not_exist;
          } else $result = I18n::success_update;
          echo Helpers::response($res, $result);
        }]
      ]);
    } else {
      echo Helpers::response(false, I18n::need_token);
    }
  });

  // Delete by param: key
  Router::post("/$item/{key}/delete", function ($key) use ($group, $tag) {
    if (isset($_GET["token"])) {
      Router::middleware(["auth"], [
        "auth" => ["token", $_GET["token"], function ($ok, $result) use ($group, $key, $tag) {
          if ($ok == false) {
            echo Helpers::response($ok, $result);
            return;
          }
          $res = AdelSQL::delete($group, $key, $tag);
          if ($res == false) {
            $result = "$key " . I18n::not_exist;
          } else $result = I18n::success_delete;
          echo Helpers::response($res, $result);
        }]
      ]);
    } else {
      echo Helpers::response(false, I18n::need_token);
    }
  });

  // delete by array of keys
  Router::post("/$group/delete", function () use ($group, $tag) {
    if (isset($_GET["token"])) {
      Router::middleware(["auth"], [
        "auth" => ["token", $_GET["token"], function ($ok, $result) use ($group, $tag) {
          if ($ok == false) {
            echo Helpers::response($ok, $result);
            return;
          }
          $keysToCheck = json_decode(file_get_contents('php://input'), true);
          if (!is_array($keysToCheck)) {
            echo Helpers::response(false, I18n::invalid_delGroup);
            return;
          }
          $keysNotFound = [];
          foreach ($keysToCheck as $key) {
            if (!AdelSQL::Get($group, $key, $tag)) {
              $keysNotFound[] = $key;
            }
          }
          if (!empty($keysNotFound)) {
            echo Helpers::response(false, $keysNotFound);
          } else {
            foreach ($keysToCheck as $key) {
              AdelSQL::delete($group, $key, $tag);
            }
            echo Helpers::response(true, I18n::success_delGroup);
          }
        }]
      ]);
    } else {
      echo Helpers::response(false, I18n::need_token);
    }
  });



  // search by query: "q"
  Router::get("/$group/search", function () use ($group, $tag, $perPage, $page) {
    if (isset($_GET["q"])) {
      $res = AdelSQL::Search($group, $_GET["q"], $tag);
      usort($res, function ($a, $b) {
        return strcmp($b->modified, $a->modified);
      });
      $res = Helpers::pager($res, $perPage, $page);
      echo Helpers::response(true, $res);
    } else {
      echo Helpers::response(false, I18n::need_query);
    }
  });

  // Count all stored data in a table
  Router::get("/$group/count", function () use ($group, $tag) {
    echo Helpers::response(true, AdelSQL::Count($group, $tag));
  });
}
