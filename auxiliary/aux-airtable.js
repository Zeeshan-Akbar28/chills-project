const global_var =  require('./../utils/global_var')


// initializing the airtable

airtable_view = global_var.airtable_name




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

}