const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/userdata/:accountnumber", async (req, res) => {
  try {
    const accountNumber = req.params.accountnumber;
    const authToken = req.headers.authorization;
    const response = await axios.get(
      `http://127.0.0.1:8000/fetchdata/${accountNumber}/`,{
        headers:{
          Authorization: `Bearer ${authToken}`
        }        
      }
    );
    res.send(response.data);
  } catch (error) {
    res.send("please try again later")
  }
});



router.put("/updatedata/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const authToken = req.headers.authorization;
    const { name, email, mobile, gender, dob, address } = req.body;
    const mobileString = mobile.toString();
    const data = await axios.get("http://127.0.0.1:8000/userdata/", {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    const usersdata = data.data;
    const email_exists = usersdata.some(
      (user) => user.email === email && user.id != id
    );
    const mobile_exists = usersdata.some(
      (user) => user.mobile === mobileString && user.id != id
    );
    if (email_exists) {
      res.send("email already registered");
    } else if (mobile_exists) {
      res.send("mobile number already registered");
    } else {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/update/${id}/`,
          {
            name,
            email,
            mobile: mobileString,
            gender,
            dob,
            address,
          }, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        res.send(response.data);
      } catch (error) {
        res.send("failed to update");
      }
    }
  } catch (error) {
    res.send("please try again later")
  }
});

module.exports = router;