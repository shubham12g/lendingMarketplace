const registerLender = (lenderFormInputs, web3Provider) => {
  const account = web3.eth.accounts;
  let { lName, lAge, lAddress, lPhone, lAadhar } = lenderFormInputs;

  $.getJSON("Lender.json", function (lender) {
    const lenderContract = TruffleContract(lender);
    lenderContract.setProvider(web3Provider);

    lenderContract
      .deployed()
      .then(function (instance) {
        return instance.Set_Lender(lName, lAge, lAddress, lPhone, lAadhar, {
          from: account[0],
        });
      })
      .then(function (result) {
        alert("Registered Successfully!");
        $("#registerLender").html(`Register`);
        window.location.href = "index.html";
      })
      .catch(function (err) {
        alert("Registration Failed!");
        $("#registerLender").html(`Register`);
        window.location.href = "index.html";
      });
  });
};

export default registerLender;
