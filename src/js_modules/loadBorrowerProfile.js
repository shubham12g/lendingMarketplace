import months from "../js_modules/months.js";

const profile = (web3Provider) => {
  const account = web3.eth.accounts;
  $.getJSON("Borrower.json", function (borrower) {
    const getBorrowerData = async () => {
      const borrowerContract = TruffleContract(borrower);
      borrowerContract.setProvider(web3Provider);

      const instance = await borrowerContract.deployed();
      const res = await instance.borrowers(account[0]);

      return res;
    };

    getBorrowerData().then((borrowerInfo) => {
      let [
        name,
        age,
        address,
        mobileNo,
        aadharNo,
        clgName,
        loanStatus,
        loanLimit,
        amountToPay,
        timeOfLoan,
      ] = borrowerInfo;

      //Displaying Basic Info
      $(".borrowerName").html(name);
      $("#borrowerAge").html(parseInt(age));
      $("#borrowerAddress").html(address);
      $("#borrowerMob").html(mobileNo);
      $("#borrowerAadhar").html(aadharNo);
      $("#borrowerCollege").html(clgName);

      //Displaying loan related info
      $("#borrowerLimit").html(parseInt(loanLimit));

      let status;
      if (loanStatus == 0) status = "No active loans";
      else if (loanStatus == 1) status = "Active (Loan not Granted yet)";
      else status = "Active and Granted";

      $("#borrowerLoanStatus").html(status);

      if (loanStatus != 2) {
        $("#borrowerPay").html(`-`);
        $("#borrowerDate").html(`-`);
        $("#borrowerDeadline").html(`-`);
      } else {
        amountToPay = parseInt(amountToPay);
        const amountWithInterest = amountToPay + (amountToPay * 5) / 100;
        const loanGrantDate = new Date(timeOfLoan);
        const grantYear = loanGrantDate.getFullYear();
        const grantMonth = loanGrantDate.getMonth();
        const grantDay = loanGrantDate.getDay();

        const payYear = grantMonth == 11 ? grantYear + 1 : grantYear;
        const payMonth = (grantMonth + 1) % 12;
        const payDay = grantDay;

        $("#borrowerPay").html(`${amountWithInterest}`);
        $("#borrowerDate").html(
          `${grantYear} ${months[grantMonth]} ${grantDay}`
        );
        $("#borrowerDeadline").html(`${payYear} ${months[payMonth]} ${payDay}`);
      }
    });
  });
};

export default profile;
