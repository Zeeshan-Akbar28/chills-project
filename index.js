const removebg_aux = require('./auxiliary/aux-removebg')
const global_var =  require('./utils/global_var')

// initializing the airtable
airtable_view = global_var.airtable_name

// ------------------------------------------------------------------------------------------
// GET Request
// ------------------------------------------------------------------------------------------


airtable_view.select({}).eachPage((records, fetchNextPage) =>{
  // here we have each record

  records.forEach( record => {
    
    if (!record.get('is_processed') && record.get('raw_image')){   
      
      record.get("raw_image").forEach(img => {  

        save_in = {'location': 'airtable', 'record_place': record}
        
        removebg_aux.bgRemoveURL(img['url'], save_in)

      })
     
      
    }

    fetchNextPage()
  
  })
  

})

