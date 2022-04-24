const router = require('./router')
require('./UserRoutes')
require('./ProductRoutes')

router.get('/', (req, res) => {
    res.send({message: "o que foi ?"})
})

//Group all route in individualy file
//and import all routes files in api.route
//and export only api.route to app
module.exports = router