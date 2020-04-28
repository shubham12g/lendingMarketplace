import lenderInstance from "./getLenderInstance.js";
import borrowerInstance from "./getBorrowerInstance.js";

const address = (web3Provider) => {
  const account = web3.eth.accounts;
  let lenderInst, borrowerInst, loansGranted;
  $.getJSON("Lender.json", function (lender) {
    lenderInstance(lender, web3Provider)
      .then((instance) => {
        lenderInst = instance;
        return lenderInst.Get_Borrower_Address({ from: account[0] });
      })
      .then((res) => {
        console.log(res.length);
        $.getJSON("Borrower.json", function (borrower) {
          borrowerInstance(borrower, web3Provider)
            .then((instance) => {
              borrowerInst = instance;
              let numOfBorrowers = res.length;

              if (numOfBorrowers == 0) {
                $("#grantData").append(`No Data to display!`);
                $("#loadActivity").append(`No Data to display`);
              }
              for (let i = 0; i < numOfBorrowers; ++i) {
                borrowerInst.borrowers(res[i]).then((result) => {
                  const name = result[0];
                  const amountGranted = result[8];

                  let data = ` <tr style="background-color:white;">
                                  <td>${i + 1}</td>
                                  <td>${name}</td>
                                  <td>${amountGranted}</td>
                                  <td>5%</td>
                                  <td>Active</td>
                                </tr>`;

                  $("#grantData").append(data);
                  if (i < 2) $("#loadActivity").append(data);
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default address;
