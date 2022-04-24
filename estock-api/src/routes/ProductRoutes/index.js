const router = require('../router')
const ProductController = require("../../controllers/ProductController");

router.post('/product/create', ProductController.createProduct)
router.get('/product/get/:productId', ProductController.getProductById)
router.get('/product/getall', ProductController.getAll)
router.get('/product/getall/:type', ProductController.getAllByRegex)
router.patch('/product/update/:productId', ProductController.updateProduct)
router.patch('/product/update/:type', ProductController.updateAllByRegex)
router.delete('/product/delete/:productId', ProductController.deleteProduct)
router.delete('/product/delete/:type', ProductController.deleteAllByRegex)
