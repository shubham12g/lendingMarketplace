import months from "../js_modules/months.js";

const profile = (web3Provider) => {
  const account = web3.eth.accounts;
  $.getJSON("Lender.json", function (lender) {
    const getLenderInstance = async () => {
      const lenderContract = TruffleContract(lender);
      lenderContract.setProvider(web3Provider);

      const instance = await lenderContract.deployed();

      return instance;
    };

    getLenderInstance()
      .then((instance) => {
        return instance.lenders(account[0]);
      })
      .then((lenderInfo) => {
        let [name, age, address, mobileNo, aadharNo, noOfLoans] = lenderInfo;

        //Displaying Basic Info
        $(".lenderName").html(name);
        $("#lenderAge").html(parseInt(age));
        $("#lenderAddress").html(address);
        $("#lenderMob").html(mobileNo);
        $("#lenderAadhar").html(aadharNo);

        //Displaying loan related info
        $("#lenderLoans").html(parseInt(noOfLoans));
        $("#lenderActiveLoans").html(
          `<a href="lender_activity.html"><i class="fa fa-link" aria-hidden="true"></i> Activity</a>`
        );
      });
  });
};

export default profile;
