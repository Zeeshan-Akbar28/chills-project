const FormData = require('form-data')
const axios = require('axios')
const request = require('request')
require('dotenv').config()

api_key = process.env.AIRTABLE_API_KEY
base_id = process.env.AIRTABLE_BASE_ID
table_name = process.env.AIRTABLE_NAME


async function bgRemoval(img_url){
    
    // let bg_removed_imgs = []
    

        
    const formData = new FormData()
    formData.append('size', 'auto')
    formData.append('image_url', img_url)

    axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data: formData,
            responseType: 'arraybuffer',
            headers: {
            ...formData.getHeaders(),
            'X-Api-Key': 'g5VoUyafyekjf1AnNTgcPdBh',
        },
        encoding: null
    
    })  
        .then((response) => {
            if(response.status != 200) return console.error('Error:', response.status, response.statusText)
            
            return response.data        // image is in this buffer format
        })
        .catch((error) => {
            return console.error('Request failed:', error)
        })
            
}


async function getRecords(){
    const endpoint = `https://api.airtable.com/v0/${base_id}/${table_name}`;
    const headers = {
    'Authorization': `Bearer ${api_key}`,
    'Content-Type': 'application/json',
    }

    request.get({url: endpoint, headers: headers, json: true}, (error, response, body) => {
    if (error) {
        console.error(error);
    } else {
        return body.records
    }
    })
}




module.exports = { 
    bgRemoval,
    getRecords
 }
