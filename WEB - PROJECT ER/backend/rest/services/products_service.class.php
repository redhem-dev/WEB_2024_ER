<?php

require_once __DIR__ . '/../dao/ProductDao.class.php';

class ProductService{
    private $products_dao;

    public function __construct(){
        $this->products_dao = new ProductDao();


    }

    public function get_products(){

        return $this->products_dao->get_products();
    }
}