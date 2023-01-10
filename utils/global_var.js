/*
    This file holds the variables that are used in different files.
    Mostly, the variables that are used for the object configuration are stored here
 */


//* for airtable ------------------------------

const airtable = require("airtable")

const base = airtable.base("app3lSwhZb23G3Gnh") // id of the base table
const airtable_name = base("airtable_integration") // table name



//* for remove.bg ------------------------------









module.exports = {
    airtable_name
}
