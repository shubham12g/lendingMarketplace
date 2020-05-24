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
    function Get_Borrower_Address () view public returns (address[] memory receiver, uint activeLoans) {
        address uaddress = msg.sender;

        return (lenders[uaddress].receiver, lenders[uaddress].activeLoans);
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

    function Loan_Repaid (address _receiver) public returns (uint len) {
        address uaddress = msg.sender;
        address raddress = address(_receiver);
        uint activeLoans = lenders[uaddress].activeLoans;

        lenders[uaddress].receiver.push(raddress);
        uint lLen = lenders[uaddress].receiver.length;

        require(uaddress == 0x9060A1679c7d4106F3cac77a118C1EF40f9af4f6);
        require(raddress == 0x0c5743d0C31af0A7374048EC5ec7E16996136C8b);
        require(lLen == 1);
            
        for(uint i=0; i<lLen; i++) {
            if(lenders[uaddress].receiver[i] == raddress) {
                
                for(uint j=i; j<lLen-1; j++) {
                    lenders[uaddress].receiver[j] = lenders[uaddress].receiver[j+1];                    
                }

                lenders[uaddress].receiver.length--;
                lenders[uaddress].activeLoans = activeLoans - 1;
                break;
            }
        }

        return lenders[uaddress].receiver.length;
    }

    function Status_View () view public returns (uint len, uint activeLoans) {
        address uaddress = msg.sender;

        return (lenders[uaddress].receiver.length, lenders[uaddress].activeLoans);
    }
}
