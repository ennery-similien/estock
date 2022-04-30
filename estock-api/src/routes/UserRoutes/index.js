const router = require('../router')
const UserController = require("../../controllers/UserControllers");

router.post('/user/create', UserController.createUser);
router.get('/user/get/:userId', UserController.getUserById);
router.get('/user/get/niu/:userNIU', UserController.getUserByNIU);
router.get('/user/getall', UserController.getAll);
router.patch('/user/update/:userId', UserController.updateUser);
router.delete('/user/delete/:userId', UserController.deleteUser);
//router.get('/user/getall/:type', UserController.getAllByRegex);
//router.patch('/user/update/:type', UserController.updateAllByRegex);
//router.delete('/user/delete/:type', UserController.deleteAllByRegex);


