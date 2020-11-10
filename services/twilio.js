var twilio = require("twilio");
//Account SID from www.twilio.com/console
var accountSid = "AC010eb377a4d6f760d4cf379827aec90f"; //Account SID from www.twilio.com/console
//Auth Token from www.twilio.com/console
var authToken = "681849c9c7bf2722ca48047b0bb409d1";

var twilio = require("twilio");
var client = new twilio(accountSid, authToken);

client.messages
	.create({
		body: "Thanks for your order. Our chefs will start working on it soon.",
		// Text this number
		to: "+15189514222",
		// From a valid Twilio number
		from: "+19295521003",
	})
	.then((message) => console.log(message.sid));

var numbersToMessage = ["+13129195111", "+15162410043", "+15163162021"];

numbersToMessage.forEach(function (number) {
	var message = client.messages
		.create({
			body:
				"Welcome brown bag! We look forward to serving you! Your table is ready. Please proceed to table 12.",
			from: "+19295521003",
			to: number,
		})
		.then((message) => console.log(message.status))
		.done();
});
