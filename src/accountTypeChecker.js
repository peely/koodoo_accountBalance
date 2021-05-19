const accountTypeChecker = (accountBalanceHistory) => {
    /***
    Your goal is to write a function that determines from someone's ${accountBalanceHistory} 🧾 (see the array above for an example)
    whether this array is of type A (variable) or type B (fixed).
  
    Type 🅰 denotes a balance history where the balance amount decreases by varying amounts each month.
  
    Type 🅱 is one where the balance amount changes by the same amount each month.
    ***/

    // Write your logic here  - No pressure 😁 //
    return categorizeABH(accountBalanceHistory);
};


const categorizableError = new Error('Account Balance History uncategorizable');

function categorizeABH(accountBalanceHistory) {

    // If we are given no input, we cannot categorize it
    if(!Array.isArray(accountBalanceHistory) || accountBalanceHistory.length <= 1) {
        throw categorizableError;
    }

    // Sort the array
    // The order of objects in the array might not be the same as the order of the 'monthNumber' field
    // We also sort it as "oldest first", so that we go forwards in time as we loop the array
    // making it easier to understand, because a negative change will mean a balance decrease
    const sortedABH = accountBalanceHistory.sort((a, b) => {
        return b.monthNumber - a.monthNumber
    })

    // Now we loop the array, extracting each months change
    const monthlyChanges = getMonthlyChanges(sortedABH);

    // If we only have one value in the array, then it's fixed
    let result = null;
    if(monthlyChanges.length == 1) {
        // One record, so it's...
        // Type 🅱 is one where the balance amount changes by the same amount each month.
        result = 'B'
    } else {
        // Nope, not fixed, so I guess its variable
        // Type 🅰 denotes a balance history where the balance amount decreases by varying amounts each month.

        // Though, that requirement does specify "decreases". So we'll check that all the records are negative
        if(allRecordsAreNegative(monthlyChanges)) {
            // Thats it, multiple records and all negative, so type A
            result = 'A'
        } else {
            // The variations vary from positive to negative, so that does not fit into the allowable responses
            // I hope you handle exceptions!
            throw categorizableError
        }
    }

    return result
}

function getMonthlyChanges(ABH) {
    const monthlyChanges = [];
    ABH.forEach((currentMonth, index) => {
        // Skip the first item in the array as it has no comparable history
        if (index == 0) { return };

        // Get the previous record
        const oneMonthAgo = ABH[index - 1];

        // We should only compare consecutive months
        // If they are consecutive they will only differ by 1
        if ((oneMonthAgo.monthNumber - currentMonth.monthNumber) != 1) { return };

        // Get the balance difference
        const lastMonthChange = currentMonth.account.balance.amount - oneMonthAgo.account.balance.amount;

        // Store it, if we've not seen it before
        if(!monthlyChanges.includes(lastMonthChange)) {
            monthlyChanges.push(lastMonthChange)
        }
    });

    return monthlyChanges;
}

function allRecordsAreNegative (records) {
    return records.reduce((previousWasNegative, currentRecord) => {
        if(!previousWasNegative) return previousWasNegative; // If we have already found a negative, bail out
        return currentRecord < 0
    }, true);
}


module.exports = {
    accountTypeChecker
}