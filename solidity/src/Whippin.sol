// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./MWhippin.sol";

contract Whippin is MWhippin {
    event ArtistRegistered(address indexed artist, string mainName, uint32 registeredAt);

    struct WhippinDetails {
        address owner;
        string uriVideo;
    }

    struct WhippinMusic {
        uint256 idWhippin;
        Artist artist;
        string uri;
        // WhippinDetails[] WhippinDetails;
        Totalsupplies totalSupplies;
        uint256 price;
    }

    struct DescriptionPreimage {
        bool has_preimage;
        bytes32 preimage;
    }

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

    struct Artist {
        bool is_artist;
        ArtistData data;
    }

    struct Totalsupplies {
        uint256 totalSupply;
        uint256 totalSold;
    }

    mapping(address => Artist) public addressToArtist;

    function registerArtists(
        bool _isArtist,
        string memory _mainName,
        ArtistType _mainType
    ) external {
        setAddressToArtist(
            Artist({
                is_artist: _isArtist,
                data: ArtistData({
                    owner: msg.sender,
                    registered_at: uint32(block.timestamp),
                    main_name: _mainName,
                    main_type: _mainType,
                    NFTFactory: ADD_0
                })
            })
        );
        emit ArtistRegistered(msg.sender, _mainName, addressToArtist[msg.sender].data.registered_at);
    }

    function setAddressToArtist(Artist memory _artist) private {
        addressToArtist[msg.sender] = _artist;
    }

	function setFactoryAddress(address _factoryAddress) external onlyNot0address(_factoryAddress) {
		addressToArtist[msg.sender].data.NFTFactory = _factoryAddress;
	}
}
