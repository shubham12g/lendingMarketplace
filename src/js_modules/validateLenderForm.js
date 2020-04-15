var validateLender = (lenderFormInputs) => {
  let { lName, lAge, lAddress, lPhone, lAadhar } = lenderFormInputs;

  //console.log(bName.length);
  if (lName.length <= 1) {
    let nameError = $("#validateLName");
    nameError.show();
    nameError.text("Enter valid name!");

    $("#lName").on("focus", () => {
      nameError.hide();
    });

    return false;
  }

  const checkAge = lAge.match(/\d+/);
  if (lAge == "" || lAge != checkAge) {
    let ageError = $("#validateLAge");
    ageError.show();
    ageError.text("Enter valid age!");

    $("#lAge").on("focus", () => {
      ageError.hide();
    });

    return false;
  }

  const checkAadhar = lAadhar.match(/\d+/);
  if (lAadhar != checkAadhar || lAadhar.length != 12) {
    let aadharError = $("#validateLAadhar");
    aadharError.show();
    aadharError.text("Enter valid aadhar number!");

    $("#lAadhar").on("focus", () => {
      aadharError.hide();
    });
    return false;
  }

  if (lAddress.length <= 1) {
    let addressError = $("#validateLAddress");
    addressError.show();
    addressError.text("Enter valid address!");

    $("#lAddress").on("focus", () => {
      addressError.hide();
    });

    return false;
  }

  const checkPhone = lPhone.match(/\d+/);
  if (lPhone != checkPhone || lPhone.length != 10) {
    let phoneError = $("#validateLPhone");
    phoneError.show();
    phoneError.text("Enter a valid 10 digit mobile number!");

    $("#lPhone").on("focus", () => {
      phoneError.hide();
    });
    return false;
  }

  return true;
};

export default validateLender;
