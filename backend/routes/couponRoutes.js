const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController'); 
router.post('/', couponController.createCoupon);
router.get('/', couponController.getAllCoupons);
module.exports = router;