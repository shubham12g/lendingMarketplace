var borrower = artifacts.require("./Borrower.sol");

module.exports = function(deployer) {
  deployer.deploy(borrower);
};
