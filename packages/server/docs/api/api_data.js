define({ "api": [
  {
    "type": "get",
    "url": "/auth",
    "title": "1. local JWT",
    "name": "Auth",
    "group": "Auth",
    "description": "<p>Get the User whose <code>_id</code> corresponds to the .sub claim on the JWT included in the Authorization header.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>previously issued JWT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n     \"Authorization\" : \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\"\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p><code>true</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user with <code>_id</code> matching .sub of JWT in Authorization header</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".self",
            "description": "<p>relative URL where user is exposed in by API (unique)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".givenName",
            "description": "<p>given name provided by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".familyName",
            "description": "<p>family name provided by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".email",
            "description": "<p>email address provided by user (unique)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".provider",
            "description": "<p>strategy used in registration of user; <code>enum: [&quot;local&quot;, &quot;google&quot;]</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"user\": {\n     \"self\": \"/user/5f0f23g1e0232f19e825879f\",\n     \"givenName\": \"Martin\",\n     \"familyName\": \"Luther\"\n     \"email\": \"therealluther@erfurt.edu\"\n     \"provider\": \"local\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"success\": false,\n \"msg\": \"user not found\"\n \"error\": error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth/auth/authDocs.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth/google",
    "title": "4. Google JWT",
    "name": "Google",
    "group": "Auth",
    "description": "<p>Get user by <code>email</code> of Google's verified response to Google JWT query string</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:8000/auth/google?id-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p><code>true</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user with <code>_id</code> matching .sub of JWT in Authorization header</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".self",
            "description": "<p>relative URL where user is exposed in by API (unique)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".givenName",
            "description": "<p>given name provided by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".familyName",
            "description": "<p>family name provided by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".email",
            "description": "<p>email address provided by user (unique)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".provider",
            "description": "<p><code>&quot;google&quot;</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>new local JWT token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "expiresIn",
            "description": "<p>lifetime of local JWT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"user\": {\n     \"self\": \"/user/5f0f23g1e0232f19e825879f\",\n     \"givenName\": \"Paul\",\n     \"familyName\": \"Tarsus\"\n     \"email\": \"paulaservantofchristjesuscalledtobeanapostlesetapartforthegospelofgodwhichhepromisedbeforehandthroughhisprophetsintheholyscripturesconcerninghissonwhowasdescendedfromdavidaccordingtothefleshandwasdeclaredtobethesonofgodinpoweraccordingtothespiritofholinessbyhisresurrectionfromthedeadjesuschristourlordthroughwhomwehavereceivedgraceandapostleshiptobringabouttheobedienceoffaithforthesakeofhisnameamongallthenationsincludingyouwhoarecalledtobelongtojesuschrist@gmail.com\"\n     \"provider\": \"google\"\n  }\n \"token\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\"\n\"expiresIn\" : \"14d\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "GoogleTokenVerificationError",
            "description": "<p>The token of the idToken param could not be verified by Google.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DuplicateRegistration",
            "description": "<p>The Google <code>email</code> was already registered. This error should never occur: the server will have responded with the user corresponding to the already registered email.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RegistrationError",
            "description": "<p>Registration failed for any other reason (e.g. database offline)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"success\": false,\n \"msg\": \"email already registered\"\n \"error\": error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth/google/googleDocs.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "2. login",
    "name": "Login",
    "group": "Auth",
    "description": "<p>If email and password are a match, responds with User and new JWT.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>submitted email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>submitted password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p><code>true</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user with <code>_id</code> matching .sub of JWT in Authorization header</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".self",
            "description": "<p>relative URL where user is exposed in by API (unique)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".givenName",
            "description": "<p>given name provided by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".familyName",
            "description": "<p>family name provided by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".email",
            "description": "<p>email address provided by user (unique)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".provider",
            "description": "<p><code>&quot;local&quot;</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"user\": {\n     \"self\": \"/user/5f0f23g1e0232f19e825879f\",\n     \"givenName\": \"Origen\",\n     \"familyName\": \"just Origen\"\n     \"email\": \"justinianmisnomer@alexandria.gov\"\n     \"provider\": \"local\"\n  }\n \"token\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\"\n \"expiresIn\" : \"14d\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>Password did not match the <code>password</code> of the User associated with the address.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"success\": false,\n \"msg\": \"user not found\"\n \"error\": error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth/login/loginDocs.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "3. register",
    "name": "Register",
    "group": "Auth",
    "description": "<p>Creates and responds with a new User (from body) and new JWT</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>submitted email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "givenName",
            "description": "<p>submitted given name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "familyName",
            "description": "<p>submitted family name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>submitted password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p><code>true</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user with <code>_id</code> matching .sub of JWT in Authorization header</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".self",
            "description": "<p>relative URL where user is exposed in by API (unique)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".givenName",
            "description": "<p>given name provided by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".familyName",
            "description": "<p>family name provided by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".email",
            "description": "<p>email address provided by user (unique)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".provider",
            "description": "<p><code>&quot;local&quot;</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"user\": {\n     \"self\": \"/user/5f0f23g1e0232f19e825879f\",\n     \"givenName\": \"Paul\",\n     \"familyName\": \"Tarsus\"\n     \"email\": \"paulaservantofchristjesuscalledtobeanapostlesetapartforthegospelofgodwhichhepromisedbeforehandthroughhisprophetsintheholyscripturesconcerninghissonwhowasdescendedfromdavidaccordingtothefleshandwasdeclaredtobethesonofgodinpoweraccordingtothespiritofholinessbyhisresurrectionfromthedeadjesuschristourlordthroughwhomwehavereceivedgraceandapostleshiptobringabouttheobedienceoffaithforthesakeofhisnameamongallthenationsincludingyouwhoarecalledtobelongtojesuschrist@gmail.com\"\n     \"provider\": \"google\"\n  }\n \"token\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\"\n \"expiresIn\" : \"14d\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DuplicateRegistration",
            "description": "<p>The <code>email</code> param matched athe email of an existing user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RegistrationError",
            "description": "<p>Registration failed for any other reason (e.g. database offline)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"success\": false,\n \"msg\": \"email already registered\"\n \"error\": error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth/register/registerDocs.ts",
    "groupTitle": "Auth"
  }
] });
