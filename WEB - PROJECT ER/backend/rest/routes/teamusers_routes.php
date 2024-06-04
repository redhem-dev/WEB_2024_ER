<?php

require_once __DIR__ . '/../services/teamuser_service.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

Flight::set('teamuser_service', new TeamUserService());

Flight::route('GET /teamusers', function() {
    $data = Flight::get('teamuser_service')->getTeamUsers();
    Flight::json(
        $data
    );
});