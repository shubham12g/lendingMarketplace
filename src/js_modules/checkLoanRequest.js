var check = (amount, amountLimit) => {
  var amountLimitValue = amountLimit.match(/\d+/);
  var checkamount = amount.match(/\d+/);

  if (
    amount == "" ||
    amount != checkamount ||
    parseInt(amount) > parseInt(amountLimitValue)
  ) {
    return false;
  } else {
    var repayamount = parseInt(amount) + (parseInt(amount) * 5) / 100;
    repayamount = Math.round(parseInt(repayamount));

    var curtime = Date.now();
    var repayTime = new Date(curtime);
    var curmonth = repayTime.getMonth();
    repayTime.setMonth(curmonth + 1);

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    $("#amtRequested").html("");
    $("#amtRequested").html("Amount Requested: <b>" + amount + "</b>");

    $("#amtRepay").html("");
    $("#amtRepay").html(
      "Repay Amount: <b>" +
        repayamount +
        "</b> (if paid on or before repay time)"
    );

    $("#repayTime").html("");
    $("#repayTime").html(
      "Repay Time: <b>" +
        repayTime.getFullYear() +
        " " +
        months[repayTime.getMonth()] +
        " " +
        repayTime.getDay() +
        "</b>"
    );

    return true;
  }

  return false;
};

export default check;
