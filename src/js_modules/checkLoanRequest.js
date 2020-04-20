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
    $("#amtRequested").html("");
    $("#amtRequested").html("Amount Requested: <b>" + amount + "</b>");

    $("#amtRepay").html("");
    $("#amtRepay").html(
      "Repay Amount: <b>" +
        repayamount +
        "</b> (if paid on or before repay time)"
    );

    return true;
  }

  return false;
};

export default check;
