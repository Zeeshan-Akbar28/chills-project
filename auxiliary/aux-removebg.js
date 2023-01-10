// "use strict"

const fs = require('fs')
const airtable_aux = require('./aux-airtable')
const imgbb_aux = require('./aux-imgbb')
const rmbg = require('remove.bg')


require('dotenv').config()


const bg_api_key = process.env.REMOVEBG_API_KEY
const output_path = './img-removed-from-file.png'

async function bgRemoveURL(img_url, save_in){
    const url = img_url
    rmbg.removeBackgroundFromImageUrl({
        url,
        apiKey: bg_api_key,
        size: "regular",
        type: "person",
        output_path

    })  .then(result => {
            const base64img = result.base64img            

            if (save_in['location'] == 'airtable'){
                imgbb_aux.toImgbbURL(base64img) .then(res=> {
    
                    const img_http_url = res['url']
    
                    const rec = save_in['record_place']
                    img_obj_array = [{
                        'url': img_http_url,
                        'filename': 'new.png',
                    }]
                    
                    airtable_aux.updateImageField(rec, img_obj_array)    
                })

            } 
            else if (save_in['location'] == 'project_repo'){
                fs.writeFileSync('stack-abuse-logo-out.png', buff)
            }

        })
        .catch(er => console.log(JSON.stringify(er), 'here error'))
        
}





module.exports = {
    bgRemoveURL
}