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

    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3 ) {
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

// Creating matrix or transposing the 2D array 
const transpose = (reels) => {
    //This array will hold the 2D array
    const rows = [];
    //For each column we push nested array
    for (let i = 0; i < COLS; i++) {
    rows.push([]); 
    //For each row  we push reels row[j] at col[i] into the rows column meaning first 3[j] always from first col[i] 
    // are going to be pushed inside first column of rows[col] 
        for(let j = 0; j < ROWS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
  return rows;   
}
//Looping through each row of rows to print it inside let rowString with usage of looping through the each
// symbol and index of row  and adding the symbol inside the rowString while alwo adding | in between each symbol. 
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    } 
    return winnings;
};

const game = () => {
    let balance = deposit();

    while(true) {
        console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
        console.log("You won, $" + winnings.toString());

    if(balance <= 0) {
        console.log("You ran out of money")
        break;
        }

        const playAgain = prompt("Do you want to play again? (y/n): ")

        if (playAgain != "y") break;
    }
};


game();

