import express from 'express';
import { createTransport } from 'nodemailer';
import { json } from 'body-parser';
const app = express();
app.use(json());

const transporter = createTransport({
    service: 'gmail', // Use your preferred service
    auth: {
        user: 'StudyGroupEmailer@gmail.com',
        pass: '123studygroup!'
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;
    const mailOptions = {
        from: 'StudyGroupEmailer@gmail.com',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Sent');
        }
    });
});

app.listen(3000, () => {
    console.log('Email server running on port 3000');
});
