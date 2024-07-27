import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const specialChars = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~', '\\'];

app.use(bodyParser.urlencoded({extended: true}));

const genRandNum = (start, end) => {
    if(end >= start) {
        return (Math.floor(Math.random() * (end - start + 1)) + start);
    } else {
        return genRandNum(end, start);
    }
}

const genRandAscii = (start, end) => {
    return String.fromCharCode(genRandNum(start, end));
}

const genRandChar = (choice) => {
    switch(choice) {
        case "cp":
            return genRandAscii(65, 90);
        case "sm":
            return genRandAscii(97, 122);
        case "nm":
            return genRandNum(0, 9);
        case "sp":
            return specialChars[genRandNum(0, specialChars.length-1)];
    }
}

const genPassword = (filter) => {
    let password = '';
    let choices = [];
    filter.capital && choices.push("cp"); 
    filter.small && choices.push("sm"); 
    filter.numbers && choices.push("nm"); 
    filter.special && choices.push("sp"); 
    const length = genRandNum(parseInt(filter.min), parseInt(filter.max));
    for(let i=1; i<=length; i++) {
        password += genRandChar(choices[genRandNum(0, choices.length-1)]);
    }
    return {...filter, password: password, length: password.length};
}

app.post("/createPassword", (req, res) => {
    res.status(200).json(genPassword(req.body));
});

app.listen(port, (req, res) => {
    console.log(`Server is running on http://localhost:${port}`);
});