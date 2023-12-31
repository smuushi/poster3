var express = require('express');
var router = express.Router();

const {getUrlFromAwsWithKey, uploadToAWSWithURL} = require("../awsS3")


const PosterDBModel = require("../models/Poster");
const sendPoster = require("../util/nodemailer");

const { Configuration, OpenAIApi } = require("openai");
const config_1 = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const ai = new OpenAIApi(config_1)



/* GET home page. */
/*

localhost:5555/poster?criteria=papaya&email=rutherford@baker.com

throwing a get request to here ^ does the following, 

criteria = papaya
email = rutherford@baker.com

*/

router.get('/', async function(req, res, next) {
    try {

        const criteria = req.query.criteria;
        const email = req.query.email;
        console.log(criteria);

      let prompt;
        prompt = `Generate an extremely professional movie poster for the following movie script summary. 
        
        ${criteria}`;

        const numberOfImages = 1;
        const imageSize = "1024x1024";

        ai
          .createImage({
            prompt: prompt,
            n: numberOfImages,
            size: imageSize,
          })
          .then(async (data) => {
            let imageKeys = [];
            console.log(data.data.data[0].url)

            // result.data.data[0].url
            let imageAWSKey = await uploadToAWSWithURL(data.data.data[0].url, Date.now() + criteria.slice(0,5));

            let newPoster = new PosterDBModel({
                script: criteria, 
                AWSKey: imageAWSKey,
                email: email
            })

            const poster = await newPoster.save();

            let signedUrl = await getUrlFromAwsWithKey(imageAWSKey);

            // const imageUrl = await imageUrlPromise;

            sendPoster(email, signedUrl)

            res.json({signedUrl: signedUrl})

  
            // return res.json(imageUrl);
  
            // const returns = imageObjects.map((imageObj, idx) => {
            //   // // console.log(imageObj)
            //   const resObj = {...imageObj.toObject(),
            //     tempUrl: tempUrls[idx]
            //   };
  
            //   return resObj
            // })
  
            // // list.save();
  
            // return res.json({
            //   list: list,
            //   images: returns,
            // });
          });
  
    } catch (err) {
        // debugger
      res.json({error: err + "code: oh god..12312312"});
    }
});

module.exports = router;
