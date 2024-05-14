<?php

require 'vendor/autoload.php';

Flight::route('/', function () {
    echo password_hash('edhem', PASSWORD_DEFAULT);
});

require 'rest/routes/products_routes.class.php';


Flight::start();