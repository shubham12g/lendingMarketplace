var Lender = artifacts.require("./Lender.sol");

contract("Lender", function (accounts) {
  it("borrower should be able to return the loan", function () {
    const sender = "0x9060A1679c7d4106F3cac77a118C1EF40f9af4f6";
    const receiver = "0x0c5743d0C31af0A7374048EC5ec7E16996136C8b";

    let lenderContract;

    return Lender.deployed()
      .then(function (instance) {
        lenderContract = instance;

        return instance.Loan_Repaid(receiver, { from: sender });
      })
      .then((result) => {
        assert.equal(result, 0, result.values());
        console.log(result);
      });
  });
});
