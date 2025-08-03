# Privy Authentication Setup Guide

## 🔑 Where to Set Privy Keys

### 1. Get Your Privy App ID

1. **Sign up for Privy**:
   - Visit [dashboard.privy.io](https://dashboard.privy.io)
   - Create a free account (no credit card required)

2. **Create Your App**:
   - Click "Create App"
   - App Name: "Hot Yoga Teacher Platform"
   - App Type: "Consumer"

3. **Configure Authentication Methods**:
   - **Login Methods**: Enable Email, Google, Discord
   - **Embedded Wallets**: Enable "Create on login" for users without wallets
   - **Logo**: Upload your yoga studio logo (optional)

4. **Copy Your App ID**:
   - In the dashboard, you'll see your App ID
   - Copy this value (looks like: `clp1q2r3s4t5u6v7w8x9y0z1`)

### 2. Configure Environment Variables

#### For Local Development:
Create `vlayer/.env.testnet.local`:
```env
# vlayer Configuration
VLAYER_API_TOKEN=your_jwt_token_from_vlayer_dashboard
EXAMPLES_TEST_PRIVATE_KEY=0x...your_private_key

# Privy Configuration
PRIVY_APP_ID=clp1q2r3s4t5u6v7w8x9y0z1
```

#### For Production Deployment:
Create `vlayer/.env.mainnet.local`:
```env
# vlayer Configuration
VLAYER_API_TOKEN=your_production_jwt_token
EXAMPLES_TEST_PRIVATE_KEY=0x...your_production_private_key

# Privy Configuration  
PRIVY_APP_ID=your_production_privy_app_id
```

### 3. Domain Configuration (Production)

In your Privy dashboard:

1. **Allowed Origins**:
   - Add your domain: `https://yourdomain.com`
   - For development: `http://localhost:5173`

2. **Redirect URIs**:
   - Add: `https://yourdomain.com`
   - For development: `http://localhost:5173`

## 🚀 Quick Start Checklist

- [ ] Create Privy account at [dashboard.privy.io](https://dashboard.privy.io)
- [ ] Create new app and copy App ID
- [ ] Get vlayer API token from [dashboard.vlayer.xyz](https://dashboard.vlayer.xyz)
- [ ] Create `.env.testnet.local` file with both tokens
- [ ] Run `bun run deploy:testnet` to deploy contracts
- [ ] Run `bun run web:testnet` to start the app
- [ ] Install vlayer browser extension
- [ ] Test the complete flow!

## 🔧 Environment Variables Reference

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `PRIVY_APP_ID` | Privy application identifier | [dashboard.privy.io](https://dashboard.privy.io) |
| `VLAYER_API_TOKEN` | vlayer JWT token | [dashboard.vlayer.xyz](https://dashboard.vlayer.xyz) |
| `EXAMPLES_TEST_PRIVATE_KEY` | Ethereum private key for deployment | Your wallet |

## 🆘 Troubleshooting

### Authentication Issues
- **Error**: "App ID not found"
  - **Solution**: Double-check your `PRIVY_APP_ID` in the environment file

- **Error**: "Origin not allowed"
  - **Solution**: Add your domain to Privy dashboard's allowed origins

### Wallet Creation Issues
- **Error**: "Embedded wallet creation failed"
  - **Solution**: Ensure "Create on login" is enabled in Privy settings

### Contract Deployment Issues
- **Error**: "ProfileRegistry not found"
  - **Solution**: Run `forge build` then `bun run deploy:testnet`

## 📝 Notes

- **Development**: Use testnet tokens and test Privy app
- **Production**: Create separate Privy app for production
- **Security**: Never commit API keys to version control
- **Free Tier**: Privy offers generous free tier for development

## 🎯 Next Steps

After setup, you can:
1. Deploy contracts: `bun run deploy:testnet`
2. Start the app: `bun run web:testnet`  
3. Test teacher registration flow
4. Customize styling and branding
5. Add student-teacher interaction features