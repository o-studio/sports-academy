<?php

use HimaPro\Router;
use AdelDev\AdelSQL;
use HimaPro\I18n;

// load vendors
foreach (glob("vendor/*.php") as $vendor) include $vendor;

// connect to database
AdelSQL::connect((object) [
  "host" => "191.101.230.198",
  "db"   => "u440720023_academy_db",
  "user" => "u440720023_hima_db",
  "pass" => "Hima_db2023"
]);

// load Internationalization
$i18n = new _i18n_("./app/i18n/langs/lang_{LANGUAGE}.json", "./app/i18n/cache", "en", "I18n");
$i18n->init();
// echo I18n::greating;

// load API routes and middlewares
Router::setup();
foreach (glob("app/*.php") as $routes) include $routes;
Router::middleware(["api"]);
Router::run();

// print_r($_SERVER);
