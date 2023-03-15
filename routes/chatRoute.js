const express = require("express");
const {
  createChat,
  findAllChats,
  findASigleChat,
} = require("../controllers/chatController");

// router
const router = express.Router();

// routes
router.post("/", createChat);
router.get("/", findAllChats);
router.get("/find/:firstId/:secondId", findASigleChat);

module.exports = router