/*
    This file holds the variables that are used in different files.
    Mostly, the variables that are used for the object configuration are stored here
 */

require('dotenv').config()

airtable_api_key = process.env.AIRTABLE_API_KEY
base_id = process.env.AIRTABLE_BASE_ID
table_name = process.env.AIRTABLE_NAME

//* for airtable ------------------------------

const airtable = require("airtable")

airtable.configure({ apiKey: airtable_api_key })

const base = airtable.base(base_id) // id of the base table
const airtable_name = base(table_name) // table name



//* for remove.bg ------------------------------









module.exports = {
    airtable_name
}
