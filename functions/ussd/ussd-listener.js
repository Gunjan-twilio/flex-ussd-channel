
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
      let client = context.getTwilioClient();
      console.warn('####################', event.body);
      const sessionId = event.sessionId;
      const serviceCode = event.serviceCode;
      const phoneNumber = event.phoneNumber;
      const text = event.text;
      

      console.warn('####################', sessionId + ' ' + serviceCode + ' ' + phoneNumber + ' ' + text);
      let fromNumber = event["to_number"]; //telervit, (number user called)
      let toNumber = event["from_number"]; //telerivet (number that called into telerivt)
      
      callback(null, 'END Hello from Twilio.org!');
    }
    catch (err) {
      console.error(err);
      callback(err);
    }
  };
  
  