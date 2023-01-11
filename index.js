"use strict"
const express = require('express')
const removebg_aux =  require('./auxiliary/aux-removebg')
const cron = require('node-cron')
const app = express();

// Defining port number
const PORT = 8000;                 
 
// Function to serve all static files inside public directory.
app.use(express.static('public')); 
app.use('/images', express.static('images'));

// airtable_view = global_var.airtable_name



function bgRemoveAndUpdate(){
  airtable_view.select({}).eachPage((records, fetchNextPage) =>{
    
        records.forEach( record => {
          if (!record.get('is_processed') && record.get('Original images')){   
            
            record.get("Original images").forEach(img => {  
                // console.log(img['url'])
                let save_in = {'location': 'imgbb', 'record': record, 'img_url': ''}  
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
  try{
    bgRemoveAndUpdate()
  } 
  catch(er) { console.log(JSON.stringify(er), 'here in index.js')}

})

app.listen(PORT, () => {
    console.log(`Running server on PORT ${PORT}...`);
    main_task.start()
    
  })


