import {Router} from "express"
import { addProduct, listProduct, removeProduct, singleProductInfo } from "../controllers/productController.js"
import { upload } from "../middleware/multer.js"
import { adminMiddleware } from "../middleware/adminAuth.js"
export let productRouter = Router()

productRouter.post("/add",upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1},]),addProduct)
productRouter.post('/remove',removeProduct)
productRouter.post("/single",singleProductInfo)
productRouter.get("/list",listProduct)