const knex = require('../db')
const translateText = require('../translateText')

const addProperty = async (req, res) => {
    try {
        const {
            propertyName,
            description,
            address,
            city,
            state,
            country,
            propertyPriceSale,
            propertyBedrooms,
            propertyBathrooms,
            lang,
        } = req.body

        let translatedName
        let translatedDescription
        let translatedAddress
        let translatedCity
        let translatedState
        let translatedCountry

        if (lang === 'bn') {
            translatedName =
                await translateText(
                    propertyName,
                    'bn',
                    'en'
                )

            translatedDescription =
                await translateText(
                    description,
                    'bn',
                    'en'
                )

            translatedAddress =
                await translateText(
                    address,
                    'bn',
                    'en'
                )

            translatedCity =
                await translateText(
                    city,
                    'bn',
                    'en'
                )

            translatedState =
                await translateText(
                    state,
                    'bn',
                    'en'
                )

            translatedCountry =
                await translateText(
                    country,
                    'bn',
                    'en'
                )

            await knex('properties').insert({
                property_name:
                    JSON.stringify({
                        bn: propertyName,
                        en: translatedName,
                    }),

                description:
                    JSON.stringify({
                        bn: description,
                        en: translatedDescription,
                    }),

                address:
                    JSON.stringify({
                        bn: address,
                        en: translatedAddress,
                    }),

                city: JSON.stringify({
                    bn: city,
                    en: translatedCity,
                }),

                state: JSON.stringify({
                    bn: state,
                    en: translatedState,
                }),

                country:
                    JSON.stringify({
                        bn: country,
                        en: translatedCountry,
                    }),

                property_price_sale:
                    propertyPriceSale,

                property_bedrooms:
                    propertyBedrooms,

                property_bathrooms:
                    propertyBathrooms,
            })
        } else {
            translatedName =
                await translateText(
                    propertyName,
                    'en',
                    'bn'
                )

            translatedDescription =
                await translateText(
                    description,
                    'en',
                    'bn'
                )

            translatedAddress =
                await translateText(
                    address,
                    'en',
                    'bn'
                )

            translatedCity =
                await translateText(
                    city,
                    'en',
                    'bn'
                )

            translatedState =
                await translateText(
                    state,
                    'en',
                    'bn'
                )

            translatedCountry =
                await translateText(
                    country,
                    'en',
                    'bn'
                )

            await knex('properties').insert({
                property_name:
                    JSON.stringify({
                        en: propertyName,
                        bn: translatedName,
                    }),

                description:
                    JSON.stringify({
                        en: description,
                        bn: translatedDescription,
                    }),

                address:
                    JSON.stringify({
                        en: address,
                        bn: translatedAddress,
                    }),

                city: JSON.stringify({
                    en: city,
                    bn: translatedCity,
                }),

                state: JSON.stringify({
                    en: state,
                    bn: translatedState,
                }),

                country:
                    JSON.stringify({
                        en: country,
                        bn: translatedCountry,
                    }),

                property_price_sale:
                    propertyPriceSale,

                property_bedrooms:
                    propertyBedrooms,

                property_bathrooms:
                    propertyBathrooms,
            })
        }

        res.status(201).json({
            success: true,
            message:
                'Property added successfully',
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            message:
                'Something went wrong',
        })
    }
}

module.exports = {
    addProperty,
}