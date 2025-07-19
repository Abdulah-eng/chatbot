export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

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

  res.status(200).json({
    fulfillmentText: responseText,
  });
}
