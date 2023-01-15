const global_var =  require('./../utils/global_var')
const request = require('request');
const fs = require('fs')

// initializing the airtable

airtable_view = global_var.airtable_name


function downloadAllImgs(){
  airtable_view.select({}).eachPage((records, fetchNextPage) =>{
    
    records.forEach( record => {
      if (record.get("Original images")){
        record.get("Original images").forEach(img => {  
          let img_url = img['url']

          request.head(img_url, function(err, res, body){
            let filename = './download_dir/' + String(Date.now()) + '.jpg'
        
            request(img_url).pipe(fs.createWriteStream(filename))

          });
        

          
        })
      }

    })
  
  })
}

function updateImageField(save_in){

  const record = save_in['record']

  const img_obj_array = [{'url': save_in['img_url'], 'filename': 'bg_removed.png'}]

  global_var.airtable_name.update(record['id'],
    {
        "images without background": img_obj_array,
        "is_processed": true
    }      
    , function(err, records) {
    if (err) {
      console.error(err);
      return
    }
  }
  
  )

}
 


module.exports = {
    updateImageField,
    downloadAllImgs

}