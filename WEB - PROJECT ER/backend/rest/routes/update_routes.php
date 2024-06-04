<?php

require_once __DIR__ . '/../services/updates_service.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

Flight::set('update_service', new UpdateService());

Flight::route('GET /updates', function() {
    $data = Flight::get('update_service')->getUpdates();
    Flight::json(
        $data
    );
});