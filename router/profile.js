const express = require('express')
const router = express.Router()

const { getProfile, followUser, unfollowUser } = require('../contorller/profile')

// getProfile
router.post('/profiles/:username', getProfile)

// followUser
router.post('/profiles/:username/follow', followUser)

// unfollowUser
router.get('/profiles/:username/follow', unfollowUser)

module.exports = router
