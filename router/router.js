const express = require("express");
const { firstget, firstpost, login, register, updateUser, insertNewAds, fetchAds, fetchUserDetails } = require("../controller/controller");
const { verifyToken } = require("../middleware/authMiddleware");
const multerAdPostConfig = require("../middleware/multerMiddleware/multerAdPost");
const multerUpdateProfileConfig = require("../middleware/multerMiddleware/multerUpdateProfile");
const router = new express.Router()
router.get('/first/:id', firstget)
router.post('/firstp', firstpost)
router.post('/log', login)
router.post('/reg', register)
router.post('/update', verifyToken, multerUpdateProfileConfig.array('dp', 1), updateUser)
router.post('/ads', multerAdPostConfig.array('images', 5), insertNewAds)
router.get('/adFetch/:userId', fetchAds)
router.get('/fetchUser/:userId', fetchUserDetails)
module.exports = router;