import inquirer from "inquirer";

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

const main = async () => {
    //Input
    const userInput = await inquirer.prompt([
        {
            name: "start",
            message: "Start:",
        },
        {
            name: "end",
            message: "End:"
        }
    ]);
    const start = userInput.start;
    const end = userInput.end;

    //Output
    let output = {};
    for(let i=start; i<end; i++) {
        output = {...output, [i]: isPrime(i)}
    }
    console.log(output);

}

main();