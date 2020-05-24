import borrowerInstance from "./getBorrowerInstance.js";
import setLenderStatus from "./setLenderStatus.js";

const status = (sender, receiver, web3Provider) => {
  $.getJSON("Borrower.json", function (borrower) {
    borrowerInstance(borrower, web3Provider)
      .then((instance) => {
        instance.Loan_Repay({ from: receiver });
      })
      .then((res) => {
        console.log("Success1");
        setLenderStatus(sender, receiver, web3Provider);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default status;
