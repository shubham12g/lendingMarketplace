import months from "./months.js";

const fetch = (web3Provider) => {
  const account = web3.eth.accounts;
  $.getJSON("Borrower.json", function (borrower) {
    const borrowerContract = TruffleContract(borrower);
    borrowerContract.setProvider(web3Provider);

    borrowerContract
      .deployed()
      .then(function (instance) {
        return instance.borrowers(account[0]);
      })
      .then(function (borrowers) {
        const loanStatus = borrowers[6];
        console.log(loanStatus);

        $("#requestHeading").html(`<b>Active Request<b>`);

        if (loanStatus == 0) {
          $("#requestStatus").html(``);
          $("#requestStatus").html(
            `<p>There is no active loan request currently!</p>`
          );
        } else {
          const amount = parseInt(borrowers[8]);
          const date = new Date(borrowers[9]);
          const month = date.getMonth();
          const year = date.getFullYear();
          const day = date.getDate();
          const repayAmt = Math.ceil(amount + (amount * 5) / 100);

          const dueDay = day;
          const dueMonth = (month + 1) % 12;
          const dueYear = month == 11 ? year + 1 : year;

          console.log(date);

          let status = "Not Granted";
          if (loanStatus == 2) {
            status = "Granted";
          }

          $("#requestStatus").html(`Status: <b>${status}</b>`);
          $("#requestAmount").html(`Amount Requested: <b>${amount}</b>`);

          if (loanStatus == 2) {
            $("#requestAcceptance").html(
              `Date of Acceptance: <b>${months[month]} ${day} ${year}</b>`
            );
            $("#requestRepay").html(
              `Repay Time: <b>${months[dueMonth]} ${dueDay} ${dueYear}</b`
            );
            $("#rqstRepayAmt").html(`Repay Amount: <b>${repayAmt}</b>`);
            $("#requestNote")
              .html(`Repay amount will be compounded monthly at 5% rate so, make
            sure you pay your loan on time.`);

            $("#repayLoan").attr("disabled", false);
          }
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

export default fetch;
