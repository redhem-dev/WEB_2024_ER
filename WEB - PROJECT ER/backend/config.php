<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

define('DB_NAME', 'imms');
define('DB_PORT', 3306);
define('DB_USER', 'root');
define('DB_PASSWORD', 'szoboszlai');
define('DB_HOST', '127.0.0.1');

define('JWT_SECRET', ',dpPL,Se%fM-UVQBwf/X0T&B!DF6%}');
