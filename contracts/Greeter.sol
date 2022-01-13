//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// Ignore this error, you can still able to compile with hardhat
// npx hardhat compile
import "hardhat/console.sol";

// ABI stands for  - Application Binary Interface

contract Greeter {
    string private greeting;

    // when we deploy this contract, we have to pass string value  to this function.
    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    // public view - this function can be read outside of the contract
    // we are not modifing any states, we are just reading from the blockchain
    function greet() public view returns (string memory) {
        return greeting;
    }

    // This might need some Gas to execute this function and this transaction can be written
    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
