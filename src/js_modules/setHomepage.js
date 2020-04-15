const set_homepage = (user, account, web3Provider) => {
  if (account === "0x0") {
    alert("Please login into metamask and try again!");
    window.location.href = "index.html";
  }

  if (user === "Borrower") {
    $.getJSON("Borrower.json", function(borrower) {
      const Borrower = TruffleContract(borrower);
      Borrower.setProvider(web3Provider);

      var borrower;

      Borrower.deployed()
        .then(function(instance) {
          borrower = instance;
          return instance.Login_Borrower({ from: account });
        })
        .then(function(result) {
          if (result[0] == true) {
            $("#setname").text("Hi " + result[1]);
          } else {
            alert("Please login and try again!");
            window.location.href = "index.html";
          }
          return borrower.Get_Loan_Limit({ from: account });
        })
        .then(function(result) {
          console.log("LImit:" + result);
          $("#bLimit").attr("value", "Borrowing Limit: " + result);
        });
    });
  } else {
    $.getJSON("Lender.json", function(lender) {
      const Lender = TruffleContract(lender);
      Lender.setProvider(web3Provider);

      Lender.deployed()
        .then(function(instance) {
          return instance.Login_Lender({ from: account });
        })
        .then(function(result) {
          if (result[0] == true) {
            $("#setname").text("Hi " + result[1]);
          } else {
            alert("Please login and try again!");
            window.location.href = "index.html";
          }
        });
    });
  }
};

export default set_homepage;
