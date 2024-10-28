const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// const getFilteredProducts = async (req, res) => {
//   try {
//     const product = await Product.find({});

//     res.status(200).json({
//       success: true,
//       data: products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured",
//     });
//   }
// };

module.exports = { getFilteredProducts };
