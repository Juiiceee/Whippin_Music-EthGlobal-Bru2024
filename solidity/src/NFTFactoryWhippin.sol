// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./NFTWhippin.sol";
import "./Whippin.sol";
import "./MWhippin.sol";

contract NFTFactoryWhippin is MWhippin {
    NFTWhippin[] public NFTContract;

    function createNFTContract(string memory _name, string memory _symbol, uint256 _price, string memory _URIToken)
        external
        returns (address)
    {
        NFTWhippin nftWhippin = new NFTWhippin(_name, _symbol, _price, _URIToken);
        NFTContract.push(nftWhippin);
        return address(nftWhippin);
    }

    function mintPayable(NFTWhippin _NFTWhippin) external payable {
        _NFTWhippin.mintPayable{value: msg.value}(msg.sender);
    }

    function linkVideo(NFTWhippin _NFTWhippin, uint256 _idNFT, string memory _url)
        external
        onlyEmptyValue(_NFTWhippin.getURL(_idNFT))
    {
        _NFTWhippin.linkVideo(_idNFT, _url, msg.sender);
    }

    function withdraw(NFTWhippin _NFTWhippin) external {
        _NFTWhippin.withdraw(msg.sender);
    }

    function getAll(NFTWhippin _NFTWhippin, uint256 _idNFT)
        external
        view
        returns (uint256, string memory, string memory)
    {
        return (_NFTWhippin.getPrice(), _NFTWhippin.getURIToken(), _NFTWhippin.getIdToURL(_idNFT));
    }

    function getOwner(NFTWhippin _NFTWhippin, uint256 _idNFT) external view returns (address) {
        return (_NFTWhippin.getOwner(_idNFT));
    }

    function getBalance(NFTWhippin _NFTWhippin) external view returns (uint256) {
        return (address(_NFTWhippin).balance);
    }

	function setAddNFTFactory(address _addWhippin) external {
		Whippin(_addWhippin).setAddressFactory(msg.sender, address(this));
	}
}
