
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
  
      let toNumber = event["to_number"]; //telervit, (number user called)
      let fromNumber = event["from_number"]; //telerivet (number that called into telerivt)
      let secret = event["secret"];
      let taskData = event["taskData"];
      console.log(event);
      
      //validate it is a telerivet good request
      if (!secret || secret.toUpperCase() !== context.TELERIVET_USSD_SECRET.toUpperCase()) {
        let response = new Twilio.Response();
        console.error('received secret ' + secret);
        response.setStatusCode(401);
        callback(null, response);
        return;
      }
      
      //you can do other processing here e.g., text the end user etc.
      
      const task = await client.taskrouter.workspaces(context.TASK_WORKSPACE_ID)
      .tasks
      .create({attributes: JSON.stringify({
        type: 'support',
        channel:'ussd',
        to: toNumber,
        from: fromNumber,
        customAttributes : taskData,
      })}, taskChannel = 'ussd');
      console.warn('Created task ' + task.sid);
      
        
      //let telerivet know  
      let response = new Twilio.Response();
      response.setStatusCode(200);
      response.setBody('Success');
      callback(null, response);
    }
    catch (err) {
      console.error(err);
      callback(err);
    }
  };
  
  