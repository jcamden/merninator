import express from 'express';
const router = express.Router();
import passport from 'passport';
import requireJwtAuth from '../../middleware/requireJwtAuth';
// import { check, validationResult } from 'express-validator';

// @route   GET api/projects
// @desc    get auth'd user's projects
// @access  private
router.get('/', requireJwtAuth, async (req, res) => {
  // passport.authenticate('google');
  res.json({ name: 'winner' });
});

export default router;
