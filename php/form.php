<?php

$method = $_SERVER['REQUEST_METHOD'];

$c = true;
if ($method === 'POST') {
    $to = 's0dom546@gmail.com';
    $project_name = 'test';
    $form_subject = 'Форма обратной связи';
    $consent = $_POST['consent'];

    foreach ($_POST as $key => $value) {
        if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "consent" ) {
            $message .= "$key: $value \r\n";
            }
        }
    
    }

    $headers = "MIME-Version: 1.0\r\n".
        "Content-type: text\html; charset=utf-8\r\n".
        "Return-Path: adminemail@gmail.com";

    mail($to, $form_subject, $message);

