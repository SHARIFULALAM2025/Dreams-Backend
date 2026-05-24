const knex = require('../db')
const translateText = require('../translateText')

const addProperty = async (
    req,
    res
) => {
    try {
        console.log(req.body)

        const {
            VideoLink,
            aboutProperty,
            address,
            amenities,
            attachment,
            city,
            country,
            description,
            embedVideo,
            lang,
            postEmail,
            postName,
            profileUrl,
            propertyAC,
            propertyAvailableCurtains,
            propertyAvailableFrom,
            propertyBalcony,
            propertyBathrooms,
            propertyBedrooms,
            propertyCategory,
            propertyCurrency,
            propertyFloor,
            propertyFridge,
            propertyGarageSize,
            propertyMicrowave,
            propertyName,
            propertyOfferPrice,
            propertyParking,
            propertyPriceSale,
            propertyPropertyId,
            propertySqft,
            propertyStructureType,
            propertyTV,
            propertyType,
            propertyWardrobe,
            propertyWaterPurifier,
            propertyYearConstructed,
            state,
        } = req.body

        // language direction
        const fromLang =
            lang === 'bn'
                ? 'bn'
                : 'en'

        const toLang =
            lang === 'bn'
                ? 'en'
                : 'bn'

        // safe translate helper
        const safeTranslate =
            async text => {
                if (
                    !text ||
                    typeof text !==
                    'string'
                ) {
                    return ''
                }

                return await translateText(
                    text,
                    fromLang,
                    toLang
                )
            }

        // translations
        const translatedName =
            await safeTranslate(
                propertyName
            )

        const translatedDescription =
            await safeTranslate(
                description
            )

        const translatedAbout =
            await safeTranslate(
                aboutProperty
            )

        const translatedAddress =
            await safeTranslate(
                address
            )

        const translatedCity =
            await safeTranslate(
                city
            )

        const translatedState =
            await safeTranslate(
                state
            )

        const translatedCountry =
            await safeTranslate(
                country
            )
        const translatedPropertyType =
            await safeTranslate(
                propertyType
            )
        const translatePropertyCategory =
            await safeTranslate(
                propertyCategory
            )
        const translatePropertyStructureType =
            await safeTranslate(
                propertyStructureType
        )
        // multilingual object
        const createLangObject = (
            original,
            translated
        ) => {
            return lang ===
                'bn'
                ? {
                    bn:
                        original ||
                        '',
                    en:
                        translated ||
                        '',
                }
                : {
                    en:
                        original ||
                        '',
                    bn:
                        translated ||
                        '',
                }
        }

        await knex(
            'properties'
        ).insert({
            // multilingual
            property_name:
                JSON.stringify(
                    createLangObject(
                        propertyName,
                        translatedName
                    )
                ),

            description:
                JSON.stringify(
                    createLangObject(
                        description,
                        translatedDescription
                    )
                ),

            about_property:
                JSON.stringify(
                    createLangObject(
                        aboutProperty,
                        translatedAbout
                    )
                ),

            address:
                JSON.stringify(
                    createLangObject(
                        address,
                        translatedAddress
                    )
                ),

            city: JSON.stringify(
                createLangObject(
                    city,
                    translatedCity
                )
            ),

            state:
                JSON.stringify(
                    createLangObject(
                        state,
                        translatedState
                    )
                ),

            country:
                JSON.stringify(
                    createLangObject(
                        country,
                        translatedCountry
                    )
                ),

            property_type:
                JSON.stringify(
                    createLangObject(
                        propertyType,
                        translatedPropertyType
                    )
                ),

            property_category:
                JSON.stringify(
                    createLangObject(
                        propertyCategory,
                        translatePropertyCategory
                    )
                ),

            property_structure_type:
                JSON.stringify(
                    createLangObject(
                        propertyStructureType,
                        translatePropertyStructureType
                    )
                ),

            // user info
            post_name:
                postName || '',

            post_email:
                postEmail || '',

            profileUrl:
                profileUrl || '',

            // media
            video_link:
                ObjectVideoLink || '',

            embed_video:
                embedVideo || '',

            attachment:
                JSON.stringify(
                    attachment || []
                ),

            amenities:
                JSON.stringify(
                    amenities || []
                ),

            property_property_id:
                propertyPropertyId ||
                '',

            property_currency:
                propertyCurrency ||
                '',

            // pricing
            property_price_sale:
                Number(
                    propertyPriceSale
                ) || 0,

            property_offer_price:
                Number(
                    propertyOfferPrice
                ) || 0,

            // numbers
            property_sqft:
                Number(
                    propertySqft
                ) || 0,

            property_bedrooms:
                Number(
                    propertyBedrooms
                ) || 0,

            property_bathrooms:
                Number(
                    propertyBathrooms
                ) || 0,

            property_floor:
                Number(
                    propertyFloor
                ) || 0,

            property_garage_size:
                Number(
                    propertyGarageSize
                ) || 0,

            property_parking:
                Number(
                    propertyParking
                ) || 0,

            property_ac:
                Number(
                    propertyAC
                ) || 0,

            property_fridge:
                Number(
                    propertyFridge
                ) || 0,

            property_tv:
                Number(
                    propertyTV
                ) || 0,

            property_microwave:
                Number(
                    propertyMicrowave
                ) || 0,

            property_wardrobe:
                Number(
                    propertyWardrobe
                ) || 0,

            property_water_purifier:
                Number(
                    propertyWaterPurifier
                ) || 0,

            // yes/no
            property_balcony:
                propertyBalcony ||
                'no',

            property_available_curtains:
                propertyAvailableCurtains ===
                'yes',

            // dates
            property_available_from:
                propertyAvailableFrom
                    ? new Date(
                        propertyAvailableFrom
                    ).getTime()
                    : null,

            property_year_constructed:
                propertyYearConstructed
                    ? new Date(
                        propertyYearConstructed
                    ).getTime()
                    : null,
        })

        res.status(201).json({
            success: true,
            message:
                'Property added successfully',
        })
    } catch (error) {
        console.log(
            'Property Save Error:',
            error
        )

        res.status(500).json({
            success: false,
            message:
                'Something went wrong',
            error:
                error.message,
        })
    }
}
const getProperties =
    async (req, res) => {
        try {
            const properties =
                await knex(
                    'properties'
                )
                    .select('*')
                    .orderBy(
                        'id',
                        'desc'
                    )

            res.status(200).json({
                success: true,
                data: properties,
            })
        } catch (error) {
            console.log(error)

            res.status(500).json({
                success: false,
                message:
                    'Failed to fetch properties',
            })
        }
    }

module.exports = {
    addProperty,
    getProperties,
}