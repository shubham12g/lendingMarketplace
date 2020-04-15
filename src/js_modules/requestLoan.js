var requestLoan = (amount, web3Provider, account) => {
  $.getJSON("Borrower.json", function (borrower) {
    // Instantiate a new truffle contract from the artifact
    const Borrower = TruffleContract(borrower);
    Borrower.setProvider(web3Provider);

    Borrower.deployed()
      .then(function (instance) {
        return instance.Loan_Request(parseInt(amount), {
          from: account,
        });
      })
      .then(function (result) {
        alert(
          "Applied for loan successfully! You can check your loan status by clicking Active Request."
        );
        $("#requestBox").modal("toggle");
        $("#acceptTerms").html(`Accept and Apply`);
      })
      .catch(function (err) {
        alert("Failed to apply! Try again later.");
        $("#requestBox").modal("toggle");
        $("#acceptTerms").html(`Accept and Apply`);
      });
  });
};

export default requestLoan;
