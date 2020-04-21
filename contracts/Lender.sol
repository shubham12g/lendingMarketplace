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
        string[50] date_of_lending;
    }

    struct Lender_Info {

        string name;
        uint age;
        string residential_address;
        string mobile_no;
        string aadhar_no;

        uint number_of_loans;
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
        lenders[uaddress].residential_address = _address;
        lenders[uaddress].mobile_no = _mobile;
        lenders[uaddress].aadhar_no = _aadhar;

        lenders[uaddress].number_of_loans = 0;

        emit LenderRegistered (_name, _age, _address, _mobile, _aadhar, msg.sender);

        lender_accounts[uaddress] = true;
    }

    //This function returns the stored information through address
    function Get_Borrower_Info () view public returns (address[50] memory receiver, uint[50] memory amount, string[50] memory date_of_lending) {
        address uaddress = msg.sender;
        Borrower_Info memory borrower = borrowers[uaddress];

        return (borrower.receiver, borrower.amount, borrower.date_of_lending);
    }

    
    function Login_Lender() view public returns (bool, string memory) {

        address uaddress = msg.sender;
        return (lender_accounts[uaddress], lenders[uaddress].name);
    }

    function Grant_Loan(address _receiver, uint _amount, string memory _date) public {
        address uaddress = msg.sender;
        uint number_of_loans = lenders[uaddress].number_of_loans;
        Borrower_Info memory borrower = borrowers[uaddress];

        borrower.receiver[number_of_loans] = address(_receiver);
        borrower.amount[number_of_loans] = _amount;
        borrower.date_of_lending[number_of_loans] = _date;

        lenders[uaddress].number_of_loans = number_of_loans+1;    
    }
}
