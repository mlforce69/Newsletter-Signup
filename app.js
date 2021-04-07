const express = require("express");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  let jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/e6c28b9648";

  const options = {
      method: "POST",
      auth: "martin1:ca8a157c8df2ceed3581a6bd6c6fd0b7-us1"
  };

  const request = https.request(url, options, function (response) {

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }
    

      response.on("data", function(data){

          console.log(JSON.parse(data));
      })
  });
  

  request.write(jsonData);
  request.end();
});


app.post("/failure.html", function (req, res) {

    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});

//API key
// ca8a157c8df2ceed3581a6bd6c6fd0b7-us1

//List Id
//e6c28b9648
