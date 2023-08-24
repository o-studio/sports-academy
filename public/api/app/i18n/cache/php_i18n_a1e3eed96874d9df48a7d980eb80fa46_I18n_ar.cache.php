<?php namespace HimaPro; class I18n {
const welcome = 'مرحبا';
const exist = 'موجود بالفعل';
const email_exist = 'البريد الالكتروني موجود بالفعل';
const e404 = '404 غير موجود';
const success_insert = 'تم الاضافة بنجاح';
const success_update = 'تم التحديث بنجاح';
const success_delete = 'تم الحذف بنجاح';
const success_logout = 'تم تسجيل الخروج بنجاح';
const success_auth = 'مصادقة ناجحة';
const invalid_token = 'توكن غير صالح';
const invalid_logins = 'بريد إلكتروني أو كلمة مرور خاطئة';
const not_access = 'تم رفض الوصول';
const not_found = 'غير موجود';
const not_exist = 'غير موجود';
const not_auth = 'مصادقة مرفوضة';
const need_token = 'التوكن مطلوب';
const need_logins = 'مطلوب البريد الإلكتروني وكلمة المرور';
const need_query = 'كلمة البحث مطلوبة';
const need_email = 'مطلوب البريد الإلكتروني';
const need_password = 'مطلوب كلمة المرور';
const need_name = 'الاسم مطلوب';
public static function __callStatic($string, $args) {
    return vsprintf(constant("self::" . $string), $args);
}
}
function I18n($string, $args=NULL) {
    $return = constant("I18n::".$string);
    return $args ? vsprintf($return,$args) : $return;
}