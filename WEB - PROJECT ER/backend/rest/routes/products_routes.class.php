<?php

    require_once __DIR__ . '/../services/products_service.class.php';


    use Firebase\JWT\JWT;

    use Firebase\JWT\Key;

    Flight::set('products_service', new ProductService());

    /**
     * @OA\Get(
     *      path="/products",
     *      tags={"products"},
     *      summary="Get all products",
     *      @OA\Response(
     *           response=200,
     *           description="Get all products"
     *      )
     * )
     */

Flight::route('GET /products', function(){
    $products_service = Flight::get('products_service');
    $products_service->get_products();

    //$data = Flight::get('products_service')()->get_products();
    Flight::json($products_service);
});