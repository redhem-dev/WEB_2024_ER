<?php

require_once __DIR__. '/../dao/ProductDao.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';


class ProductService{
    private $products_dao;

    public function __construct(){
        $this->products_dao = new ProductDao();
        }

    public function getProducts(){
        return $this->products_dao->getProducts();
        
    }

    public function addProducts($payload)
    {
        return $this->products_dao->addProducts($payload);
    }

    

    public function getProductById($product_id) {
        return $this->products_dao->getProductById($product_id);
    }
    
    public function deleteProduct($product_id) {
        return $this->products_dao->deleteProduct($product_id);
    }

    public function updateProduct($product_id){
        return $this->products_dao->updateProduct($product_id);
    }
}

