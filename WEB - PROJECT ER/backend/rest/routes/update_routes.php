<?php

require_once __DIR__ . '/../services/updates_service.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

Flight::set('update_service', new UpdateService());

/**
 * @OA\Get(
 *      path="/updates",
 *      tags={"updates"},
 *      summary="Retrieve updates",
 *      description="Retrieves a list of updates",
 *      
 *      @OA\Response(
 *           response=200,
 *           description="A list of updates",
 *           @OA\JsonContent(
 *               type="array",
 *               @OA\Items(
 *                   type="object",
 *                   @OA\Property(
 *                       property="id",
 *                       type="integer",
 *                       example=1
 *                   ),
 *                   @OA\Property(
 *                       property="title",
 *                       type="string",
 *                       example="Update Title"
 *                   ),
 *                   @OA\Property(
 *                       property="content",
 *                       type="string",
 *                       example="Update content goes here."
 *                   ),
 *                   @OA\Property(
 *                       property="date",
 *                       type="string",
 *                       format="date-time",
 *                       example="2024-05-30T14:48:00.000Z"
 *                   )
 *               )
 *           )
 *      ),
 *      @OA\Response(
 *           response=500,
 *           description="Internal server error"
 *      )
 * )
 */
Flight::route('GET /updates', function() {
    $data = Flight::get('update_service')->getUpdates();
    Flight::json(
        $data
    );
});
