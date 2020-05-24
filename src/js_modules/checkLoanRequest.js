const check = (amount, amountLimit) => {
  let amountLimitValue = amountLimit.match(/\d+/);
  let checkamount = amount.match(/\d+/);

  if (
    amount == "" ||
    amount != checkamount ||
    parseInt(amount) > parseInt(amountLimitValue)
  ) {
    return false;
  } else {
    let repayamount = parseInt(amount) + (parseInt(amount) * 5) / 100;
    repayamount = Math.round(repayamount);
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
