/*
This is a working code that takes all the images from a directory and sends it to the bg remove api
then it downloads the files to the provided directory

*/
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')
const glob = require("glob")

//  =========================================================================================
//  =========================================================================================
// TODO: Zeeshan, these 3 variables should be updated
let upload_dir = "./upload_dir"
let image_file_type = null
let download_dir = "./download_dir"

//  =========================================================================================
//  =========================================================================================

let glob_path = upload_dir + "/*" + (image_file_type ? "."+image_file_type: "")

let images_path_list = glob.sync(glob_path)


for (let iter=0; iter < images_path_list.length; iter++){
  
  console.log(images_path_list[iter])
  let inputPath = images_path_list[iter]
  
  const formData = new FormData()
  formData.append('size', 'auto')
  formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath))

  axios({
      method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: formData,
    responseType: 'arraybuffer',
    headers: {
        ...formData.getHeaders(),
        'X-Api-Key': 'g5VoUyafyekjf1AnNTgcPdBh',
      },
      encoding: null
    })
    .then((response) => {
        if(response.status != 200) return console.error('Error:', response.status, response.statusText)
        let no_bg_filename = download_dir + "/no-bg-" + iter + ".png"
        fs.writeFileSync(no_bg_filename, response.data)
      })
      .catch((error) => {
      return console.error('Request failed:', error)
  })

}
