<?php

require_once __DIR__. '/../dao/TeamMemberDao.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

class TeamMemberService
{
    private $team_members_dao;

    public function __construct()
    {
        $this->team_members_dao = new TeamMemberDao();
    }

    public function getTeamMembers()
    {
        return $this->team_members_dao->getTeamMembers();
    }

    public function add_user($payload) {
        return $this->team_members_dao->add_user($payload);
    }
}