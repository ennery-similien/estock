const router = require('../router')
const UserController = require("../../controllers/UserControllers");

router.post('/user/create', UserController.createUser)
router.get('/user/get/:userId', UserController.getUserById)
router.get('/user/getall', UserController.getAll)
router.get('/user/getall/:type', UserController.getAllByRegex)
router.patch('/user/update/:userId', UserController.updateUser)
router.patch('/user/update/:type', UserController.updateAllByRegex)
router.delete('/user/delete/:userId', UserController.deleteUser)
router.delete('/user/delete/:type', UserController.deleteAllByRegex)


