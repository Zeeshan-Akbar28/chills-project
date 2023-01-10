/*
    This file holds the variables that are used in different files.
    Mostly, the variables that are used for the object configuration are stored here
 */

require('dotenv').config()

airtable_api_key = process.env.AIRTABLE_API_KEY

//* for airtable ------------------------------

const airtable = require("airtable")

airtable.configure({ apiKey: airtable_api_key })

const base = airtable.base("app3lSwhZb23G3Gnh") // id of the base table
const airtable_name = base("airtable_integration") // table name



//* for remove.bg ------------------------------









module.exports = {
    airtable_name
}
