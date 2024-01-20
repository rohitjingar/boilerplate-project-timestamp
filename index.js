// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/:date", function (req, res) {
  let inputDate = req.params.date;

  // If date parameter is empty, use current time
  if (!inputDate) {
    inputDate = new Date();
  }

  // Check if the inputDate is in the "YYYY-MM-DD" format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(inputDate)) {
    // Convert inputDate to Unix timestamp
    const dateValue = Date.parse(inputDate);

    // Check if the dateValue is a valid number
    if (!isNaN(dateValue)) {
      // Valid date
      const dateObject = new Date(dateValue);
      const unixTimestamp = dateObject.getTime();
      const utcString = dateObject.toUTCString();

      // Send the response with the JSON object
      res.json({ unix: unixTimestamp, utc: utcString });
      return; // End the function to prevent the invalid date response
    }
  }

  // If date is not in "YYYY-MM-DD" format or parsing failed
  // Convert inputDate to a number (Unix timestamp)
  const dateValue = parseInt(inputDate);

  // Check if the dateValue is a valid number
  if (!isNaN(dateValue)) {
    // Valid date
    const dateObject = new Date(dateValue);
    const unixTimestamp = dateObject.getTime();
    const utcString = dateObject.toUTCString();

    // Send the response with the JSON object
    res.json({ unix: unixTimestamp, utc: utcString });
  } else {
    // Invalid date
    res.json({ error: "Invalid Date" });
  }
});






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

