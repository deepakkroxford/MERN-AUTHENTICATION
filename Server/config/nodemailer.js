import SibApiV3Sdk from '@sendinblue/client';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (to, subject, textContent) => {
    const client = new SibApiV3Sdk.TransactionalEmailsApi();
    client.setApiKey(
        SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY
    );

    const emailData = {
        sender: { email: process.env.SENDER_EMAIL },
        to: [{ email: to }],
        subject,
        textContent,
    };

    try {
        const response = await client.sendTransacEmail(emailData);
        console.log('✅ Email sent:', response.messageId || response);
    } catch (error) {
        console.error('❌ Email sending error:', error.response?.body || error.message);
    }
};

export default sendEmail;
