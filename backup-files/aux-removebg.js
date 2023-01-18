"use strict"

const fs = require('fs')
const airtable_aux = require('./aux-airtable')
const imgbb_aux = require('./aux-imgbb')
const rmbg = require('remove.bg')


require('dotenv').config()


const bg_api_key = process.env.REMOVEBG_API_KEY
const output_path = './img-removed-from-file.png'

async function bgRemoveURL(img_url, save_in){

    const url = img_url
    await rmbg.removeBackgroundFromImageUrl({
        url,
        apiKey: bg_api_key,
        size: "regular",
        type: "person",
        format: "png",
        crop: true, crop_margin: "20px",
        output_path

    })  .then(result => {
            let rmbg_filename = save_in['record']['id'] + '.png'
            
            const base64img = result.base64img

            // console.log('ratelimit', result.rateLimitRemaining)
            console.log('SCRIPT_LOG: bg removed; credits charged: ', result['creditsCharged'])   

            if (save_in['location'] == 'imgbb'){
                imgbb_aux.toImgbbURL(base64img).then(res=> {
    
                    save_in['img_url'] = res['url'] // image  url from the imgbb server
    
                    airtable_aux.updateImageField(save_in)    
                })
                
            } 
            else if (save_in['location'] == 'server_repo'){
            
                fs.writeFile('./download_dir/' + String(rmbg_filename), base64img, {
                    encoding: "base64" },
                (err) => { if (err) console.log(err);
            })
            
            save_in['img_url'] = '' // path to the image file (with domain) will be the url
            airtable_aux.updateImageField(save_in)    
            }

        })
        .catch(er => console.log(JSON.stringify(er), 'here in aux-removebg' ))
        
}






module.exports = {
    bgRemoveURL
}

