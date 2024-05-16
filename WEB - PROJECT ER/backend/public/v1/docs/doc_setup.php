<?php

/**
 * @OA\Info(
 *   title="API",
 *   description="IMS API",
 *   version="1.0",
 *   @OA\Contact(
 *     email="edhem.rogo@stu.ibu.edu.ba",
 *     name="Edhem Rogo"
 *   )
 * ),
 * @OA\OpenApi(
 *   @OA\Server(
 *       url=BASE_URL
 *   )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="ApiKey",
 *     type="apiKey",
 *     in="header",
 *     name="Authentication"
 * )
 */
