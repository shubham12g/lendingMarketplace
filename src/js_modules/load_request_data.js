var load_request_data = (web3Provider) => {
  var borrowerInstance, baddress;
  var sno = 1;
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
        for (var i = 0; i < res; ++i) {
          borrowerInstance
            .mapBorrowers(i)
            .then(function (address) {
              return borrowerInstance.borrowers(address);
            })
            .then(function (borrowers) {
              const loanStatus = borrowers[6];
              if (loanStatus) {
                let name = borrowers[0];
                let amount = borrowers[8];
                let address = borrowers[10];
                let status = "Not Granted";

                console.log(loanStatus);

                if (loanStatus == 2) status = "Granted";

                var data = `
                    <tr>
                      <td class="text-center">${sno}</td>
                      <td class="text-center">${name}</td>
                      <td class="text-center">${amount}</td>
                      <td class="text-center">${status}</td>
                      <td class="text-center">5%</td>
                      <td class="text-right">
                        <button id="${address}" value="${amount}" onclick="acceptRequest(this)" class=" acceptBtn btn btn-sm btn-danger">
                          Accept
                        </button>
                      </td>
                    </tr>
                  `;
                $("#requestData").append(data);
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
