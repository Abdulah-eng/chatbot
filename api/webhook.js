const express = require("express");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  const body = req.body;
  const intent = body.queryResult?.intent?.displayName;
  let responseText = "Sorry, I didn't understand that.";

  if (intent === "Default Welcome Intent") {
    responseText = "👋 Welcome! We're glad you're here!";
  } else if (intent === "BookingIntent") {
    responseText = "✅ Booking received! We'll follow up soon.";
  }

  res.json({ fulfillmentText: responseText });
});

// Export as Vercel serverless function
module.exports = app;
