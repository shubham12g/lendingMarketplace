const registerBorrower = (borrowerFormInputs, web3Provider) => {
  const account = web3.eth.accounts;
  let { bName, bAge, bAddress, bPhone, bAadhar, bCollege } = borrowerFormInputs;

  $.getJSON("Borrower.json", function (borrower) {
    const borrowerContract = TruffleContract(borrower);
    borrowerContract.setProvider(web3Provider);

    borrowerContract
      .deployed()
      .then(function (instance) {
        return instance.Set_Borrower(
          bName,
          bAge,
          bAddress,
          bPhone,
          bAadhar,
          bCollege,
          { from: account[0] }
        );
      })
      .then(function (result) {
        alert("Registered Successfully!");
        window.location.href = "index.html";
      })
      .catch(function (err) {
        alert("Registration failed!");
        window.location.href = "index.html";
      });
  });
};

export default registerBorrower;
