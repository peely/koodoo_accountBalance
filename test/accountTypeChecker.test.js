const { describe, beforeAll, expect } = require('@jest/globals');
const { accountTypeChecker } = require('../src/accountTypeChecker')

const accountBalanceHistory_typeA = require('./testAssets/accountBalanaceHistory_A.json');
const accountBalanceHistory_typeB = require('./testAssets/accountBalanaceHistory_B.json');

const accountBalanaceHistory_Edge_B_wrong_order = require('./testAssets/accountBalanaceHistory_Edge_B_wrong_order.json');
const accountBalanaceHistory_Edge_B_non_con = require('./testAssets/accountBalanaceHistory_Edge_B_non_con.json');

const accountBalanaceHistory_Exception_VariableIncrease = require('./testAssets/accountBalanaceHistory_Exception_VariableIncrease.json');
const accountBalanaceHistory_Exception_OnlyOneRecord = require('./testAssets/accountBalanaceHistory_Exception_OnlyOneRecord.json');


describe('accountTypeChecker', () => {
  describe('Happy Path', () => {
    const testCases = [
      {
        testDescription: 'When given an array of type A',
        inputs: {
          ABH: accountBalanceHistory_typeA
        },
        outputs: {
          methodResult: 'A'
        }
      },
      {
        testDescription: 'When given an array of type B',
        inputs: {
          ABH: accountBalanceHistory_typeB
        },
        outputs: {
          methodResult: 'B'
        }
      },
      {
        testDescription: 'When given an array of type B in non-chronological order',
        inputs: {
          ABH: accountBalanaceHistory_Edge_B_wrong_order
        },
        outputs: {
          methodResult: 'B'
        }
      },
      {
        testDescription: 'When given an array of type B with a few non-consecutive months',
        inputs: {
          ABH: accountBalanaceHistory_Edge_B_non_con
        },
        outputs: {
          methodResult: 'B'
        }
      }
    ]

    testCases.forEach(testCase => {
      describe(testCases.testDescription, () => {
        let methodResult;
        beforeAll(() => {
          methodResult = accountTypeChecker(testCase.inputs.ABH)
        })

        test(`Returns expected categorisation ${testCase.outputs.methodResult}`, () => {
          expect(methodResult).toBe(testCase.outputs.methodResult)
        })
      })

    })
  })

  describe('Exceptions', () => {
    const testCases = [
      {
        testDescription: 'When given an array of neither type',
        inputs: {
          ABH: accountBalanaceHistory_Exception_VariableIncrease
        },
        exceptionMessage: 'Account Balance History uncategorizable'
      }, 
      {
        testDescription: 'When given an array with only one record',
        inputs: {
          ABH: accountBalanaceHistory_Exception_OnlyOneRecord
        },
        exceptionMessage: 'Account Balance History uncategorizable'
      },
      {
        testDescription: 'When given no input',
        inputs: {
          ABH: undefined
        },
        exceptionMessage: 'Account Balance History uncategorizable'
      },
      {
        testDescription: 'When given an input that is not an array',
        inputs: {
          ABH: {}
        },
        exceptionMessage: 'Account Balance History uncategorizable'
      },
      {
        testDescription: 'When given an input that is an empty array',
        inputs: {
          ABH: []
        },
        exceptionMessage: 'Account Balance History uncategorizable'
      },
    ]

    testCases.forEach(testCase => {
      describe(testCases.testDescription, () => {
        let exception;
        beforeAll(() => {
          try {
            accountTypeChecker(testCase.inputs.ABH)
          } catch (e) {
            exception = e
          }
        })

        test('Throws exception with correct message', () => {
          expect(exception.message).toBe(testCase.exceptionMessage)
        })
      })

    })
  })
})