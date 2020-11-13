/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
require("dotenv").config({ path: "../.env" });

const twilio = require("twilio");
//Account SID from www.twilio.com/console
const accountSid = process.env.ACTWILIO_ACCOUNTSID; 
console.log("accountSid: ", accountSid);
//Auth Token from www.twilio.com/console
const authToken = process.env.TWILIO_AUTHTOKEN;
console.log("authToken: ", accountSid);

// eslint-disable-next-line no-unused-vars
const username = process.env.TWILIO_USERNAME;

const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body:
            "Welcome to the brown bag app! We look forward to serving you! Our chefs will be happy to prepare your food for your pickup order. We will text you again when its ready. Powered by Twilio.",
    // Text this number
    to: process.env.TO_NUMBER,
    // From a valid Twilio number
    from: process.env.FROM_NUMBER
  })
// eslint-disable-next-line no-console
  .then((message) => console.log(message.sid));

function sendMessage({customerPhoneNumber, customerName, message}) {
  client.messages.create({
    body:
            "Welcome to the brown bag app! We look forward to taking care of your order! Our chefs will be happy to prepare your food for your pickup order. We will text you again when its ready. Powered by Twilio.",
    // Text this number
    to: process.env.TO_NUMBER,
    // From a valid Twilio number
    from: process.env.FROM_NUMBER
  })
  // eslint-disable-next-line no-console
    .then((message) => console.log(message.sid));

}
// var numbersToMessage = ["TO_NUMBER", "TO_NUMBER"];

// numbersToMessage.forEach(function (number) {
// 	//go back and check
//     // eslint-disable-next-line no-unused-vars
//     var message = client.messages
//         .create({
//             body:
//                 "Welcome brown bag! We look forward to serving you! Your table is ready now. Please proceed to table 12. Then when you are ready to eat please place your order on the app and our chefs will be happy to prepare it for you.",
//             from: "FROM_NUMBER",
//             to: number,
//         })
//         // eslint-disable-next-line no-console
//         .then((message) => console.log(message.status))
//         .done();
// });
module.exports = {
  sendMessage: sendMessage
};