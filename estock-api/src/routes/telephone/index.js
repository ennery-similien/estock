const router = require("../router");
const {TelephoneController} = require("../../controllers");

router.route("/telephone/create").post(TelephoneController.createTelephone);
router.route("/telephone/get/:owner").get(TelephoneController.getTelephoneByOwner);
router.route("/telephone/all").get(TelephoneController.getAllTelephones);
router.route("/telephone/update/:telephoneId").patch(TelephoneController.updateTelephoneById);