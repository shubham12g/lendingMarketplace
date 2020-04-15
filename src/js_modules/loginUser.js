const login = (user, web3Provider) => {
  const account = web3.eth.accounts;

  if (user == "Lender") {
    $.getJSON("Lender.json", function(lender) {
      // Instantiate a new truffle contract from the artifact
      const Lender = TruffleContract(lender);
      Lender.setProvider(web3Provider);

      Lender.deployed()
        .then(function(instance) {
          return instance.Login_Lender({ from: account[0] });
        })
        .then(function(result) {
          console.log(result[0]);
          if (result[0] == true) window.location.href = "lender_homepage.html";
          else {
            alert("Login failed! (Check metamask and try again)");
          }
        });
    });
  } else {
    $.getJSON("Borrower.json", function(borrower) {
      // Instantiate a new truffle contract from the artifact
      const Borrower = TruffleContract(borrower);
      Borrower.setProvider(web3Provider);

      Borrower.deployed()
        .then(function(instance) {
          return instance.Login_Borrower({ from: account[0] });
        })
        .then(function(result) {
          console.log(result);
          if (result[0] == true)
            window.location.href = "borrower_homepage.html";
          else {
            alert("Login failed! (Check metamask and try again)");
          }
        });
    });
  }
};

export default login;
