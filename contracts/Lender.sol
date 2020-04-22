/*
    Handcrafted by: Shubham Gupta

    About: This contract registers the lender and shows the registered information on user's profile page.
*/

pragma solidity >=0.4.17 <0.7.0;
pragma experimental ABIEncoderV2;

contract Lender {

    struct Borrower_Info {
        address[50] receiver;
        uint[50] amount;
        string[50] dateOfLending;
    }

    struct Lender_Info {

        string name;
        uint age;
        string residentialAddress;
        string mobileNo;
        string aadharNo;

        uint numberOfLoans;
        uint activeLoans;
    }   

    event LenderRegistered(string _name, uint _age, string _address, string _mobile, string _aadhar, address sender);


    mapping (address => Lender_Info) public lenders;
    mapping (address => bool) lender_accounts; 
    mapping (address => Borrower_Info) borrowers;

    //This function is used to save the information entered by the borrower during registraton.
    function Set_Lender (string memory _name, uint _age, string memory _address, string memory _mobile, string memory _aadhar) public {

        address uaddress = msg.sender;
        
        require(lender_accounts[uaddress] == false, "You have already registered on our platform");

        lenders[uaddress].name = _name;
        lenders[uaddress].age = _age;
        lenders[uaddress].residentialAddress = _address;
        lenders[uaddress].mobileNo = _mobile;
        lenders[uaddress].aadharNo = _aadhar;

        lenders[uaddress].numberOfLoans = 0;
        lenders[uaddress].activeLoans = 0;

        emit LenderRegistered (_name, _age, _address, _mobile, _aadhar, msg.sender);

        lender_accounts[uaddress] = true;
    }

    //This function returns the stored information through address
    function Get_Borrower_Info () view public returns (address[50] memory receiver, uint[50] memory amount, string[50] memory dateOfLending) {
        address uaddress = msg.sender;
        Borrower_Info memory borrower = borrowers[uaddress];

        return (borrower.receiver, borrower.amount, borrower.dateOfLending);
    }

    
    function Login_Lender() view public returns (bool, string memory) {

        address uaddress = msg.sender;
        return (lender_accounts[uaddress], lenders[uaddress].name);
    }

    function Grant_Loan(address _receiver, uint _amount, string memory _date) public {
        address uaddress = msg.sender;
        uint numberOfLoans = lenders[uaddress].numberOfLoans;
        uint activeLoans = lenders[uaddress].activeLoans;
        Borrower_Info memory borrower = borrowers[uaddress];

        borrower.receiver[numberOfLoans] = address(_receiver);
        borrower.amount[numberOfLoans] = _amount;
        borrower.dateOfLending[numberOfLoans] = _date;

        lenders[uaddress].numberOfLoans = numberOfLoans+1;  
        lenders[uaddress].activeLoans = activeLoans+1;  
    }
}
