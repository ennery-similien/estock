const router = require('../router')
const {UserController} = require("../../controllers");
const {Authentication} = require("../../../midleware");

const authorize = new Authentication();
const controller = new UserController();

router.route("/user/create").post(authorize.admin, controller.createUser);
router.route("/user/get/:userId").get(authorize.admin, controller.getUserById);
router.route("/user/getall").get(authorize.admin, controller.getAll);
router.route("/user/getall/complete").get(authorize.admin, controller.getCompleteUser);
router.route("/user/getall/complete/without/order").get(authorize.admin, controller.getCompleteUserWithoutOrders);
router.route("/user/update/:userId").patch(authorize.admin, controller.updateUserById);



