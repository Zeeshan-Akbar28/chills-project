const request = require('request')
const fs = require('fs')
// const airtable_crud = require('./CRUD/airtable')

require('dotenv').config()

api_key = process.env.AIRTABLE_API_KEY
base_id = process.env.AIRTABLE_BASE_ID
table_name = process.env.AIRTABLE_NAME



const rec_id = 'recIQNGtdeMEYI4Vm'


const endpoint = `https://api.airtable.com/v0/${base_id}/${table_name}`;
    const headers = {
    'Authorization': `Bearer ${api_key}`,
    'Content-Type': 'application/json',
    }

    request.get({url: endpoint, headers: headers, json: true}, (error, response, body) => {
    if (error) {
        console.error(error);
    } else {
        const records_data = body.records

        records_data.forEach(record => {
          if (!record.fields['is_processed']){
            const rec_id = record['id']
            console.log(record)
            // let raw_img = record.get('Original images')
          }
          
        });


    }
    })