const express = require('express')
const removebg_aux =  require('./auxiliary/aux-removebg')
const cron = require('node-cron')
const app = express();
 
// Defining port number
const PORT = 8000;                 
 
// Function to serve all static files inside public directory.
app.use(express.static('public')); 
app.use('/images', express.static('images'));



function bgRemoveAndUpdate(){
    airtable_view.select({}).eachPage((records, fetchNextPage) =>{
     
      records.forEach( record => {
        if (!record.get('is_processed') && record.get('raw_image')){   
          
          record.get("raw_image").forEach(img => {  
    
            save_in = {'location': 'imgbb', 'record': record, 'img_url': ''}  
            removebg_aux.bgRemoveURL(img['url'], save_in)
    
          })
        }
        fetchNextPage()
      
      })
      
    })
}
  

// ------------------------------------------------------------------------------------------
// Main code loop
// ------------------------------------------------------------------------------------------

const main_task = cron.schedule('*/5 * * * * *', ()=> {
    bgRemoveAndUpdate()

})

app.listen(PORT, () => {
    console.log(`Running server on PORT ${PORT}...`);
    main_task.start()
    
  })


