const {LoginController} = require("../../controllers");
const router = require("../router");

const controller = new LoginController();


router.route("/user/login").post(controller.makeLogin);
