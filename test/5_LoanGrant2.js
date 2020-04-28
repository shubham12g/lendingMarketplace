const Borrower = artifacts.require("./Borrower.sol");

contract("Borrower", function (accounts) {
  it("loan grant info should be recorded in borrower", function () {
    //Set the names of test data
    let date = new Date(Date.now());
    date = date.toString();
    const receiver = accounts[1];

    let borrowerContract;

    return Borrower.deployed()
      .then(function (instance) {
        borrowerContract = instance;

        return instance.Loan_Granted(date, receiver);
      })
      .then(function () {
        return borrowerContract.borrowers(accounts[1]);
      })
      .then(function (result) {
        assert.equal(result[6], 2, "Loan status not changed");
        assert.equal(result[9], date, "Date not added properly");
      });
  });
});
