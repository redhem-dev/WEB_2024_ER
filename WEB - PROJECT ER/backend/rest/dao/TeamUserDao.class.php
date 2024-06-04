<?php

require_once __DIR__ . '/BaseDao.class.php';

class TeamUserDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('user_teams');
    }

    public function getTeamUsers(){
        return $this->query("SELECT * FROM user_teams", []);
        
    }

}