<?php

require_once __DIR__ . '/../services/products_service.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

Flight::set('products_service', new ProductService());

/**
     * @OA\Get(
     *      path="/products",
     *      tags={"products"},
     *      summary="Get all products",
     *      
     *      @OA\Response(
     *           response=200,
     *           description="Get all products"
     *      )
     * )
     */


Flight::route('GET /products', function() {
    $data = Flight::get('products_service')->getProducts();
    Flight::json(
        $data
    );
});

Flight::route('GET /product', function() {
    $params = Flight::request()->query;

    $product = Flight::get('products_service')->getProductById($params["product_id"]);
    Flight::json($product);
});

Flight::route('POST /products', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::get('products_service')->addProducts($data));
});

Flight::route('DELETE /products/@id', function($id) {
    Flight::json(Flight::get('products_service')->deleteProduct($id));
});

Flight::route('POST /products/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::get('products_service')->updateProduct($id, $data));
}
);
