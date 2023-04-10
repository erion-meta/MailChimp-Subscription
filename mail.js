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

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});

/// API Key
/// 964905e0ac6bef34b38508b8ca686286-us8
