const router = require('../router')
const {ClientController} = require("../../controllers");

router.post('/client/create', ClientController.createClient);
router.get('/client/get/:clientId', ClientController.getClientById);
router.get('/client/get/niu/:clientNiu', ClientController.getClientByNiu);
router.get('/client/getall', ClientController.getAll);
router.patch('/client/update/:clientId', ClientController.updateClientById);
router.patch('/client/update/niu/:clientNiu', ClientController.updateClientByNiu);



