// server.js
// where your node app starts

// init project
require("dotenv").config();
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

app.get("/api/timestamp", (req, res) => {
	try {
		const timestamp = new Date();
		console.log(timestamp.toUTCString());
		res.status(200).json({
			unix: timestamp.getTime(),
			utc: timestamp.toUTCString(),
		});
	} catch {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.get("/api/timestamp/:date", (req, res) => {
	// destructure date param out of req object
	const { date } = req.params;
	// date variable with date_str passed in, reassignable value
	let timeStamp = new Date(date);
	try {
		if (timeStamp.toString() === "Invalid Date") {
			// parse millisecond integer string that could be the param
			timeStamp = new Date(parseInt(date));
		}
		// if its still an invalid value
		if (timeStamp.toString() === "Invalid Date") {
			// respond 400 status tell user input is invalid date format
			res.status(400).json({ error: "Invalid Date" });
		}
		// respond 200 with unix / utc date stamps
		res.status(200).json({
			unix: timeStamp.getTime(),
			utc: timeStamp.toUTCString(),
		});
	} catch {
		// catch any internal server errors
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
	console.log(`Express Server listening on ${process.env.PORT}`);
});
