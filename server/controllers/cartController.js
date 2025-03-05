import { userModel } from "../models/userModel.js";

export async function addToCart(req, res) {
  let { itemId, sizes,userId } = req.body;
  try {
    let response = await userModel.findById(userId);
    
    let cartData = response.cartData;
    if (cartData[itemId]) {
      // cheking value of size [eg. "M", "L"] present in itemId object
      if (cartData[itemId][sizes]) {
        cartData[itemId][sizes] += 1;
      } else {
        // this line means item id eg. aab present but that size "M" not present
        cartData[itemId][sizes] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][sizes] = 1;
    }
    
    let finalres = await userModel.findOneAndUpdate(userId, {cartData});
    
    return res.json({
      success: true,
      message: "added item to cart",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
}

// update cart
export async function updateCart(req, res) {
  try {
    let { userId, itemId, sizes, quantity } = req.body; 
    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    cartData[itemId][sizes] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({
      success: true,
      message: "update item successfull",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
// get userId Cart
export async function getUserCart(req, res) {
  try {
    let { userId } = req.body;
    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    res.json({
      success: true,
      message: cartData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
// remove item

export async function removeItem(req, res) {
  try {
    let { userId, itemId } = req.body; 

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $unset: { [`cartData.${itemId}`]: "" } }, 
      { new: true }
    );

    res.json({
      success: true,
      message: "Item removed successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
