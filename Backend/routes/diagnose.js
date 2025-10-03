// const express = require("express")
// const Router = express.Router()
// const {diagnoseService} = require("../controller/diagnoseService")
// Router.post("/", diagnoseService)


// module.exports = Router

import express from "express";
import multer from "multer";
import  diagnoseLivestock  from "../controller/diagnoseService.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), diagnoseLivestock);

export default router;