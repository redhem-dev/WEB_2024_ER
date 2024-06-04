<?php

require_once __DIR__ . '/../services/teammembers_service.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

Flight::set('teammembers_service', new TeamMemberService());

Flight::route('GET /teammembers', function() {
    $data = Flight::get('teammembers_service')->getTeamMembers();
    Flight::json(
        $data
    );
});

Flight::route('POST /users', function() {
    $data = Flight::request()->data->getData();

    if (!isset($data['email']) || !isset($data['password']) || !isset($data['passwordconfirm'])) {
        Flight::halt(400, 'Email, password and confirm password are required');
    }

    if ($data['password'] !== $data['passwordconfirm']) {
        Flight::halt(400, 'Password and confirm password do not match');
    }
    
    $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
    unset($data['passwordconfirm']);

    $user = Flight::get('teammembers_service')->add_user($data);
    Flight::json(
        $user
    );
});