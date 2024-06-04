<?php

require_once __DIR__. '/../dao/TeamUserDao.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

class TeamUserService
{
    private $team_user_dao;

    public function __construct()
    {
        $this->team_user_dao = new TeamUserDao();
    }

    public function getTeamUsers()
    {
        return $this->team_user_dao->getTeamUsers();
    }

}