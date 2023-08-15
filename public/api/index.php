<?php

use HimaPro\Router;
use AdelDev\AdelSQL;

foreach (glob("vendor/*.php") as $vendor) include $vendor;

AdelSQL::connect((object) [
  "host" => "0.0.0.0",
  "db"   => "himapro_db",
  "user" => "himapro",
  "pass" => "Hk5KEwF(718aF+-rg9"
]);

Router::setup();

foreach (glob("app/*.php") as $route) include $route;

Router::middleware(["api"]);

Router::run();

// print_r($_SERVER);
