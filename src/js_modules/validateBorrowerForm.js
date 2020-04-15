var validateBorrower = (borrowerFormInputs) => {
  let { bName, bAge, bAddress, bPhone, bAadhar, bCollege } = borrowerFormInputs;

  console.log(bName.length);
  if (bName.length <= 1) {
    let nameError = $("#validateBName");
    nameError.show();
    nameError.text("Enter valid name!");

    $("#bName").on("focus", () => {
      nameError.hide();
    });

    return false;
  }

  const checkAge = bAge.match(/\d+/);
  if (bAge == "" || bAge != checkAge) {
    let ageError = $("#validateBAge");
    ageError.show();
    ageError.text("Enter valid age!");

    $("#bAge").on("focus", () => {
      ageError.hide();
    });

    return false;
  }

  const checkAadhar = bAadhar.match(/\d+/);
  if (bAadhar != checkAadhar || bAadhar.length != 12) {
    let aadharError = $("#validateBAadhar");
    aadharError.show();
    aadharError.text("Enter valid aadhar number!");

    $("#bAadhar").on("focus", () => {
      aadharError.hide();
    });
    return false;
  }

  if (bAddress.length <= 1) {
    let addressError = $("#validateBAddress");
    addressError.show();
    addressError.text("Enter valid address!");

    $("#bAddress").on("focus", () => {
      addressError.hide();
    });

    return false;
  }

  const checkPhone = bPhone.match(/\d+/);
  if (bPhone != checkPhone || bPhone.length != 10) {
    let phoneError = $("#validateBPhone");
    phoneError.show();
    phoneError.text("Enter a valid 10 digit mobile number!");

    $("#bPhone").on("focus", () => {
      phoneError.hide();
    });
    return false;
  }

  if (bCollege.length <= 1) {
    let clgNameError = $("#validateBCollege");
    clgNameError.show();
    clgNameError.text("Enter a valid college name!");

    $("#bCollege").on("focus", () => {
      clgNameError.hide();
    });

    return false;
  }

  return true;
};

export default validateBorrower;
