<?php

require_once __DIR__ . '/../services/products_service.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

Flight::set('products_service', new ProductService());

/**
 * @OA\Get(
 *     path="/products",
 *     tags={"products"},
 *     summary="Get all products",
 *     @OA\Response(
 *         response=200,
 *         description="Get all products"
 *     )
 * )
 */
Flight::route('GET /products', function() {
    $data = Flight::get('products_service')->getProducts();
    Flight::json($data);
});

/**
 * @OA\Get(
 *     path="/product",
 *     tags={"products"},
 *     summary="Get product by ID",
 *     @OA\Parameter(
 *         name="product_id",
 *         in="query",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="ID of the product to fetch"
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Get product by ID"
 *     )
 * )
 */
Flight::route('GET /product', function() {
    $params = Flight::request()->query;
    $product = Flight::get('products_service')->getProductById($params["product_id"]);
    Flight::json($product);
});

/**
 * @OA\Post(
 *     path="/products",
 *     tags={"products"},
 *     summary="Add a new product",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 @OA\Property(
 *                     property="name",
 *                     type="string",
 *                     description="Name of the product"
 *                 ),
 *                 @OA\Property(
 *                     property="price",
 *                     type="number",
 *                     format="float",
 *                     description="Price of the product"
 *                 ),
 *                 @OA\Property(
 *                     property="category",
 *                     type="string",
 *                     description="Category of the product"
 *                 ),
 *                 example={"name": "Product 1", "price": 19.99, "category": "Category 1"}
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Product added successfully"
 *     )
 * )
 */
Flight::route('POST /products', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::get('products_service')->addProducts($data));
});

/**
 * @OA\Delete(
 *     path="/products/{id}",
 *     tags={"products"},
 *     summary="Delete a product by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="ID of the product to delete"
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Product deleted successfully"
 *     )
 * )
 */
Flight::route('DELETE /products/@id', function($id) {
    Flight::json(Flight::get('products_service')->deleteProduct($id));
});

/**
 * @OA\Post(
 *     path="/products/{id}",
 *     tags={"products"},
 *     summary="Update a product by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="ID of the product to update"
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 @OA\Property(
 *                     property="id",
 *                     type="integer",
 *                     description="ID of the product"
 *                 ),
 *                 @OA\Property(
 *                     property="name",
 *                     type="string",
 *                     description="Name of the product"
 *                 ),
 *                 @OA\Property(
 *                     property="price",
 *                     type="number",
 *                     format="float",
 *                     description="Price of the product"
 *                 ),
 *                 @OA\Property(
 *                     property="category",
 *                     type="string",
 *                     description="Category of the product"
 *                 ),
 *                 example={"id": 1, "name": "Updated Product", "price": 29.99, "category": "Updated Category"}
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Product updated successfully"
 *     )
 * )
 */
Flight::route('POST /products/@id', function($id) {
    $data = Flight::request()->data->getData();
    if ($data['id'] != $id) {
        throw new Exception("Id in URL and in body are different");
    }
    $response = Flight::get('products_service')->updateProduct($data);
    Flight::json($response);
});
