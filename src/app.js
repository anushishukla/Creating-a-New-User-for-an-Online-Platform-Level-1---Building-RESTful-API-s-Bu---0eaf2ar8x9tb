const fs = require("fs");

const express = require("express");

const app = express();

const userDetails = JSON.parse(

fs.readFileSync(`${__dirname}/data/userDetails.json`)

);

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

const newId = userDetails[userDetails.length - 1].id + 1;

const newUser = {

id: newId,

name,

mail,

number

};

userDetails.push(newUser);

writeDataToFile(`${__dirname}/data/userDetails.json`, userDetails);

res.status(201).json({

status: "Success",

message: "User registered successfully",

data: {

newUser

}

});

});

app.get("/api/v1/details", (req, res) => {

res.status(200).json({

status: "Success",

message: "Detail of users fetched successfully",

data: {

userDetails,

},

});

});

app.get("/api/v1/userdetails/:id", (req, res) => {

let { id } = req.params;

id *= 1;

const details = userDetails.find((details) => details.id === id);

if (!details) {

return res.status(404).send({

status: "failed",

message: "Product not found!",

});

} else {

res.status(200).send({

status: "success",

message: "Details of users fetched successfully",

data: {

details,

},

});

}

});

module.exports = app;


