<?php namespace HimaPro; class I18n {
const welcome = 'welcome';
const greating = 'Hello, world!';
const exist = 'already exist';
const email_exist = 'email already exists';
const e404 = '404 not found';
const success_insert = 'inserted successfully';
const success_update = 'updated successfully';
const success_delete = 'deleted successfully';
const success_delGroup = 'All are deleted successfully';
const success_logout = 'logout successfully';
const success_auth = 'auth success';
const invalid_token = 'invalid token';
const invalid_delGroup = 'Invalid request data';
const invalid_logins = 'wrong email or password';
const not_access = 'Access denied';
const not_found = 'not found';
const not_exist = 'not exist';
const not_auth = 'not authorized';
const need_token = 'token is required';
const need_logins = 'email and password are required';
const need_query = 'query is required';
const need_email = 'email is required';
const need_password = 'password is required';
const need_name = 'name is required';
public static function __callStatic($string, $args) {
    return vsprintf(constant("self::" . $string), $args);
}
}
function I18n($string, $args=NULL) {
    $return = constant("I18n::".$string);
    return $args ? vsprintf($return,$args) : $return;
}