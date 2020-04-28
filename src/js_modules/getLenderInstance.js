const lenderInstance = async (lender, web3Provider) => {
  const lenderContract = TruffleContract(lender);
  lenderContract.setProvider(web3Provider);

  const instance = await lenderContract.deployed();

  return instance;
};

export default lenderInstance;
