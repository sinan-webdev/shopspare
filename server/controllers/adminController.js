import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "missing data",
      });
    }
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD 
    ) {
      let token = jwt.sign({ token: email },process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: token,
      });
    } else {
      return res.json({
        success: false,
        message: "invalid  creadentials",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
