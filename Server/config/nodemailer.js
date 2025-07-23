import SibApiV3Sdk from '@sendinblue/client';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (to, subject, textContent) => {
    const client = new SibApiV3Sdk.TransactionalEmailsApi();

    const apiKey = process.env.BREVO_API_KEY;
    console.log('API Key:', apiKey); // Debugging line to check if API key is loaded
    const senderEmail = process.env.SENDER_EMAIL;

    if (!apiKey) {
        console.error('BREVO_API_KEY is missing in your environment variables!');
        return;
    }

    if (!senderEmail) {
        console.error('SENDER_EMAIL is missing in your environment variables!');
        return;
    }

    client.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    const emailData = {
        sender: { email: senderEmail },
        to: [{ email: to }],
        subject,
        textContent,
    };

    try {
        const response = await client.sendTransacEmail(emailData);
        console.log('✅ Email sent:', response.messageId || response);
    } catch (error) {
        console.error('Email sending error:', error.response?.body || error.message);
    }
};

export default sendEmail;
