// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./MWhippin.sol";
import "./NFTFactoryWhippin.sol";

contract Whippin is MWhippin {
    event ArtistRegistered(address indexed artist, string mainName, uint32 registeredAt);

    enum ArtistType {
        Singer,
        Instrumentalist,
        Composer,
        Lyricist,
        Producer,
        DiscJokey,
        Conductor,
        Arranger,
        Engineer,
        Director
    }

    struct ArtistData {
        address owner;
        uint32 registered_at;
        string main_name;
        ArtistType main_type;
        address NFTFactory;
    }

    mapping(address => ArtistData) public addressToArtistData;

    function registerArtists(string memory _mainName, ArtistType _mainType) external {
        NFTFactoryWhippin nftFactory = new NFTFactoryWhippin();
		setAddressToArtist(
            ArtistData({
                owner: msg.sender,
                registered_at: uint32(block.timestamp),
                main_name: _mainName,
                main_type: _mainType,
                NFTFactory: address(nftFactory)
            })
        );
        emit ArtistRegistered(msg.sender, _mainName, addressToArtistData[msg.sender].registered_at);
    }

    function setAddressToArtist(ArtistData memory _ArtistData) private {
        addressToArtistData[msg.sender] = _ArtistData;
    }
}
