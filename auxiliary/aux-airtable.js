const airtable = require("airtable")
const global_var =  require('./../utils/global_var')



function updateImageField(record, img_obj_array){

    global_var.airtable_name.update(record['id'],
        {
            "bg_removed": img_obj_array,
            "is_processed": true

        }      
        , function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
    }
    
    )

}
 


module.exports = {
    updateImageField,

}