const router = require('../router')
const ProductController = require("../../controllers/product");

router.route("/product/create").post(ProductController.createProduct);
//router.route("/product/get/:productId").get(ProductController.getProductById);
router.route("/product/get/barcode/:barcode").get(ProductController.getProductByBarcode);
router.route("/product/getall").get(ProductController.getAllProducts);
//router.route("/product/update/:productId").patch(ProductController.updateProductById);
router.route("/product/update/barcode/:barcode").patch(ProductController.updateProductByBarcode);
