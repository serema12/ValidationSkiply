const express = require("express");
var router = express.Router();
const {GetAccessCode,ValidatingAccessCode} = require('../Services/routerServices')


router.post("/get",GetAccessCode)
router.post("/validate",ValidatingAccessCode)

module.exports = router