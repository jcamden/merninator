/**
 * @api {get}   /auth/google   4. Google JWT
 * @apiName Google
 * @apiGroup Auth
 *
 * @apiDescription Get user by <code>email</code> of Google's verified response to Google JWT query string
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:8000/auth/google?id-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *
 * @apiSuccess  {Boolean}   success <code>true</code>
 * @apiSuccess  {Object}    user        user with <code>_id</code> matching .sub of JWT in Authorization header
 * @apiSuccess  {String}    .self       relative URL where user is exposed in by API (unique)
 * @apiSuccess  {String}    .givenName  given name provided by user
 * @apiSuccess  {String}    .familyName family name provided by user
 * @apiSuccess  {String}    .email      email address provided by user (unique)
 * @apiSuccess  {String}    .provider   <code>"google"</code>
 * @apiSuccess  {String}    token       new local JWT token
 * @apiSuccess  {String}    expiresIn   lifetime of local JWT
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "user": {
 *          "self": "/user/5f0f23g1e0232f19e825879f",
 *          "givenName": "Paul",
 *          "familyName": "Tarsus"
 *          "email": "paulaservantofchristjesuscalledtobeanapostlesetapartforthegospelofgodwhichhepromisedbeforehandthroughhisprophetsintheholyscripturesconcerninghissonwhowasdescendedfromdavidaccordingtothefleshandwasdeclaredtobethesonofgodinpoweraccordingtothespiritofholinessbyhisresurrectionfromthedeadjesuschristourlordthroughwhomwehavereceivedgraceandapostleshiptobringabouttheobedienceoffaithforthesakeofhisnameamongallthenationsincludingyouwhoarecalledtobelongtojesuschrist@gmail.com"
 *          "provider": "google"
 *       }
 *      "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *     "expiresIn" : "14d"
 *      }
 * @apiError GoogleTokenVerificationError The token of the idToken param could not be verified by Google.
 * @apiError DuplicateRegistration The Google <code>email</code> was already registered. This error should never occur: the server will have responded with the user corresponding to the already registered email.
 * @apiError RegistrationError Registration failed for any other reason (e.g. database offline)
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *      "success": false,
 *      "msg": "email already registered"
 *      "error": error
 *     }
 */
