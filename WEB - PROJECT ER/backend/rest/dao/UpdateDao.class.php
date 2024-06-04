<?php

require_once __DIR__ . '/BaseDao.class.php';

class UpdateDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('updates');
    }

    public function getUpdates(){
        return $this->query("SELECT * FROM updates", []);
        
    }

}