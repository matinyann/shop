const { Router } = require('express')
const router = new Router()
const { getPhones, buyPhone } = require('../controllers/phones')

router.get('/', getPhones)
router.post('/buy/:id', buyPhone)

module.exports = router