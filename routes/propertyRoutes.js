const express =
    require('express')

const router =
    express.Router()

const {
    addProperty,
    getProperties,
} = require(
    '../controllers/propertyController'
)

router.post(
    '/add',
    addProperty
)

router.get(
    '/',
    getProperties
)

module.exports =
    router