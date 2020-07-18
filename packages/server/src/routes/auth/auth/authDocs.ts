/**
 * @api {get}   /auth   1. local JWT
 * @apiName Auth
 * @apiGroup Auth
 *
 * @apiDescription Get the User whose <code>_id</code> corresponds to the .sub claim on the JWT included in the Authorization header.
 *
 * @apiHeader           {String}    Authorization   previously issued JWT
 * @apiHeaderExample    {String}    Header-Example:
 *     {
 *          "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *     }
 *
 * @apiSuccess  {Boolean}   success <code>true</code>
 * @apiSuccess  {Object}    user        user with <code>_id</code> matching .sub of JWT in Authorization header
 * @apiSuccess  {String}    .self       relative URL where user is exposed in by API (unique)
 * @apiSuccess  {String}    .givenName  given name provided by user
 * @apiSuccess  {String}    .familyName family name provided by user
 * @apiSuccess  {String}    .email      email address provided by user (unique)
 * @apiSuccess  {String}    .provider   strategy used in registration of user; <code>enum: ["local", "google"]</code>
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "user": {
 *          "self": "/user/5f0f23g1e0232f19e825879f",
 *          "givenName": "Martin",
 *          "familyName": "Luther"
 *          "email": "therealluther@erfurt.edu"
 *          "provider": "local"
 *       }
 *     }
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *      "success": false,
 *      "msg": "user not found"
 *      "error": error
 *     }
 */
