const fs = require("fs");

const express = require("express");

const app = express();

const userDetails = JSON.parse(fs.readFileSync(`${__dirname}/data/userDetails.json`));

app.use(express.json());

const writeDataToFile = (filename, content) => {

fs.writeFileSync(filename, JSON.stringify(content, null, 2), 'utf-8');

};

app.post("/api/v1/details", (req, res) => {

const { name, mail, number } = req.body;

if (!name || !mail || !number) {

return res.status(400).json({

status: "Error",

message: "Missing user detail, all fields are required."

});

}

const newId = userDetails.length > 0 ? userDetails[userDetails.length - 1].id + 1 : 1;

const newUser = { id: newId, name, mail, number };

userDetails.push(newUser);

writeDataToFile(`${__dirname}/data/userDetails.json`, userDetails);

res.status(201).json({

status: "Success",

message: "User registered successfully",

data: { newUser }

});

});


