const express = require("express");
const { firstget, firstpost } = require("../controller/controller");
const router = new express.Router()
router.get('/first/:id', firstget)
router.post('/firstp', firstpost)
module.exports = router;