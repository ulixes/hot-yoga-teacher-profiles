// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {WebProofProver} from "./WebProofProver.sol";
import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Verifier} from "vlayer-0.1.0/Verifier.sol";

contract ProfileRegistry is Verifier {
    address public prover;

    struct TeacherProfile {
        address walletAddress;      // Privy-generated wallet; serves as primary key
        bytes instagramProof;       // vlayer Web Proof (zkTLS attestation) for Instagram ownership
        string instagramHandle;     // Instagram username
        string bio;                 // Teacher's biography (e.g., "10+ years in hot vinyasa yoga")
        string specialization;      // Comma-separated specialties (e.g., "Hot Yoga, Bikram, Therapy")
        bool activeStatus;          // True if available for bookings, false if on break
        uint256 createdAt;          // Timestamp of profile creation (block.timestamp)
        uint256 lastUpdatedAt;      // Timestamp of last update
        uint256[] bookingIds;       // Array of associated booking IDs (for 1-to-many relationship with bookings)
    }

    // Storage mappings for O(1) access
    mapping(address => TeacherProfile) public profiles;
    mapping(string => address) public handleToAddress;
    
    // Array for enumeration
    address[] public teacherAddresses;
    
    // Events
    event TeacherRegistered(address indexed teacher, string instagramHandle);
    event ProfileUpdated(address indexed teacher, string bio, string specialization);
    event ProfileStatusChanged(address indexed teacher, bool activeStatus);

    constructor(address _prover) {
        prover = _prover;
    }

    function registerTeacher(
        Proof calldata proof, 
        string memory instagramHandle, 
        address account
    ) public onlyVerified(prover, WebProofProver.main.selector) {
        require(bytes(instagramHandle).length > 0, "Invalid Instagram handle");
        require(handleToAddress[instagramHandle] == address(0), "Instagram handle already registered");
        require(profiles[account].walletAddress == address(0), "Address already has a teacher profile");

        // Store the proof data
        bytes memory proofData = abi.encode(proof);
        
        // Create teacher profile
        profiles[account] = TeacherProfile({
            walletAddress: account,
            instagramProof: proofData,
            instagramHandle: instagramHandle,
            bio: "",
            specialization: "",
            activeStatus: true,
            createdAt: block.timestamp,
            lastUpdatedAt: block.timestamp,
            bookingIds: new uint256[](0)
        });

        handleToAddress[instagramHandle] = account;
        teacherAddresses.push(account);

        emit TeacherRegistered(account, instagramHandle);
    }

    function updateProfile(string memory bio, string memory specialization) public {
        require(profiles[msg.sender].walletAddress != address(0), "No teacher profile found");
        
        TeacherProfile storage profile = profiles[msg.sender];
        profile.bio = bio;
        profile.specialization = specialization;
        profile.lastUpdatedAt = block.timestamp;

        emit ProfileUpdated(msg.sender, bio, specialization);
    }

    function setActiveStatus(bool isActive) public {
        require(profiles[msg.sender].walletAddress != address(0), "No teacher profile found");
        
        profiles[msg.sender].activeStatus = isActive;
        profiles[msg.sender].lastUpdatedAt = block.timestamp;

        emit ProfileStatusChanged(msg.sender, isActive);
    }

    function getTeacherProfile(address teacher) public view returns (TeacherProfile memory) {
        require(profiles[teacher].walletAddress != address(0), "No teacher profile found");
        return profiles[teacher];
    }

    function getTeacherByHandle(string memory handle) public view returns (TeacherProfile memory) {
        address teacherAddress = handleToAddress[handle];
        require(teacherAddress != address(0), "Instagram handle not found");
        return profiles[teacherAddress];
    }

    function getAllTeachers() public view returns (address[] memory) {
        return teacherAddresses;
    }

    function getActiveTeachers() public view returns (address[] memory) {
        uint256 activeCount = 0;
        
        // Count active teachers
        for (uint256 i = 0; i < teacherAddresses.length; i++) {
            if (profiles[teacherAddresses[i]].activeStatus) {
                activeCount++;
            }
        }
        
        // Create array of active teachers
        address[] memory activeTeachers = new address[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < teacherAddresses.length; i++) {
            if (profiles[teacherAddresses[i]].activeStatus) {
                activeTeachers[currentIndex] = teacherAddresses[i];
                currentIndex++;
            }
        }
        
        return activeTeachers;
    }

    function getTotalTeachers() public view returns (uint256) {
        return teacherAddresses.length;
    }

    function isTeacherRegistered(address teacher) public view returns (bool) {
        return profiles[teacher].walletAddress != address(0);
    }

    function isHandleRegistered(string memory handle) public view returns (bool) {
        return handleToAddress[handle] != address(0);
    }
}