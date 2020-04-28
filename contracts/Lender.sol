/*
    Handcrafted by: Shubham Gupta

    About: This contract registers the lender and shows the registered information on user's profile page.
*/

pragma solidity >=0.4.17 <0.7.0;
pragma experimental ABIEncoderV2;

contract Lender {

    struct Lender_Info {

        string name;
        uint age;
        string residentialAddress;
        string mobileNo;
        string aadharNo;

        uint numberOfLoans;
        uint activeLoans;
        address[] receiver;
    }   

    event LenderRegistered(string _name, uint _age, string _address, string _mobile, string _aadhar, address sender);


    mapping (address => Lender_Info) public lenders;
    mapping (address => bool) lender_accounts; 

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
    function Get_Borrower_Address () view public returns (address[] memory receiver) {
        address uaddress = msg.sender;

        return (lenders[uaddress].receiver);
    }

    
    function Login_Lender() view public returns (bool, string memory) {

        address uaddress = msg.sender;
        return (lender_accounts[uaddress], lenders[uaddress].name);
    }

    function Grant_Loan(address _receiver) public {
        address uaddress = msg.sender;
        address raddress = address(_receiver);
        uint numberOfLoans = lenders[uaddress].numberOfLoans;
        uint activeLoans = lenders[uaddress].activeLoans;

        lenders[uaddress].receiver.push(raddress);
        lenders[uaddress].numberOfLoans = numberOfLoans+1;  
        lenders[uaddress].activeLoans = activeLoans+1;  
    }
}
