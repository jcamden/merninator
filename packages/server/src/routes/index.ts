import users from "./users";

const router = require("express").Router();

router.use("/users", users);

export default router;
