const express = require("express");
const { firstget, firstpost, login, loginpost, register, updateUser } = require("../controller/controller");
const { verifyToken } = require("../middleware/authMiddleware");
const router = new express.Router()
router.get('/first/:id', firstget)
router.post('/firstp', firstpost)
router.post('/log', login)
router.post('/reg', register)
router.post('/update', verifyToken, updateUser)

module.exports = router;