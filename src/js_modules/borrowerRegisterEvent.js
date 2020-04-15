const borrowerEvent = Borrower => {
  Borrower.deployed().then(function(instance) {
    instance
      .BorrowerRegistered(
        {},
        {
          //fromBlock: "latest",
          //toBlock: "latest"
        }
      )
      .watch(function(error, event) {
        console.log("event triggered", event);
      });
  });
};

export default borrowerEvent;
