const express = require("express");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

client.setConfig({
  apiKey: "1567af8cf63402861be836b7fbc2ed24-us8",
  server: "us8",
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/", (req, res) => {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;
  const listId = "defc59a6df";

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const run = async () => {
    try {
      const response = await client.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });

      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (error) {
      console.log(error.status);
      res.sendFile(__dirname + "/failure.html");
    }
  };

  console.log(firstName, lastName, email);

  run();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${3000}`);
});

/// API Key
/// 1567af8cf63402861be836b7fbc2ed24-us8
