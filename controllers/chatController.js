const chatModel = require("../models/chatModel");

// create chat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      return res.status(200).json(chat);
    }

    const newChat = await chatModel.create({
      members: [firstId, secondId],
    });
    res.status(200).json(newChat);
  } catch (err) {
    res.satus(500).json(err);
  }
};

// find all chats
const findAllChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });

    res.satus(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create a single chat
const findASigleChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.find({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createChat, findAllChats, findASigleChat };
