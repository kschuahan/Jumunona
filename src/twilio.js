const express = require('express')
const bodyParser = require('body-parser')
const twilio = require('twilio')

const app= express()
const port = 3000;

app.use(bodyParser.json())

const accountSid = "AC735186d4166ebcdac8e80cb7c6c8f31a";
const authToken = "3beacdf25d20cf2f3c0d7fb4675b822d";
const twilioClient = new twilio(accountSid, authToken);

app.post('/send-otp', (req, res)=>{
    const mobileNumber= req.body;

    const otp= Math.floor(100000 +Math.random()* 900000);

    twilioClient.message.create({
      body: `Your OTP for jumunona is: ${otp}`,
      from: "+919782733491",
      to: "+917733070117"
    }).then(()=>{
        res.json({success: true, message: "OTP sent successfully", otp: otp});
    }).catch(error=>{
        res.status(500).json({success: false, message: error.message});
    });
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})

