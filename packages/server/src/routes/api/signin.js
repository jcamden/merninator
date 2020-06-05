import express from 'express';
const router = express.Router();
import User from '../../models/User';

// @route   POST api/uploads
// @desc    upload new file
// @access  private

router.post('/api/account/signup', (req, res, next) => {
  const { body } = req;
  const { firstName, lastName, email, password } = body;

  if (!firstName) {
    res.end({
      success: false,
      message: 'Error: First name cannot be blank.',
    });
  }
  if (!lastName) {
    res.end({
      success: false,
      message: 'Error: Last name cannot be blank.',
    });
  }
  if (!email) {
    res.end({
      success: false,
      message: 'Error: Email cannot be blank.',
    });
  }
  if (!password) {
    res.end({
      success: false,
      message: 'Error: Password cannot be blank.',
    });
  }

  email = email.toLowerCase();

  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  User.find(
    {
      email: email,
    },
    (err, previousUsers) => {
      if (err) {
        res.end({
          success: false,
          message: 'Error: Server error.',
        });
      } else if (previousUseres.length > 0) {
        res.end({
          success: false,
          message: 'Error: Account already exists.',
        });
      }

      // Save the new user
      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          res.end({
            success: false,
            message: 'Error: Server error.',
          });
        }
        res.end({
          success: true,
          message: 'Signed up',
        });
      });
    },
  );
});

module.exports = router;
