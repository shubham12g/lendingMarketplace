import lenderInstance from "./getLenderInstance.js";
import borrowerInstance from "./getBorrowerInstance.js";

const address = (web3Provider) => {
  const account = web3.eth.accounts;
  let lenderInst, borrowerInst;
  let sno = 1;
  $.getJSON("Lender.json", function (lender) {
    lenderInstance(lender, web3Provider)
      .then((instance) => {
        lenderInst = instance;
        return lenderInst.Get_Borrower_Address({ from: account[0] });
      })
      .then((res) => {
        console.log(res);
        console.log(parseInt(res[1]));
        $.getJSON("Borrower.json", function (borrower) {
          borrowerInstance(borrower, web3Provider)
            .then((instance) => {
              borrowerInst = instance;
              let numOfBorrowers = res[0].length;

              if (numOfBorrowers == 0) {
                $("#noData2").append(`No Data to display!`);
                $("#noData").html(`No Data to display`);
              }
              for (let i = 0; i < numOfBorrowers; ++i) {
                borrowerInst.borrowers(res[i]).then((result) => {
                  const name = result[0];
                  const amountGranted = result[8];

                  let data = ` <tr style="background-color:white;">
                                  <td>${sno}</td>
                                  <td>${name}</td>
                                  <td>${amountGranted}</td>
                                  <td>5%</td>
                                  <td>Active</td>
                                </tr>`;

                  $("#grantData").append(data);
                  if (i < 2) $("#loadActivity").append(data);
                  ++sno;
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .then(() => {
        return lenderInst.Status_View({ from: account[0] });
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default address;
