const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.get("/", middlewareController.verifyToken)

module.exports = router;