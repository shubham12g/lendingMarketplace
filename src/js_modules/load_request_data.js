var load_request_data = (web3Provider) => {
  let borrowerInstance;
  let sno = 1;
  $.getJSON("Borrower.json", function (borrower) {
    // Instantiate a new truffle contract from the artifact
    const Borrower = TruffleContract(borrower);
    Borrower.setProvider(web3Provider);

    Borrower.deployed()
      .then(function (instance) {
        borrowerInstance = instance;
        return instance.borrowers_count();
      })
      .then(function (res) {
        for (let i = 0; i < res; ++i) {
          borrowerInstance
            .mapBorrowers(i)
            .then(function (address) {
              return borrowerInstance.borrowers(address);
            })
            .then(function (borrowers) {
              const loanStatus = borrowers[6];
              if (loanStatus >= 1) {
                let name = borrowers[0];
                let amount = borrowers[8];
                let address = borrowers[10];
                let status = "Not Granted";
                let btnText = "Accept";

                console.log(loanStatus);

                if (loanStatus == 2) {
                  status = "Granted";
                  btnText = "Accepted";
                }

                let data = `
                    <tr style="background-color:white;">
                      <td class="text-center">${sno}</td>
                      <td>${name}</td>
                      <td class="text-center">${amount}</td>
                      <td class="text-center">${status}</td>
                      <td class="text-right">5%</td>
                      <td class="text-right">
                        <button id="${address}" value="${amount}" onclick="acceptRequest(this)" class=" acceptBtn btn btn-sm btn-danger">
                          ${btnText}
                        </button>
                      </td>
                    </tr>
                  `;
                $("#requestData").append(data);

                let btnId = "#" + address;
                if (loanStatus == 2) {
                  $(btnId).attr("disabled", true);
                }
                ++sno;
              }
            });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

export default load_request_data;
