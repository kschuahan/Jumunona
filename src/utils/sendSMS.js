import axios from "axios";
import base64 from "react-native-base64";

const sendSMS = async (phoneNumber, code) => {

if (!phoneNumber || typeof phoneNumber !== "string") {
  console.error("Invalid phone number:", phoneNumber);
  return;
}
   

  const formattedPhoneNumber = phoneNumber.startsWith("+")
    ? phoneNumber
    : `+${phoneNumber}`;

    fetch(
      "https://is3cksmd2oa25bg2gxtqrcj7gq0bfnbf.lambda-url.us-east-1.on.aws/ "
    ,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({formattedPhoneNumber}),

    })
    
    .then(resposne =>{
        resposne.json()
    }). then(data=>{
        if(data.success){
            const simulatedOTP= code;
        }
    })
};

export default sendSMS;
