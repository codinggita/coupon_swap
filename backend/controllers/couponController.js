
const Coupon = require('../models/Coupon'); 
exports.createCoupon = async (req, res) => {
  try {
    const {
      platform,
      couponCode,
      valueRs,
      valuePercent,
      expiryDate,
      sellingPrice,
      minimumBuyPrice,
      description,
      sellerName,
      image
    } = req.body;

    console.log(req.body);
    if (!platform || !couponCode || !expiryDate || !sellingPrice || !minimumBuyPrice) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    const newCoupon = new Coupon({
      platform,
      couponCode,
      valueRs,
      valuePercent,
      expiryDate,
      sellingPrice,
      minimumBuyPrice,
      description,
      sellerName,
      image
    });
    const savedCoupon = await newCoupon.save();

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      data: savedCoupon
    });
  } catch (error) {
    console.log(error);
    console.log(error.code);
    if (error.code === 11000) { 
      return res.status(400).json({
        success: false,
        message: 'Coupon code already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find()
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};