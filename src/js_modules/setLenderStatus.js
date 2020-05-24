import lenderInstance from "./getBorrowerInstance.js";

const statusLender = (sender, receiver, web3Provider) => {
  $.getJSON("Lender.json", function (lender) {
    lenderInstance(lender, web3Provider)
      .then((instance) => {
        instance.Loan_Repaid(receiver, { from: sender });
      })
      .then((res) => {
        console.log("Success2");
        $("#repayLoan").html(`Return`);
        $("#repayLoan").attr("disabled", true);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default statusLender;
