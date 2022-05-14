const router = require('../router')
const {UserController} = require("../../controllers");

router.post('/user/create', UserController.createUser);
router.get('/user/get/:userId', UserController.getUserById);
router.get('/user/getall', UserController.getAll);
router.get('/user/getall/complete/', UserController.getCompleteUser);
router.get('/user/getall/complete/without/order', UserController.getCompleteUserWithoutOrders);
router.patch('/user/update/:userId', UserController.updateUserById);



