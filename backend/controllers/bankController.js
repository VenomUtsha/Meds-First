const Bank = require("../models/bankModels");
const Product = require("../models/productModels");
const transactionModel = require("../models/transactionModel");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createBankAccount = async (req, res, next) => {
  const bank = await Bank.create(req.body);

  res.status(200).json({
    success: true,
    bank,
  }); 
}; 

exports.bankInfo = catchAsyncErrors(async (req, res, next) => {
  //const { bankAccount } = req.body;

  const bankInfo = await Bank.find();
  res.status(200).json({
    success: true,
    bankInfo,
  });
});





exports.usertransaction = catchAsyncErrors(async (req, res, next) => {
  const { bankAccount, totalAmount, secretKey, userId } = req.body;

  const bankInfo = await Bank.findOne({ accountNumber: bankAccount });

  if (!bankInfo || bankInfo.secretKey !== secretKey) {
    return next(new ErrorHandler("Provide correct information", 400));
  }

  const order = req.body.order;
  const status = 0;
  const date = Date.now();
  const input = date + bankAccount;
  const transactionId = crypto
    .createHash("sha256")
    .update(input)
    .digest("base64");

  const transaction = await transactionModel.create({
    bankAccount,
    totalAmount,
    userId,
    transactionId,
    order,
  });

  res.status(200).json({
    success: true,
    transaction,
  });
});

exports.admintransaction = catchAsyncErrors(async (req, res, next) => {

  const { transactionId } = req.body;
  

  //const ecommerceAccount = 12345;

  const adminTransaction = await transactionModel.findOne({
    transactionId: transactionId,
  });
  
  adminTransaction.status = 1;
  await adminTransaction.save();

  

  res.status(200).json({
    adminTransaction,

  });
});

exports.suppliertransaction = catchAsyncErrors(async (req, res, next) => {
  const { transactionId } = req.body;
  const supplierAccount = 1234;
  const ecommerceAccount = 12345;

  const bankInfoEcommerce = await Bank.findOne({
    accountNumber: ecommerceAccount,
  });



  const supplierTransaction = await transactionModel.findOne({
    transactionId: transactionId,
  });

  supplierTransaction.status = 2;
  await supplierTransaction.save();

  




  res.status(200).json({
    success: true,
    supplierTransaction,
    bankInfoSupplier,
  });
});


