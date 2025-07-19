const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const query = req.body.queryResult;
  const intent = query.intent.displayName;

  let responseText = "Sorry, I didn’t understand that.";

  if (intent === "Default Welcome Intent") {
    responseText = "Aloha! 🌴 How can I help you? Would you like to book a detailing service?";
  } else if (intent === "ServicesIntent") {
    responseText = `
🚗 *$199 Full Detail Special* (takes ~5 hours)
- Interior: Vacuum, steam, wipe down
- Exterior: Hand wash, wheels, ceramic wax
🕒 Time slots: 7:30 AM | 11:30 AM | 3:30 PM
💵 Cash preferred. Venmo/CashApp accepted (+4.2% fee).
    `;
  } else if (intent === "BookingIntent") {
    const date = query.parameters.date;
    const time = query.parameters.time;
    responseText = `You're all set! We'll see you on *${date} at ${time}*. Please have your vehicle ready.`;
  }

  res.json({
    fulfillmentText: responseText,
  });
});

app.get("/", (req, res) => {
  res.send("Dialogflow Webhook is live 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
