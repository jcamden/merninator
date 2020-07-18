/**
 * @api {post}   /auth   2. login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiDescription If email and password are a match, responds with User and new JWT.
 *
 * @apiParam {String}   email       submitted email address
 * @apiParam {String}   password    submitted password
 *
 * @apiSuccess  {Boolean}   success     <code>true</code>
 * @apiSuccess  {Object}    user        user with <code>_id</code> matching .sub of JWT in Authorization header
 * @apiSuccess  {String}    .self       relative URL where user is exposed in by API (unique)
 * @apiSuccess  {String}    .givenName  given name provided by user
 * @apiSuccess  {String}    .familyName family name provided by user
 * @apiSuccess  {String}    .email      email address provided by user (unique)
 * @apiSuccess  {String}    .provider   <code>"local"</code>
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "user": {
 *          "self": "/user/5f0f23g1e0232f19e825879f",
 *          "givenName": "Origen",
 *          "familyName": "just Origen"
 *          "email": "justinianmisnomer@alexandria.gov"
 *          "provider": "local"
 *       }
 *      "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *      "expiresIn" : "14d"
 *      }
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * @apiError InvalidPassword Password did not match the <code>password</code> of the User associated with the address.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *      "success": false,
 *      "msg": "user not found"
 *      "error": error
 *     }
 */
