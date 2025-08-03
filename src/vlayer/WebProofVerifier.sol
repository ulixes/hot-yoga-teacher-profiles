// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {WebProofProver} from "./WebProofProver.sol";

import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Verifier} from "vlayer-0.1.0/Verifier.sol";

import {ERC721} from "@openzeppelin-contracts-5.0.1/token/ERC721/ERC721.sol";

contract WebProofVerifier is Verifier, ERC721 {
    address public prover;

    struct TeacherProfile {
        string instagramHandle;
        string bio;
        string specialization;
        uint256 verifiedAt;
        bool isActive;
    }

    mapping(uint256 => TeacherProfile) public teacherProfiles;
    mapping(string => uint256) public handleToTokenId;
    mapping(address => uint256) public addressToTokenId;

    event TeacherVerified(address indexed teacher, string instagramHandle, uint256 tokenId);
    event ProfileUpdated(uint256 indexed tokenId, string bio, string specialization);

    constructor(address _prover) ERC721("HotYogaTeacher", "HYT") {
        prover = _prover;
    }

    function verify(Proof calldata, string memory instagramHandle, address account)
        public
        onlyVerified(prover, WebProofProver.main.selector)
    {
        require(bytes(instagramHandle).length > 0, "Invalid Instagram handle");
        require(handleToTokenId[instagramHandle] == 0, "Instagram handle already verified");
        require(addressToTokenId[account] == 0, "Address already has a teacher profile");

        uint256 tokenId = uint256(keccak256(abi.encodePacked(instagramHandle, account)));
        
        _safeMint(account, tokenId);
        
        teacherProfiles[tokenId] = TeacherProfile({
            instagramHandle: instagramHandle,
            bio: "",
            specialization: "",
            verifiedAt: block.timestamp,
            isActive: true
        });

        handleToTokenId[instagramHandle] = tokenId;
        addressToTokenId[account] = tokenId;

        emit TeacherVerified(account, instagramHandle, tokenId);
    }

    function updateProfile(string memory bio, string memory specialization) public {
        uint256 tokenId = addressToTokenId[msg.sender];
        require(tokenId != 0, "No teacher profile found");
        require(_ownerOf(tokenId) == msg.sender, "Not the profile owner");

        TeacherProfile storage profile = teacherProfiles[tokenId];
        profile.bio = bio;
        profile.specialization = specialization;

        emit ProfileUpdated(tokenId, bio, specialization);
    }

    function deactivateProfile() public {
        uint256 tokenId = addressToTokenId[msg.sender];
        require(tokenId != 0, "No teacher profile found");
        require(_ownerOf(tokenId) == msg.sender, "Not the profile owner");

        teacherProfiles[tokenId].isActive = false;
    }

    function reactivateProfile() public {
        uint256 tokenId = addressToTokenId[msg.sender];
        require(tokenId != 0, "No teacher profile found");
        require(_ownerOf(tokenId) == msg.sender, "Not the profile owner");

        teacherProfiles[tokenId].isActive = true;
    }

    function getTeacherProfile(address teacher) public view returns (TeacherProfile memory) {
        uint256 tokenId = addressToTokenId[teacher];
        require(tokenId != 0, "No teacher profile found");
        return teacherProfiles[tokenId];
    }

    function getTeacherByHandle(string memory handle) public view returns (TeacherProfile memory) {
        uint256 tokenId = handleToTokenId[handle];
        require(tokenId != 0, "Instagram handle not found");
        return teacherProfiles[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        TeacherProfile memory profile = teacherProfiles[tokenId];
        return string.concat(
            "https://hotyoga.app/api/teacher/",
            profile.instagramHandle,
            "/metadata"
        );
    }

    // Prevent transfers to maintain 1:1 mapping between teacher and profile
    function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Allow minting but prevent transfers
        if (from != address(0) && to != address(0)) {
            revert("Teacher profiles are non-transferable");
        }
        
        return super._update(to, tokenId, auth);
    }
}
