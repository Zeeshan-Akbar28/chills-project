"use strict"

const imgbbUploader = require("imgbb-uploader");

require('dotenv').config()


async function toImgbbURL(base64_img){

    const options = {
        apiKey: process.env.IMGBB_API_KEY, // MANDATORY
        base64string: base64_img
    };

    return await imgbbUploader(options)
        
}

module.exports = {
    toImgbbURL
}