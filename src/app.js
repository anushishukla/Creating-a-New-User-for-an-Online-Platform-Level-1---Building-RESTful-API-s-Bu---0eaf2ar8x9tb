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

// Assuming the test expects the newUser object to be directly in the data field

writeDataToFile(`${__dirname}/data/userDetails.json`, userDetails);

res.status(201).json({

status: "Success",

message: "User registered successfully",

data: newUser // Make sure this aligns with the test expectation

});

});


Message..
