<?php

use HimaPro\Router;
use AdelDev\AdelSQL;

foreach (glob("vendor/*.php") as $vendor) include $vendor;

AdelSQL::connect((object) [
  "host" => "191.101.230.198",
  "db"   => "u440720023_academy_db",
  "user" => "u440720023_hima_db",
  "pass" => "Hima_db2023"
]);

Router::setup();

foreach (glob("app/*.php") as $route) include $route;

Router::middleware(["api"]);

Router::run();

// print_r($_SERVER);
