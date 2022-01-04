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
    console.log(event);
    let toNumber = event["to_number"]; //telervit, (number user called)
    let fromNumber = event["from_number"]; //telerivet (number that called into telerivt)
    let secret = event['secret'];
    let language_option = event["language_option"] == '1' ? 'English' : 'French';
    let location_option = event["location_option"];
    switch (event["location_option"]) {
      case '1':
        location_option = 'Dakar';
        break;
      case '2':
        location_option = 'Touba';
        break;
      case '3':
        location_option = 'Thies';
        break;
    }
    let callback_option = event["callback_option"] == "1" ? "Yes" : "No";
    let support_type_option = event["support_type_option"];
    switch (event["support_type_option"]) {
      case '1':
        support_type_option = 'Shelter';
        break;
      case '2':
        support_type_option = 'Legal';
        break;
      case '3':
        support_type_option = 'Food and Clothing';
        break;
    }
    console.log(toNumber);
    console.log(fromNumber);
    console.log(secret);
    console.log(location_option);
    console.log(language_option);
    console.log(callback_option);
    console.log(support_type_option);

    //validate it is a telerivet good request
    if (
      !secret ||
      secret.toUpperCase() !== context.TELERIVET_USSD_SECRET.toUpperCase()
    ) {
      let response = new Twilio.Response();
      console.error("received secret " + secret);
      response.setStatusCode(401);
      callback(null, response);
      return;
    }

    //you can do other processing here e.g., text the end user etc.

    const task = await client.taskrouter
      .workspaces(context.TASK_WORKSPACE_ID)
      .tasks.create(
        {
          attributes: JSON.stringify({
            type: "support",
            channel: "ussd",
            to: toNumber,
            from: fromNumber,
            language: language_option,
            location: location_option,
            callback: callback_option,
            support_type: support_type_option,
          }),
        },
        (taskChannel = "ussd")
      );
    console.log("Created task " + task.sid);

    //let telerivet know
    let response = new Twilio.Response();
    response.setStatusCode(200);
    response.setBody("Success");
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(err);
  }
};
