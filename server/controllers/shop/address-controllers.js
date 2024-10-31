const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    // get the required things like userid, etc..
    const { userId, address, city, pincode, phone, notes } = req.body;
    // if any of this is missing give as invalid data
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }
    // create newly created address
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });
    //   save this
    await newlyCreatedAddress.save();
    // return newly created data
    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
const fetchAllAddress = async (req, res) => {
  try {
    // fetching by user id, get it first from params
    const { userId } = req.params;
    //  if user id missing
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }
    //   find our address based on userid
    const addressList = await Address.find({ userId });
    // return address
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    // get the updated formData from body
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    ); //adding updated data

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
