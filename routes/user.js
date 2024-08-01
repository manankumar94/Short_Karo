// all work related to user is done

const express= require("express");
const {userSignUp, userLogin } = require("../controllers/users");
const router= express.Router();

// /user karenge with post toh idhar aaenge
router.post("/", userSignUp);

router.post("/login", userLogin);

module.exports=router;