// 1.Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4.Spin the slot machine
// 5.check if the user won
// 6.give the user their winnings or take
// 7. play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOL_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}


const deposit = () => {
    while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if(isNaN(numberDepositAmount) || numberDepositAmount <=0) {
        console.log("Invalid deposit amount, try again.");
    } else {
        return numberDepositAmount
    }
  }
};

const getNumberOfLines = () => {

    while(true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);

    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines >= 3 ) {
        console.log('Invalid number of lines, try again.')
    } else {
        return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {

    while(true) {
        const bet = prompt("Enter the total bet per line: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.")
        } else {
            return numberBet;
        }
    }
}

//Function to spin the slot machine( fill it with randomized symbols )
const spin = () => {
    const symbols = [];  //Main array to contain object symbols and their count
    //Iterates through SYMBOLS_COUNT object creating pairs of symbol and count
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        //For Each symbol iterates as many times at it has counts (you can find it in the object on top)
        for (let i = 0; i < count; i++) { 
            symbols.push(symbol);       //pushes the symbol inside the arrray
        }
    }
    //Array to contain nested arrays which will contain 3 symbols each
    const reels = [];
    //First we iterate through all(3) Columns and push a nested array/row inside 
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        //Copy the symbols array with spread operator to have unique group of symbols for each reel
        const reelSymbols = [...symbols];
        //For each row(3) we add a random symbol and then push it into the neste reel 
        for( let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};



let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const spinIt = spin();