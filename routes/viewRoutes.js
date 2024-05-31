const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController')

router.get('/',viewsController.getHome)
router.get('/faq',viewsController.getfaq)
router.get('/abtus', viewsController.getaboutus)
router.get('/client', viewsController.getclient)
router.get('/accountRecovery', viewsController.getaccountRecovery)
router.get('/clientregister', viewsController.getclientregister)
router.get('/apply', viewsController.getapply)
router.get('/login', viewsController.getlogin)
router.get('/passwordreset',viewsController.getpasswordreset)
router.get('/selector',viewsController.getselector)
router.get('/talentprofile',viewsController.gettalentProfile)


module.exports = router