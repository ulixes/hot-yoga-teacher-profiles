// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Prover} from "vlayer-0.1.0/Prover.sol";
import {Web, WebProof, WebProofLib, WebLib} from "vlayer-0.1.0/WebProof.sol";

contract WebProofProver is Prover {
    using WebProofLib for WebProof;
    using WebLib for Web;

    // Instagram GraphQL endpoint pattern for user profile verification
    string public constant DATA_URL = "https://www.instagram.com/graphql/query*";

    function main(WebProof calldata webProof, address account)
        public
        view
        returns (Proof memory, string memory, address)
    {
        Web memory web = webProof.verify(DATA_URL);

        // Extract username from Instagram GraphQL response
        // Instagram GraphQL returns data in format: {"data":{"user":{"username":"handle"}}}
        // For GraphQL queries, the response structure may vary, but typically contains user data
        string memory username = web.jsonGetString("data.user.username");

        return (proof(), username, account);
    }
}
