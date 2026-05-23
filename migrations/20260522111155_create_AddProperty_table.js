/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable(
        'properties',
        table => {
            table
                .bigIncrements('id')
                .primary()

            // multilingual fields
            table.json(
                'property_name'
            )
            table.json(
                'description'
            )
            table.json(
                'about_property'
            )
            table.json('address')
            table.json('city')
            table.json('state')
            table.json('country')

            // basic info
            table.string(
                'property_type'
            ) // Buy / Rent

            table.string(
                'property_category'
            ) // apartment

            table.string(
                'property_structure_type'
            )

            table.string(
                'property_property_id'
            )

            // pricing
            table.decimal(
                'property_price_sale',
                12,
                2
            )

            table.decimal(
                'property_offer_price',
                12,
                2
            )

            table.string(
                'property_currency'
            )

            // property details
            table.integer(
                'property_sqft'
            )

            table.integer(
                'property_bedrooms'
            )

            table.integer(
                'property_bathrooms'
            )

            table.integer(
                'property_floor'
            )

            table.integer(
                'property_balcony'
            )

            table.integer(
                'property_garage_size'
            )

            table.integer(
                'property_parking'
            )

            table.integer(
                'property_ac'
            )

            table.integer(
                'property_fridge'
            )

            table.integer(
                'property_tv'
            )

            table.integer(
                'property_microwave'
            )

            table.integer(
                'property_wardrobe'
            )

            table.integer(
                'property_water_purifier'
            )

            // yes/no
            table.boolean(
                'property_available_curtains'
            )

            // dates
            table.date(
                'property_available_from'
            )

            table.date(
                'property_year_constructed'
            )

            // media
            table.text(
                'video_link'
            )

            table.string(
                'embed_video'
            )

            // array data
            table.json(
                'amenities'
            )

            table.json(
                'attachment'
            )

            table.timestamps(
                true,
                true
            )
        }
    )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down =
    async function (knex) {
        await knex.schema.dropTableIfExists(
            'properties'
        )
    }