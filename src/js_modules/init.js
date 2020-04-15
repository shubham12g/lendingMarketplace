const init = () => {
  var web3Provider = null;

  if (window.ethereum) {
    web3Provider = window.ethereum;

    //Request account access
    try {
      window.ethereum.enable();
    } catch (error) {
      console.log(error);
    }
  }
  //Legacy Dapp browsers
  else if (window.web3) {
    web3Provider = window.web3.currentProvider;
  }
  //If no web3 instance is injected, use ganache
  else {
    web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
  }

  web3 = new Web3(web3Provider);

  return web3Provider;
};

export default init;
