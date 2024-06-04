<?php

require_once __DIR__ . '/BaseDao.class.php';

class ProductDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('products');
    }

    public function getProducts(){
        return $this->query("SELECT * FROM products", []);
        
    }

    public function addProducts($payload)
    {
    // Define the allowed attributes
    $allowedAttributes = ['name', 'category', 'brand', 'price', 'quantity', 'release_date', 'warranty_duration', 'description'];

    // Filter the payload array
    $filteredPayload = array_filter(
        $payload,
        function ($key) use ($allowedAttributes) {
            return in_array($key, $allowedAttributes);
        },
        ARRAY_FILTER_USE_KEY
    );

    // Call the insert method with the filtered payload
    return $this->insert("products", $filteredPayload);
    }

    public function getProductById($product_id) {
        return $this->query_unique("SELECT * FROM products WHERE id = :id", ["id" => $product_id]);
    }

    public function deleteProduct($product_id) {
        $this->execute("DELETE FROM products WHERE id = :id", ["id" => $product_id]);
    }


    public function updateProduct($product_id){
        $this->execute("UPDATE products SET quantity = :quantity, WHERE id = :id", ["id" => $product_id]);
    }
    
    

}