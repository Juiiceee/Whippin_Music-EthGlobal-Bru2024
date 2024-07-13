// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MWhippin {
	error WhippinEmptyValue(string);
	error WhippinSameAmount(uint256);
	error WhippinNo0Address(address);

	address public constant ADD_0 = 0x0000000000000000000000000000000000000000;

	modifier onlyNot0address(address _add) {
		_requireNot0Address(_add);
		_;
	}

	function _requireNot0Address(address _add) internal pure {
		if (_add == ADD_0) revert WhippinNo0Address(_add);
	}

	modifier onlyEmptyValue(string memory _str) {
		_requireEmptyValue(_str);
		_;
	}

	function _requireEmptyValue(string memory _str) internal pure {
		if (keccak256(abi.encodePacked(_str)) != keccak256(abi.encodePacked(""))) {
			revert WhippinEmptyValue(_str);
		}
	}

	modifier onlySameAmount(uint _price) {
		_requireSameAmount(_price);
		_;
	}

	function _requireSameAmount(uint _price) internal view {
		if (msg.value != _price) revert WhippinSameAmount(_price);
	}
}
