
//const libphonenumber = require("libphonenumber-js/max");

/**
 * public twilio function exposed on the /telerivet path.
 * used as webhook from Telerivet when the  Android phone recieves an incoming call. 
 * Decides what happens based off callers item in sync.
 * @param {*} context
 * @param {*} event
 * @param {*} callback
 */

 exports.handler = async function (context, event, callback) {
    try {
      
      const sessionId = event.sessionId;
      const serviceCode = event.serviceCode;
      const phoneNumber = event.phoneNumber;
      const text = event.text;
      console.warn('USSD-MENU sessionId', sessionId + ' serviceCode ' + serviceCode + ' phoneNumber ' + phoneNumber + ' text: ' + text + '"');
      let response = '';
      if (text === "") {
        console.log(text);
        // This is the first request. Note how we start the response with CON
        response = `CON Please select one of the options
            1. Vaccine Information
            2. COVID-19 News`;
      } else if (text === "1") {
        // Business logic for first level response
        response = `CON Choose vaccine information you would like to view
            1. Standby list
            2. Location near you`;
      } else if (text === "2") {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `END Your phone number is ${phoneNumber}`;
      } else if (text === "1*1") {
        // This is a second level response where the user selected 1 in the first instance
        
        // This is a terminal request. Note how we start the response with END
        response = `END Your phone number ${phoneNumber} has been added to standby list`;
      } else if (text === "1*2") {
        // This is a second level response where the user selected 1 in the first instance
        
        // This is a terminal request. Note how we start the response with END
        response = `END There are two locations next to you. 1600 W 29th st and 1200 W38th st.`;
      }
    
      let fromNumber = event["to_number"]; //telervit, (number user called)
      let toNumber = event["from_number"]; //telerivet (number that called into telerivt)
      
      callback(null, response);
    }
    catch (err) {
      console.error(err);
      callback(err);
    }
  };
  
  