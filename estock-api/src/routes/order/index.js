const router = require("../router");
const {OrderController} = require("../../controllers");
const controller = new OrderController();

router.route("/order/create").post(controller.createOrder);