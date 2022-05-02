const router = require('../router')
const {UserController} = require("../../controllers");

router.post('/user/create', UserController.createUser);
router.get('/user/get/:userId', UserController.getUserById);
router.get('/user/get/niu/:userNiu', UserController.getUserByNiu);
router.get('/user/getall', UserController.getAll);
router.patch('/user/update/:userId', UserController.updateUserById);
router.patch('/user/update/niu/:userNiu', UserController.updateUserByNiu);



