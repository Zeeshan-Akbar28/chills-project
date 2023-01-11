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
            // rmbg_filename = save_in['record']['fields']['Original images'][0]['filename'].split(".")[0]
            // rmbg_filename += "-images without background.png"
            
            const base64img = result.base64img            

            if (save_in['location'] == 'imgbb'){
                imgbb_aux.toImgbbURL(base64img).then(res=> {
    
                    save_in['img_url'] = res['url']
    
                    airtable_aux.updateImageField(save_in)    
                })

            } 
            else if (save_in['location'] == 'server_repo'){
                // fs.writeFile(rmbg_filename, base64img)
            }

        })
        .catch(er => console.log(JSON.stringify(er), 'here in aux-removebg'))
        
}





module.exports = {
    bgRemoveURL
}

