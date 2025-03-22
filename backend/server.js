const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const COMPANY_NAME = 'bmlmunjaluni';
const CLIENT_ID = '53613f8e-2639-4d95-9cec-87e253afdd83';
const CLIENT_SECRET = 'OJmnoZnONIDDHCZx';
const OWNER_NAME = 'Mohak Gupta';
const OWNER_EMAIL = 'mohakgupta0981@gmail.com';
const ROLL_NO = '220C2030128';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjIxNjE0LCJpYXQiOjE3NDI2MjEzMTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjUzNjEzZjhlLTI2MzktNGQ5NS05Y2VjLTg3ZTI1M2FmZGQ4MyIsInN1YiI6Im1vaGFrZ3VwdGEwOTgxQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImJtbG11bmphbHVuaSIsImNsaWVudElEIjoiNTM2MTNmOGUtMjYzOS00ZDk1LTljZWMtODdlMjUzYWZkZDgzIiwiY2xpZW50U2VjcmV0IjoiT0ptbm5abk9OSERIY1p4Iiwib3duZXJOYW1lIjoiTW9oYWsgR3VwdGEiLCJvd25lckVtYWlsIjoibW9oYWtndXB0YTA5ODFAZ21haWwuY29tIiwicm9sbE5vIjoiMjIwQzIwMzAxMjgifQ.NcVY4LhkMwljx1ATODy5oyJiFOgfUCFqwTZSpsFOBJ8";

const WINDOW_SIZE = 10;
let window = [];

const fetchNumbers = async (numberId) => {
    try {
        const url = `http://20.244.56.144/test/${numberId}`;
        const headers = { Authorization: `Bearer ${TOKEN}` };
        const response = await axios.get(url, { headers, timeout: 500 });
        return response.data.numbers || [];
    } catch (error) {
        return [];
    }
};

app.get('/numbers/:numberId', async (req, res) => {
    const numberId = req.params.numberId;
    const numbers = await fetchNumbers(numberId);
    const uniqueNumbers = [...new Set(numbers)];
    const windowPrevState = [...window];

    for (const num of uniqueNumbers) {
        if (window.length >= WINDOW_SIZE) {
            window.shift();
        }
        window.push(num);
    }

    const avg = window.reduce((sum, num) => sum + num, 0) / window.length || 0;

    res.json({
        windowPrevState: windowPrevState,
        windowCurrState: window,
        numbers: numbers,
        avg: avg.toFixed(2)
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});