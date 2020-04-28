var Borrower = artifacts.require("./Borrower.sol");

contract("Borrower", function (accounts) {
  it("borrower should be able to request for loan", function () {
    //Set the names of test data
    const amount = 450;
    const sender = accounts[1];

    let borrowerContract;

    return Borrower.deployed()
      .then(function (instance) {
        borrowerContract = instance;

        return instance.Loan_Request(amount, { from: sender });
      })
      .then(function () {
        return borrowerContract.borrowers(accounts[1]);
      })
      .then(function (result) {
        assert.equal(result[6], 1, "Loan status not changed");
        assert.equal(result[8], amount, "Amount not added properly");
      });
  });
});
