const twilio = require('twilio');

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

exports.sendBulkSMS = async (phoneNumbers, message) => {
    try {
        // Validate Twilio phone number
        if (!twilioPhone) {
            throw new Error('Invalid Twilio phone number in environment variables.');
        }

        // Validate phone numbers
        const validNumbers = phoneNumbers
            .filter(number => /^\d{10}$/.test(number)) // Ensure exactly 10-digit numbers
            .map(number => `+91${number}`);

        if (validNumbers.length === 0) {
            throw new Error('No valid phone numbers to send messages to.');
        }

        console.log('Sending SMS to the following numbers:', validNumbers);

        // Send messages and handle potential errors for individual recipients
        const promises = validNumbers.map(async (to) => {
            try {
                const response = await client.messages.create({
                    body: message,
                    from: twilioPhone,
                    to: to,
                });
                console.log(`Message sent to ${to}, SID: ${response.sid}`);
            } catch (error) {
                console.error(`Failed to send SMS to ${to}:`, error.message);
            }
        });

        // Wait for all SMS attempts to finish
        await Promise.all(promises);
    } catch (error) {
        console.error('Error in sendBulkSMS:', error.message);
        throw error; // Rethrow to allow the caller to handle
    }
};
