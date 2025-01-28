const twilio = require('twilio');

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

exports.sendBulkSMS = async (phoneNumbers, message) => {
    const promises = phoneNumbers.map(number => 
        client.messages.create({
            body: message,
            from: twilioPhone,
            to: `+91${number}` // Adjust the format as needed
        })
    );

    await Promise.all(promises);
};
