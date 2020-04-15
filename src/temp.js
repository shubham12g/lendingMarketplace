import init from "./js_modules/init.js";

App = {
  listenForBorrowerEvents: function() {
    App.contracts.Borrower.deployed().then(function(instance) {
      instance
        .BorrowerRegistered(
          {},
          {
            fromBlock: 0,
            toBlock: "latest"
          }
        )
        .watch(function(error, event) {
          console.log("event triggered", event);
        });
    });
  },

  listenForLenderEvents: function() {
    App.contracts.Lender.deployed().then(function(instance) {
      instance
        .LenderRegistered(
          {},
          {
            fromBlock: 0,
            toBlock: "latest"
          }
        )
        .watch(function(error, event) {
          console.log("event triggered", event);
          // Reload when a new vote is recorded
        });
    });
  },

  loginUser: function() {
    var user = $("input[name='loginUser']:checked").val();

    console.log(user);

    if (user == "Lender") {
      $.getJSON("Lender.json", function(lender) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.Lender = TruffleContract(lender);
        // Connect provider to interact with contract
        if (App.web3Provider == null) {
          return App.init();
        }
        App.contracts.Lender.setProvider(App.web3Provider);

        return App.loginLender();
      });
    } else {
      $.getJSON("Borrower.json", function(borrower) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.Borrower = TruffleContract(borrower);
        // Connect provider to interact with contract
        if (App.web3Provider == null) {
          return App.init();
        }
        App.contracts.Borrower.setProvider(App.web3Provider);

        return App.loginBorrower();
      });
    }
  },

  loginBorrower: function() {
    App.setAddress();

    App.contracts.Borrower.deployed()
      .then(function(instance) {
        console.log(App.account[0]);
        return instance.Login_Borrower({ from: App.account[0] });
      })
      .then(function(result) {
        console.log(result);
        window.location.href = "borrower_homepage.html";
      });
  },

  loginLender: function() {
    App.setAddress();

    App.contracts.Lender.deployed()
      .then(function(instance) {
        return instance.Login_Lender({ from: App.account[0] });
      })
      .then(function(result) {
        console.log(result);
      });
  }
};

$(function() {
  $(window).on("load", () => {
    App.init();
  });
});
