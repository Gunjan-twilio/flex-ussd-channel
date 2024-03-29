function main() {
  console.log("ivr");
  sendReply("Please choose language\n1) English\n2) French");
  promptDigits("language_option");
}

addInputHandler("language_option", function (input) {
  console.log("language_option");
  if (input == "1") {
    sendReply("Please choose location \n1) Dakar\n2) Touba\n3) Thies");
  } else if (input == "2") {
    sendReply(
      "Veuillez sélectionner l'emplacement \n 1) Dakar\n2) Touba\n3) Thies"
    );
  } else {
    sendReply("Invalid menu option");
  }
  promptDigits("location_option");
});

addInputHandler("location_option", function (input) {
console.log("location_option");

  if (input == "1") {
    sendReply(
      "Please enter support type \n1) Shelter\n2) Legal\n3) Food and Clothing"
    );
  } else if (input == "2") {
    sendReply(
      "Please enter support type \n1) Shelter\n2) Legal\n3) Food and Clothing"
    );
  } else if (input == "3") {
    sendReply(
      "Please enter support type \n1) Shelter\n2) Legal\n3) Food and Clothing"
    );
  }else {
    sendReply("Invalid menu option");
  }
  promptDigits("support_type_option");
});
addInputHandler("support_type_option", function (input) {
  sendReply("Do you want us to call you back \n1) Yes\n2) No");

  promptDigits("callback_option");
});

addInputHandler("callback_option", function (input) {
 console.log("callback_option");
  if (input == "2") {
    sendReply("Thank you");
  } else if (input == "1") {
    var table = project.getOrCreateDataTable("USSD-Flex-Service");

    var cursor = table.queryRows({
      vars: {
        "Phone Number": call.from_number,
        sort: "Time Created",
        "sort dir": "desc",
      },
    });

    cursor.limit(50);
    console.log(" count " + cursor.count());
    var ivrData = "";
    while (cursor.hasNext()) {
      ivrData = cursor.next();
    }
    console.log("state " + state);
    console.log("call " + call);
    var response = httpClient.request(
      "https://REPLACE_ME.twil.io/ussd/twilio-ussd-listener",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          from_number: call.from_number,
          to_number: call.to_number,
          secret: "REPLACE_ME",
          location_option: call.vars.location_option,
          language_option: call.vars.language_option,
          callback_option: call.vars.callback_option,
          support_type_option: call.vars.support_type_option,
        }),
      }
    );

    console.log(
      "API returned " + response.status + " " + response.content + " !!!"
    );
  } else {
    sendReply("Invalid menu option");
  }
});
