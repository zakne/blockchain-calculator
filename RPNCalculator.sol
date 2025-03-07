// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import {Strings} from "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol";

contract RPNCalculator {
    bytes32 private constant ADD_OP = keccak256(abi.encodePacked("+"));
    bytes32 private constant SUB_OP = keccak256(abi.encodePacked("-"));
    bytes32 private constant MUL_OP = keccak256(abi.encodePacked("*"));
    bytes32 private constant DIV_OP = keccak256(abi.encodePacked("/"));
    bytes32 private constant XOR_OP = keccak256(abi.encodePacked("^"));

    function evaluate(string[] calldata tokens) public pure  returns (int256) {
        require(tokens.length != 0, "Input length must be greater than 0.");
        int256[] memory stack = new int256[]((tokens.length + 1)/2);
        uint256 stackPointer = 0;

        for (uint256 i = 0; i < tokens.length; i++) {
            (bool isNum, int256 value) = isNumber(tokens[i]);
            if (isNum) {
                stack[stackPointer++] = value;
            } else if (isOperator(tokens[i])) {
                require(
                    stackPointer >= 2,
                    "Insufficient operands for operation"
                );

                int256 b = stack[--stackPointer];
                int256 a = stack[--stackPointer];
                stack[stackPointer++] = applyOperator(a, b, tokens[i]);
            } else {
                revert("Unknown token");
            }
        }

        require(
            stackPointer == 1,
            "Invalid expression, more than one value left in the stack"
        );

        return stack[0];
    }

    function applyOperator(
        int256 a,
        int256 b,
        string calldata op
    ) internal pure returns (int256) {
        bytes32 opHash = keccak256(abi.encodePacked(op));

        if (opHash == DIV_OP) {
            require(b != 0, "Division by zero is not allowed");
            return a / b;
        } else if (opHash == MUL_OP) {
            return a * b;
        } else if (opHash == ADD_OP) {
            return a + b;
        } else if (opHash == SUB_OP) {
            return a - b;
        } else if (opHash == XOR_OP) {
            return a ^ b;
        } else {
            revert(
                "Invalid operator: Supported operators are +, -, *, /, and ^"
            );
        }
    }

    function isNumber(string calldata m) internal pure returns (bool, int256) {
        bytes32 isOp = keccak256(abi.encodePacked(m));
        if (isOp == ADD_OP || isOp == SUB_OP) {
            return (false, 0);
        } else {
            return Strings.tryParseInt(m);
        }
    }

    function isOperator(string calldata m) internal pure returns (bool) {
        bytes32 opHash = keccak256(abi.encodePacked(m));
        return (opHash == ADD_OP ||
            opHash == SUB_OP ||
            opHash == MUL_OP ||
            opHash == DIV_OP ||
            opHash == XOR_OP);
    }
}
