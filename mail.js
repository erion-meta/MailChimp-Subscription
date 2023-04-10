const express = require("express");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

client.setConfig({
  apiKey: "964905e0ac6bef34b38508b8ca686286-us8",
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
  // res.send("Data posted to Mailchimp servers.");
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});

/// API Key
/// 964905e0ac6bef34b38508b8ca686286-us8
