const router = require('../router');
const {AddressController} = require("../../controllers");

router.route('/address/create').post(AddressController.createAddress);
router.route('/address/getall').get(AddressController.getAll);
router.route('/address/:owner').get(AddressController.getAddressByOwner);
router.route('/address/:addressId').patch(AddressController.updateAddressById);