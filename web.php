<?php

use Damin\Route;

Route::get("/", "MainController@index");
Route::get("/index", "MainController@index");
Route::get("/index/load", "MainController@mainLoad");

Route::get("/adapt", "AdaptController@adapt");
Route::get("/adapt/load", "AdaptController@adaptLoad");
Route::post("/adapt/success", "AdaptController@success");

Route::get("/view", "ViewController@view");
Route::get("/view/load", "ViewController@viewLoad");
Route::get("/view/look", "ViewController@viewLook");
Route::get("/view/done", "ViewController@done");
Route::get("/view/godone", "ViewController@goDone");
Route::get("/view/funding", "ViewController@funding");

Route::get("/list", "ListController@list");
Route::get("/list/load", "ListController@listLoad");
Route::get("/list/load/fund", "ListController@listLoadFund");
Route::get("/list/load/indi", "ListController@listLoadIndi");
Route::get("/list/load/recent", "ListController@listLoadRecent");

Route::get("/register", "RegisterController@register");
Route::post("/register/success", "RegisterController@success");

Route::get("/login", "LoginController@login");
Route::get("/logout", "LoginController@logout");
Route::post("/login/success", "LoginController@success");
Route::get("/profile", "LoginController@profile");

Route::get("/manager", "ManagerController@index");