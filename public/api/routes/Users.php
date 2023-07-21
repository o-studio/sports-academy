<?php

namespace API;

// use HimaPro\Helpers;

// include("../vendor/Helpers.php");

class Users {
  public static function getAll(){
    $users = json_decode(file_get_contents("./routes/db.json"))->users;
    return $users;
  }
  public static function get($id){
    $users = self::getAll();
    foreach ($users as $user) {
      if ($user->id == $id) {
        return $user;
      }
    }
    return "user not found";
  }
}
