import init from "./js_modules/init.js";
import registerBorrower from "./js_modules/registerBorrower.js";
import registerLender from "./js_modules/registerLender.js";
import login from "./js_modules/loginUser.js";
import set_homepage from "./js_modules/setHomepage.js";
import validateBorrowerFormInputs from "./js_modules/validateBorrowerForm.js";
import validateLenderFormInputs from "./js_modules/validateLenderForm.js";
import checkLoanRequest from "./js_modules/checkLoanRequest.js";
import requestLoan from "./js_modules/requestLoan.js";
import load_request_data from "./js_modules/load_request_data.js";
import fetchActiveRequest from "./js_modules/fetchActiveRequest.js";
import loadBorrowerProfile from "./js_modules/loadBorrowerProfile.js";

const web3Provider = init();
var account = web3.eth.accounts;
var amount;

const currentPage = window.location.pathname;
if (currentPage == "/borrower_homepage.html") {
  const user = "Borrower";
  set_homepage(user, account[0], web3Provider);
}

if (currentPage == "/lender_homepage.html") {
  const user = "Lender";
  set_homepage(user, account[0], web3Provider);
}

if (currentPage == "/borrower_requests.html") {
  load_request_data(web3Provider);
}

if (currentPage == "/borrower_profile.html") {
  loadBorrowerProfile(web3Provider);
}

if (currentPage == "/lender_profile.html") {
  loadLenderProfile(web3Provider);
}

$("#registerBorrower").on("click", function () {
  const borrowerFormInputs = {
    bName: $("#bName").val(),
    bAge: $("#bAge").val(),
    bAadhar: $("#bAadhar").val(),
    bAddress: $("#bAddress").val(),
    bPhone: $("#bPhone").val(),
    bCollege: $("#bCollege").val(),
  };

  //const isValid = validateBorrowerFormInputs(borrowerFormInputs);

  //if (isValid) {
  registerBorrower(borrowerFormInputs, web3Provider);
  //}
});

$("#registerLender").on("click", function () {
  const lenderFormInputs = {
    lName: $("#lName").val(),
    lAge: $("#lAge").val(),
    lAddress: $("#lAddress").val(),
    lPhone: $("#lPhone").val(),
    lAadhar: $("#lAadhar").val(),
  };

  const isValid = validateLenderFormInputs(lenderFormInputs);

  if (isValid) {
    registerLender(lenderFormInputs, web3Provider);
  }
});

$("#loginUser").on("click", function () {
  let user = $("#selCategory").val();
  console.log(user);
  login(user, web3Provider);
});

$("#requestLoan").on("click", function () {
  $("#requestLoan").html(`<i class="fa fa-spinner fa-spin"></i>Requesting`);
  var amountLimit = $("#bLimit").val();
  amount = $("#bAmount").val();
  const valid = checkLoanRequest(amount, amountLimit);

  if (!valid) {
    alert("Enter Valid Amount!");
    $("#bAmount").val("");
    $("#requestLoan").html(`Request`);
  } else {
    setTimeout(function () {
      $("#requestBox").modal("toggle");
      $("#requestLoan").html(`Request`);
    }, 2000);
  }
});

$("#acceptTerms").on("click", function () {
  if (!$("#borrowConfirmation").is(":checked")) {
    $("#checkBox").text("Please accept above terms!");
  } else {
    $("#acceptTerms").html(`<i class="fa fa-spinner fa-spin"></i>Applying`);
    requestLoan(amount, web3Provider, account[0]);
    $("#bAmount").val("");
  }
});

$("#activeRqst").on("click", function () {
  $("#activeRqst").html(`<i class="fa fa-spinner fa-spin"></i>Loading`);
  fetchActiveRequest(web3Provider);
  setTimeout(function () {
    $("#activeRequestBox").modal("toggle");
    $("#activeRqst").html(`Active Request`);
  }, 2000);
});
