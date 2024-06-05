<?php

require_once __DIR__ . '/../services/teammembers_service.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

Flight::set('teammembers_service', new TeamMemberService());

/**
 * @OA\Get(
 *      path="/teammembers",
 *      tags={"teammembers"},
 *      summary="Get all team members",
 *      description="Retrieves a list of all team members",
 *      
 *      @OA\Response(
 *           response=200,
 *           description="A list of team members",
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
 *                       property="name",
 *                       type="string",
 *                       example="John Doe"
 *                   ),
 *                   @OA\Property(
 *                       property="email",
 *                       type="string",
 *                       example="john.doe@example.com"
 *                   ),
 *                   @OA\Property(
 *                       property="role",
 *                       type="string",
 *                       example="Developer"
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
Flight::route('GET /teammembers', function() {
    $data = Flight::get('teammembers_service')->getTeamMembers();
    Flight::json(
        $data
    );
});

/**
 * @OA\Post(
 *      path="/users",
 *      tags={"users"},
 *      summary="Create a new user",
 *      description="Creates a new user with the provided data",
 *      
 *      @OA\RequestBody(
 *           required=true,
 *           @OA\JsonContent(
 *               type="object",
 *               @OA\Property(
 *                   property="email",
 *                   type="string",
 *                   example="john.doe@example.com"
 *               ),
 *               @OA\Property(
 *                   property="password",
 *                   type="string",
 *                   example="securepassword"
 *               ),
 *               @OA\Property(
 *                   property="passwordconfirm",
 *                   type="string",
 *                   example="securepassword"
 *               )
 *           )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="User created successfully",
 *           @OA\JsonContent(
 *               type="object",
 *               @OA\Property(
 *                   property="id",
 *                   type="integer",
 *                   example=1
 *               ),
 *               @OA\Property(
 *                   property="email",
 *                   type="string",
 *                   example="john.doe@example.com"
 *               )
 *           )
 *      ),
 *      @OA\Response(
 *           response=400,
 *           description="Bad request"
 *      ),
 *      @OA\Response(
 *           response=500,
 *           description="Internal server error"
 *      )
 * )
 */
Flight::route('POST /users', function() {
    $data = Flight::request()->data->getData();

    if (!isset($data['email']) || !isset($data['password']) || !isset($data['passwordconfirm'])) {
        Flight::halt(400, 'Email, password and confirm password are required');
    }

    if ($data['password'] !== $data['passwordconfirm']) {
        Flight::halt(400, 'Password and confirm password do not match');
    }
    
    $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
    unset($data['passwordconfirm']);

    $user = Flight::get('teammembers_service')->add_user($data);
    Flight::json(
        $user
    );
});
