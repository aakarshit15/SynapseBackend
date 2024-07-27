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

const isPrime = (num) => {
    let divisors = [1];  // Initializing divisors array (1 is divisible by all)
    for(let i=2; i<num; i++) {
        if(num % i === 0) {   // if divisible then
            divisors.push(i); // add to divisors array
        }
    }
    num !== 1 && divisors.push(num); // adding num itself to divisors
    return (divisors.length > 2) ? (divisors) : (num.toString(2)); 
}

const isPrimeObj = (start, end) => {
    let output = {};
    for(let i=start; i<end; i++) {
        output = {...output, [i]: isPrime(i)}
    }
    return output;
}

app.post("/createPassword", (req, res) => {
    res.status(200).json(genPassword(req.body));
});

app.post("/isPrime", (req, res) => {
    res.status(200).json(isPrimeObj(req.body.min, req.body.max));
});

app.listen(port, (req, res) => {
    console.log(`Server is running on http://localhost:${port}`);
});