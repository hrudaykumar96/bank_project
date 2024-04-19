const axios = require("axios");
const express = require("express");
const router = express.Router();

router.post("/deposit", async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    const response = await axios.post("http://127.0.0.1:8000/deposit/", {
      account_number: req.body.account_number,
      amount: req.body.amount,
    },{
      headers:{
        'Authorization': `Bearer ${authToken}`
      }
    });
    next()
    res.send(response.data);
  } catch (error) {
    res.send("please try again later")
  }
});

router.post("/withdraw", async (req, res) => {
  try {
    const authToken = req.headers.authorization;
    const response = await axios.post("http://127.0.0.1:8000/withdraw/", {
      account_number: req.body.account_number,
      amount: req.body.amount,
    },{
      headers:{
        'Authorization': `Bearer ${authToken}`
      }
      });
    res.send(response.data);
  } catch (error) {
    res.send("please try again later")
  }
});

module.exports = router;