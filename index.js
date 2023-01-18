"use strict"
const express = require('express')
const removebg_aux =  require('./auxiliary/aux-removebg')
const cron = require('node-cron')
const app = express();
// const airtable_aux = require('./auxiliary/aux-airtable')

// Defining port number
const PORT = 8000;                 
 
// Function to serve all static files inside public directory.
app.use(express.static('public')); 
app.use('/img', express.static('./images'));

// airtable_view = global_var.airtable_name


async function bgRemoveAndUpdate(){

  airtable_view.select({}).eachPage((records, fetchNextPage) =>{
    
    records.forEach( record => {
      if (!record.get('is_processed') && record.get('Original images')){   

        record.get("Original images").forEach(img => {  

        let save_in = {'location': 'imgbb', 'record': record, 'img_url': ''}  
        // let save_in = {'location': 'server_repo', 'record': record, 'img_url': ''}  
        removebg_aux.bgRemoveURL(img['url'], save_in)
            
            
        })
              
      }
    
      fetchNextPage()
            
    })
        
  })
      
}
    
    
// ------------------------------------------------------------------------------------------
//                                  Main code loop
// ------------------------------------------------------------------------------------------
    
    
app.listen(PORT, () => {
  
  console.log(`Running server on PORT ${PORT}...`);
      
      
  //* ------------------------------------------------------------------------
  cron.schedule('*/20 * * * * *', ()=> {  // 
    try{
      bgRemoveAndUpdate()
      console.log('cron_1')
    } 
    catch(er) { console.log(JSON.stringify(er), 'here in index.js cron job')}
    
  })


  //* ------------------------------------------------------------------------
    


    
})


