const router = require('../router');
const {AddressController} = require("../../controllers");

router.route('/address/create').post(AddressController.createAddress);
router.route('/address/getall').get(AddressController.getAll);
router.route('/address/:niu').get(AddressController.getAddressByNiu);
router.route('/address/:addressId').patch(AddressController.updateAddressById);