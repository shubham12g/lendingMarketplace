/*
    Handcrafted by: Shubham Gupta

    About: This contract registers the borrower and shows the registered information on user's profile page.
*/

pragma solidity >=0.4.17 <0.7.0;
pragma experimental ABIEncoderV2;

contract Borrower {

    struct Borrower_Info {

        string name;
        uint age;
        string residential_address;
        string mobile_no;
        string aadhar_no;
        string college_name;
        
        uint loanStatus;          //0 -> inactive, 1 -> active, 2 -> granted
        uint loanLimit;             //It is initialized to 500.
        uint amountToPay;           //It is initialized to 0.
        string timeOfLoan;
        address borrowersAddress;    //Used to set the id of the Accept button
        address LendersAddress;
    }   

    event BorrowerRegistered(string _name, uint _age, string _address, string _mobile, string _aadhar, string _clg, address sender);


    uint public borrowers_count;
    mapping (uint => address) public mapBorrowers;
    mapping (address => Borrower_Info) public borrowers;
    mapping(address => bool) borrower_accounts; 

    //This function is used to save the information entered by the borrower during registraton.
    function Set_Borrower (string memory _name, uint _age, string memory _address, string memory _mobile, string memory _aadhar, string memory _clg) public {

        address uaddress = msg.sender;

        require(borrower_accounts[uaddress] == false, "You have already registered on our platform");

        borrowers[uaddress].name = _name;
        borrowers[uaddress].age = _age;
        borrowers[uaddress].residential_address = _address;
        borrowers[uaddress].mobile_no = _mobile;
        borrowers[uaddress].aadhar_no = _aadhar;
        borrowers[uaddress].college_name = _clg;

        borrowers[uaddress].loanStatus = 0;
        borrowers[uaddress].loanLimit = 500;
        borrowers[uaddress].amountToPay = 0;
        borrowers[uaddress].borrowersAddress = uaddress;

        emit BorrowerRegistered (_name, _age, _address, _mobile, _aadhar, _clg, msg.sender);

        borrower_accounts[uaddress] = true;
        mapBorrowers[borrowers_count] = uaddress;
        borrowers_count ++;
    }

    //This function returns the stored information through address
    function Get_Borrower () view public returns (string memory, uint, string memory, string memory, string memory, string memory) {
        address uaddress = msg.sender;
        Borrower_Info memory borrower = borrowers[uaddress];

        return (borrower.name, borrower.age, borrower.residential_address, borrower.mobile_no, borrower.aadhar_no, borrower.college_name);
    }

    function Login_Borrower() view public returns (bool, string memory) {

        address uaddress = msg.sender;
        return (borrower_accounts[uaddress], borrowers[uaddress].name);
    }

    function Get_Loan_Limit () view public returns (uint) {
        address uaddress = msg.sender;

        return borrowers[uaddress].loanLimit;
    }

    function Loan_Request ( uint amount) public {
        address uaddress = msg.sender;

        require(borrowers[uaddress].loanStatus == 0, "You cannot request new loan before returning the previous loan amount");

        borrowers[uaddress].loanStatus = 1;
        borrowers[uaddress].amountToPay = amount;
    }

    function Loan_Granted (string memory _date, address receiver) public {
        address uaddress = address(receiver);

        require (borrowers[uaddress].loanStatus == 1, "Loan has already been granted");

        borrowers[uaddress].loanStatus = 2;
        borrowers[uaddress].timeOfLoan = _date;
    }
}
