var Borrower = artifacts.require("./BorrowerRegistration.sol");

contract("Borrower", function(accounts) {

    it("should register the borrower", function() {

        //Set the names of test data
        var name = "Shubham";
        var age = 22;
        var res_address = "Allahabad";
        var mob_no = "7755857345";
        var aadhar = "4321123456788765";
        var college = "UIT";
        var sender = accounts[1];

        var borrowerContract;

        return Borrower.deployed().then(function(instance) {

            borrowerContract = instance;

            /*instance.events.BorrowerRegistered({}, function (error, event) {
                console.log(event);
            }).on("error", console.error);*/

            //Call the Set_Borrower function
            return instance.Set_Borrower(name, age, res_address, mob_no, aadhar, college, {from: sender});
        }).then(function() {

            return borrowerContract.Get_Borrower.call({from: sender});
        }).then(function(result) {

           // var [_name, _age, _res_address, _mob_no, _aadhar, _college] = result;

            assert.equal(result[0], name, "Name wasn't properly added");
            assert.equal(result[1], age, "Age wasn't properly added");
            assert.equal(result[2], res_address, "Address wasn't properly added");
            assert.equal(result[3], mob_no, "Mobile number wasn't properly added");
            assert.equal(result[4], aadhar, "Aadhar number wasn't properly added");
            assert.equal(result[5], college, "College name wasn't properly added");
        });
    });
});