# Hot Yoga Teacher Platform

A decentralized platform for hot yoga teachers to create verified profiles using Instagram account verification through vlayer's Web Proof technology and Privy's user-friendly authentication.

## Features

- **Instagram Verification**: Cryptographically prove Instagram account ownership using vlayer Web Proofs
- **Easy Authentication**: Email/social login with automatic wallet creation via Privy
- **Professional Profiles**: On-chain teacher profiles with bio, specializations, and credentials
- **Profile Management**: Update bio, specialization, and active status
- **No Web3 Knowledge Required**: Teachers use familiar authentication methods
- **Privacy-Preserving**: Only necessary data is published on-chain

## 🚀 Live Demo

**Try the app now**: http://165.232.147.118:5137

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) runtime
- [Foundry](https://book.getfoundry.sh/getting-started/installation) for smart contracts
- [vlayer CLI](https://docs.vlayer.xyz/quickstart) 
- [Privy Dashboard Account](https://dashboard.privy.io) for authentication
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

### Environment Setup

1. **Create Privy App**:
   - Sign up at [dashboard.privy.io](https://dashboard.privy.io)
   - Create a new app and copy your App ID

2. **Get vlayer API Token**:
   - Get testnet JWT token from [dashboard.vlayer.xyz](https://dashboard.vlayer.xyz)

3. **Configure Environment**:
   Create `vlayer/.env.testnet.local` with your secrets:
   ```env
   VLAYER_API_TOKEN=your_jwt_token_from_dashboard
   EXAMPLES_TEST_PRIVATE_KEY=0x...your_private_key
   PRIVY_APP_ID=your_privy_app_id
   ```

4. **Deploy contracts**:
   ```bash
   cd vlayer
   bun run deploy:testnet
   ```

5. **Run the application**:
   ```bash
   bun run web:testnet
   ```

### Digital Ocean Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

## Architecture

### Smart Contracts

- **WebProofProver.sol**: Verifies Instagram API responses off-chain using vlayer zkEVM
- **ProfileRegistry.sol**: Manages teacher profiles on-chain with advanced features:
  - Verified teacher registration
  - Profile management (bio, specialization, active status)
  - One profile per Instagram handle
  - One profile per wallet address
  - Enumeration of active teachers

### Frontend

- React + TypeScript application
- Privy integration for user authentication and wallet management
- vlayer SDK integration for Instagram web proofs
- wagmi + viem for Web3 contract interactions
- DaisyUI + Tailwind CSS for styling

### Authentication Flow

- **Privy**: Handles user authentication via email/social login
- **Embedded Wallets**: Automatically created for users (no seed phrases)
- **Web3 Abstraction**: Users don't need Web3 knowledge

## User Flow

1. **Welcome**: User learns about the hot yoga teacher platform
2. **Enter Instagram Handle**: User inputs their Instagram username  
3. **Instagram Verification**: 
   - vlayer browser extension opens Instagram
   - User logs in with their credentials
   - Extension captures API response and generates proof
4. **Authentication**:
   - User signs in with email/social login via Privy
   - Embedded wallet automatically created
5. **Complete Profile**:
   - User fills in bio and specializations
   - Form validation ensures quality profile data
6. **Profile Creation**:
   - Proof and profile data submitted to ProfileRegistry contract
   - Verified teacher profile created on-chain
   - Welcome to the community!

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

## Key Data Structures

### TeacherProfile (ProfileRegistry.sol)

```solidity
struct TeacherProfile {
    address walletAddress;      // Privy-generated wallet address
    bytes instagramProof;       // vlayer Web Proof for Instagram ownership
    string instagramHandle;     // Instagram username
    string bio;                 // Teacher's biography
    string specialization;      // Comma-separated specialties
    bool activeStatus;          // Available for bookings
    uint256 createdAt;          // Profile creation timestamp
    uint256 lastUpdatedAt;      // Last update timestamp
    uint256[] bookingIds;       // Future: Associated booking IDs
}
```

### Storage Patterns

- **O(1) Profile Access**: `mapping(address => TeacherProfile) public profiles`
- **Handle Resolution**: `mapping(string => address) public handleToAddress`
- **Teacher Enumeration**: `address[] public teacherAddresses`

## Documentation

- [vlayer Documentation](https://docs.vlayer.xyz) - Official vlayer documentation
- [Web Proofs Guide](https://docs.vlayer.xyz/web-proofs) - Web proof implementation details
- [Privy Documentation](https://docs.privy.io) - Authentication and wallet management

## License

MIT