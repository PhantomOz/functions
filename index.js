/* eslint-disable max-len */
// const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")(
    "sk_test_51IDhHfLx5PmzILkDPLWBDbxUeXCsDNsbmxl8BbJa1KdnZSx0aVo04VhlXNdH6NFSN0k0mUBskIp9p6FJxD3brbZy00HGRoRQqS"
);

// API

// App Config
const app = express();

// - Middleware
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (req, res) => res.status(200).send("hello world"));
app.post("/clone-51ce0/us-central1/api/payments/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// - Listen Command
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

