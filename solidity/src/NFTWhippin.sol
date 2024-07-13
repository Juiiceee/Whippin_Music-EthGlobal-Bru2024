// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MWhippin.sol";

contract NFTWhippin is ERC721, Ownable, MWhippin, ERC721URIStorage {
	uint idNFTWhippin;
	uint public price;
	string URIToken;
	mapping(uint => string) idToURL;

	modifier onlyOwnerNFT(uint _idNFT, address _msgSender) {
		require(_msgSender == ownerOf(_idNFT), "You aren't the owner of this NFT");
		_;
	}

	modifier onlyNotAlreadyLink(uint _idNFT) {
		require(
			keccak256(abi.encodePacked(idToURL[_idNFT])) == keccak256(abi.encodePacked("")),
			"This NFT is already link"
		);
		_;
	}

	constructor(
		string memory _name,
		string memory _symbol,
		uint _price,
		string memory _URIToken
	) ERC721(_name, _symbol) Ownable(msg.sender) {
		price = _price;
		URIToken = _URIToken;
	}

	function mintPayable(address _add) external payable onlySameAmount(price) {
		_safeMint(_add, idNFTWhippin++);
		_setTokenURI(idNFTWhippin, URIToken);
	}

	function linkVideo(
		uint _idNFT,
		string memory _url,
		address _msgSender
	) external onlyEmptyValue(idToURL[_idNFT]) onlyOwnerNFT(_idNFT, _msgSender) {
		idToURL[_idNFT] = _url;
	}

	function withdraw() external onlyOwner {
		payable(msg.sender).transfer(address(this).balance);
	}

	function supportsInterface(
		bytes4 interfaceId
	) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
		return super.supportsInterface(interfaceId);
	}

	function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {}

	function getIdToURL(uint _idNFT) external view returns (string memory) {
		return idToURL[_idNFT];
	}

	function getPrice() external view returns (uint) {
		return price;
	}

	function getOwner(uint _idNFT) external view returns (address) {
		return (_ownerOf(_idNFT));
	}

	function getURIToken() external view returns (string memory) {
		return URIToken;
	}
}
