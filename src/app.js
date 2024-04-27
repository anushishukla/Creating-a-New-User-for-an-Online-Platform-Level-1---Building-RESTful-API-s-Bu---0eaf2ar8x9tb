const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());

const userDetails = JSON.parse(fs.readFileSync(`${__dirname}/data/userDetails.json`, 'utf8'));

app.post("/api/v1/details", (req, res) => {

const { name, mail, number } = req.body;

if (!name || !mail || !number) {

return res.status(400).json({

status: "Error",

message: "Missing user detail, all fields are required."

});

}

const lastUser = userDetails.filter(user => user.id).pop();

const newId = lastUser ? lastUser.id + 1 : 1;

const newUser = { id: newId, name, mail, number };

userDetails.push(newUser);

writeDataToFile(`${__dirname}/data/userDetails.json`, userDetails, (err) => {

if (err) {

return res.status(500).json({

status: "Error",

message: "Failed to write data to file."

});

}

res.status(201).json({

status: "Success",

message: "User registered successfully",

data: newUser

});

});

});

function writeDataToFile(filename, content, callback) {

fs.writeFile(filename, JSON.stringify(content, null, 2), 'utf8', callback);

}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(`Server running on port ${PORT}`);

});
