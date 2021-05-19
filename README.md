# Matthew Peel Koodoo Tech Test
Please find my solution to the [Account Balance History problem](https://gist.github.com/Koodoo-Tech/b41e159dc70b7b473c60eb3ce55f39f6).

## Commands
Run the function against the provided example `accountBalanceHistory.json` with `npm start` or just `node .`, and run the tests with `npm run test`

## Does it solve the basic case?
Yes, it will return A if the balance history "decreases by varying amounts each month", and it will return B if the "balance amount changes by the same amount each month". But it will also throw an exception, if the balance history does not meet those two specific criteria.

## What other cases might need to be considered?
I considered that the array given to me might not be in chronological order, so I sort it based on `monthNumber` before further processing.

I also considered that the data may not be complete, and so non-consecutive months should be ignored as they could lead to a false positive for variable change. If the data is incomplete, I considered trying to average the balance difference of the months difference, to ensure it's fixed, but decided against it to avoid possible unnecessary complexity.

In addition to this I thought about the inputs the method might get, concluding that no array, empty array and an array with one value would be exceptions, as no information either way can be obtained from these values.

I did originally consider the case of the balance history being "fixed" if it changed by only tiny amounts (That tolerance being configurable) from month to month. But I decided to stick to the requirements as I could not go ask the Business Analysis or Product Owner for clarification in this case.

I considered building an ExpressJS app to make the function into a micro service, and adding a docker-compose file to containerize said service... Don't worry, I'm joking, on the scale of 1 to too far, that would be a solid moon landing.

## What unit tests might you write for this type of function?
You'll find my unit tests at `test/accountTypeChecker.test.js`, and you can run them with `npm run test`. There are Happy Path tests that cover two valid inputs, with edge cases for being in non-chronological order, and for missing some months. And there are also Exceptions tests, checking what the function does when given invalid input (Hint, it throws an exception 😉)
