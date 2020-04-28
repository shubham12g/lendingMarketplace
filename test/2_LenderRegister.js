var Lender = artifacts.require("./Lender.sol");

contract("Lender", function (accounts) {
  it("should register the lender", function () {
    //Set the names of test data
    var name = "Yash";
    var age = 22;
    var res_address = "Allahabad";
    var mob_no = "7755857345";
    var aadhar = "432112345678";
    var sender = accounts[2];

    var lenderContract;

    return Lender.deployed()
      .then(function (instance) {
        lenderContract = instance;

        return instance.Set_Lender(name, age, res_address, mob_no, aadhar, {
          from: sender,
        });
      })
      .then(function () {
        return lenderContract.lenders(accounts[2]);
      })
      .then(function (result) {
        // var [_name, _age, _res_address, _mob_no, _aadhar, _college] = result;

        assert.equal(result[0], name, "Name wasn't properly added");
        assert.equal(result[1], age, "Age wasn't properly added");
        assert.equal(result[2], res_address, "Address wasn't properly added");
        assert.equal(result[3], mob_no, "Mobile number wasn't properly added");
        assert.equal(result[4], aadhar, "Aadhar number wasn't properly added");
      });
  });
});
