const FamilyWallet = artifacts.require("FamilyWallet");

module.exports = function (deployer) {
  deployer.deploy(FamilyWallet);
};
