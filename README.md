# Hot Yoga Teacher Profile dApp

A decentralized application for hot yoga teachers to create verified on-chain profiles using Instagram account verification through vlayer's Web Proof technology.

## Features

- **Instagram Verification**: Prove ownership of Instagram accounts using vlayer Web Proofs
- **Teacher Profiles**: Non-transferable NFTs representing teacher identities  
- **Profile Management**: Update bio, specialization, and active status
- **Web3 Integration**: Seamless wallet connection and on-chain interactions
- **Privacy-Preserving**: Only necessary data is published on-chain

## 🚀 Live Demo

**Try the app now**: http://165.232.147.118:5137

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) runtime
- [Foundry](https://book.getfoundry.sh/getting-started/installation) for smart contracts
- [vlayer CLI](https://docs.vlayer.xyz/quickstart) 
- Web3 wallet (MetaMask, etc.)
- vlayer browser extension (for web proofs)

### Installation

1. Build contracts:
   ```bash
   forge build
   ```

2. Install frontend dependencies:
   ```bash
   cd vlayer && bun install
   ```

### Testnet Setup

1. Create `vlayer/.env.testnet.local` with your secrets:
   ```env
   VLAYER_API_TOKEN=your_jwt_token_from_dashboard
   EXAMPLES_TEST_PRIVATE_KEY=0x...your_private_key
   ```

2. Get testnet JWT token from [dashboard.vlayer.xyz](https://dashboard.vlayer.xyz)

3. Deploy contracts:
   ```bash
   cd vlayer
   bun run deploy:testnet
   ```

4. Run the application:
   ```bash
   bun run web:testnet
   ```

### Digital Ocean Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

## Architecture

### Smart Contracts

- **WebProofProver.sol**: Verifies Instagram API responses off-chain using vlayer zkEVM
- **WebProofVerifier.sol**: Manages teacher profile NFTs on-chain with advanced features:
  - Non-transferable (soulbound) NFTs
  - Profile management (bio, specialization)
  - Active/inactive status
  - One profile per Instagram handle
  - One profile per wallet address

### Frontend

- React + TypeScript application
- vlayer SDK integration for web proofs
- wagmi + viem for Web3 interactions
- Instagram account verification flow

## User Flow

1. **Connect Wallet**: User connects their Web3 wallet
2. **Enter Instagram Handle**: User inputs their Instagram username  
3. **Browser Extension**: 
   - Opens Instagram login page
   - User logs in with credentials
   - Extension captures API response
4. **Proof Generation**:
   - Web proof sent to vlayer prover
   - Off-chain verification in zkEVM
   - Cryptographic proof generated
5. **On-chain Verification**:
   - Proof submitted to verifier contract
   - Teacher profile NFT minted
   - Profile linked to wallet address

## Development

### Foundry Commands

```bash
# Build contracts
forge build

# Run tests  
forge test

# Format code
forge fmt
```

### Frontend Development

```bash
cd vlayer

# Development server
bun run web:dev

# Run tests
bun run test:unit

# Lint code
bun run lint:solidity
```

## Documentation

- [vlayer Documentation](https://docs.vlayer.xyz) - Official vlayer documentation
- [Web Proofs Guide](https://docs.vlayer.xyz/web-proofs) - Web proof implementation details

## License

MIT