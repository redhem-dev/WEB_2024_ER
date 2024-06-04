<?php

require_once __DIR__. '/../dao/UpdateDao.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

class UpdateService
{
    private $update_dao;

    public function __construct()
    {
        $this->update_dao = new UpdateDao();
    }

    public function getUpdates()
    {
        return $this->update_dao->getUpdates();
    }

}