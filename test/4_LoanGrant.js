var Lender = artifacts.require("./Lender.sol");

contract("Lender", function (accounts) {
  it("lender should be able to grant loan", function () {
    const sender = accounts[2];
    const receiver = accounts[1];

    let lenderContract;

    return Lender.deployed()
      .then(function (instance) {
        lenderContract = instance;

        return instance.Grant_Loan(receiver, {
          from: sender,
        });
      })
      .then(function () {
        return lenderContract.Get_Borrower_Address({ from: sender });
      })
      .then(function (result) {
        assert.equal(result, receiver, "Address wasn't added properly");
      });
  });
});
