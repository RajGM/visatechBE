require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//const PORT = process.env.PORT || 3001;
const PORT = 3001;

const { VapiClient } = require('@vapi-ai/server-sdk');

const vapi = new VapiClient({ token: process.env.VAPI_TOKEN });

// app.post('/submit', (req, res) => {
//     console.log('Received form submission:', req.body);
//     const { email } = req.body;
//     if (!email) {
//         return res.status(400).json({ error: 'Name and email are required' });
//     }

//     try {
//         /* Kick off an outbound call */
//         const call = await vapi.calls.create({
//             assistantId: process.env.VAPI_ASSISTANT_ID,      // e.g. "assistant-id"
//             phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID, // e.g. "phone-number-id"
//             customer: { number: '+11231231234' }             // or look up from DB
//         });                                                // :contentReference[oaicite:0]{index=0}

//         console.log(`Vapi call created → ${call.id}`);

//         return res.status(200).json({
//             message: 'Email captured & call placed ✔️',
//             emailId,
//             callId: call.id
//         });
//     } catch (err) {
//         console.error('Vapi call failed:', err);
//         return res.status(500).json({ error: 'Failed to place outbound call' });
//     }

//     res.json({ message: 'Form submitted successfully' });
// });

app.post('/submit', async (req, res) => {
  const { emailId } = req.body;
  console.log('Received emailID:', emailId);

  if (!emailId) {
    return res.status(400).json({ error: 'emailId field is required' });
  }

  try {
    /* Kick off an outbound call */
    const call = await vapi.calls.create({
      assistantId: 'ccbfcb24-8dea-4aa6-ab19-291cb611a309',      // e.g. "assistant-id"
      phoneNumberId: 'a009ff03-4f70-456a-992d-89787ff30957', // e.g. "phone-number-id"
      customer: { number: '+917800455892' }             // or look up from DB
    });                                                // :contentReference[oaicite:0]{index=0}

    console.log(`Vapi call created → ${call.id}`);

    return res.status(200).json({
      emailId,
      callId: call.id
    });
  } catch (err) {
    console.error('Vapi call failed:', err);
    return res.status(500).json({ error: 'Failed to place outbound call' });
  }

});


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});