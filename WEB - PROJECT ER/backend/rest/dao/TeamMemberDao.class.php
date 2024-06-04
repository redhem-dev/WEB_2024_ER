<?php

require_once __DIR__ . '/BaseDao.class.php';

class TeamMemberDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('users');
    }

    public function getTeamMembers(){
        return $this->query("SELECT * FROM users", []);
        
    }

    public function add_user($payload) {
        return $this->insert('users', $payload);
    }

    
}