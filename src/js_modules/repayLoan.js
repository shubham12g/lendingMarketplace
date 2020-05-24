import borrowerInstance from "./getBorrowerInstance.js";
import getTimeElapsed from "./getTimeElapsed.js";
import setBorrowerStatus from "./setBorrowerStatus.js";
import setLenderStatus from "./setLenderStatus.js";

const repay = (web3Provider) => {
  const account = web3.eth.accounts;
  $.getJSON("Borrower.json", function (borrower) {
    borrowerInstance(borrower, web3Provider)
      .then((instance) => {
        return instance.borrowers(account[0]);
      })
      .then((res) => {
        const amount = parseInt(res[8]);
        const timeElapsed = getTimeElapsed(res[9]);
        const oneMonth = 30;
        const monthsElapsed = Math.ceil(timeElapsed / oneMonth);

        let amountToPay = Math.round(amount + (amount * 5) / 100);
        for (let i = 1; i < monthsElapsed; ++i) {
          amountToPay = Math.round(amountToPay + (amountToPay * 5) / 100);
        }

        amountToPay = amountToPay / 16000;

        const lender = res[11];
        const borrower = res[10];

        console.log(lender);
        console.log(borrower);

        const exec = web3.eth.sendTransaction(
          {
            to: lender,
            from: borrower,
            value: web3.toWei(amountToPay, "ether"),
          },
          function (err, res) {
            if (err) {
              console.log(err);
            } else {
              setBorrowerStatus(lender, borrower, web3Provider);
            }
          }
        );
      });
  });
};

export default repay;
