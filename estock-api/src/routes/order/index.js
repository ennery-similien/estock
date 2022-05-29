const router = require("../router");
const {OrderController} = require("../../controllers");
const controller = new OrderController();

router.route("/order/create").post(controller.createOrder);
router.route("/order/get/:orderId").get(controller.getOrderById);
router.route("/order/getall").get(controller.getAllOrder);
router.route("/order/update/:orderId").patch(controller.updateOrderById);
router.route("/order/update/additem/:orderId").patch(controller.updateOrderAddProduct);
router.route("/order/update/removeitem/:orderId").patch(controller.updateOrderRemoveProduct);
router.route("/order/update/item/:orderId").patch(controller.updateOrderItems);