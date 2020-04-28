const borrowerInstance = async (borrower, web3Provider) => {
  const borrowerContract = TruffleContract(borrower);
  borrowerContract.setProvider(web3Provider);

  const instance = await borrowerContract.deployed();

  return instance;
};

export default borrowerInstance;
