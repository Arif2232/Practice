const { addMessage } = require("../controllers/messagesController");

const route = require("express").Router();

route.post("/addMsg",addMessage);

module.exports = route;