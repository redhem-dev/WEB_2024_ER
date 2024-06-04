<?php

require 'vendor/autoload.php';

Flight::route('/', function(){
    echo 'Hello world!';
});



require 'rest/routes/products_routes.php';
require 'rest/routes/team_member_routes.php';
require 'rest/routes/teamusers_routes.php';
require 'rest/routes/update_routes.php';
require 'rest/routes/auth_routes.php';



Flight::start();