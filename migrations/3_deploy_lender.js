var lender = artifacts.require("./Lender.sol");

module.exports = function(deployer) {
  deployer.deploy(lender);
};
