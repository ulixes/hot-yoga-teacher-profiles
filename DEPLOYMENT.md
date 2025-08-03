# Deployment Guide

## Digital Ocean Droplet Deployment

### Current Deployment

**🌐 Application URL**: http://165.232.147.118:5137

### Server Configuration

- **Server**: Digital Ocean Droplet (Ubuntu)
- **IP Address**: 165.232.147.118
- **Port**: 5137
- **Firewall**: UFW configured to allow SSH (22) and HTTP (5137)

### Prerequisites

1. **vlayer API Token**: Required from [dashboard.vlayer.xyz](https://dashboard.vlayer.xyz)
2. **Private Key**: Ethereum testnet private key for contract deployment
3. **Privy App ID**: Required from [dashboard.privy.io](https://dashboard.privy.io)
4. **vlayer Browser Extension**: Install from Chrome Web Store

### Environment Setup

### Setting Up Privy

1. **Create Privy Account**:
   - Visit [dashboard.privy.io](https://dashboard.privy.io)
   - Sign up for a free account
   - Create a new app for your hot yoga platform

2. **Configure Privy App**:
   - Set your app name: "Hot Yoga Teacher Platform"
   - Configure login methods: Email, Google, Discord
   - Set redirect URLs to include your domain
   - Copy your App ID from the dashboard

### Environment Setup

Create `vlayer/.env.testnet.local`:
```env
VLAYER_API_TOKEN=your_jwt_token_from_dashboard
EXAMPLES_TEST_PRIVATE_KEY=0x...your_private_key
PRIVY_APP_ID=your_privy_app_id_from_dashboard
```

### Quick Start

1. **Install Dependencies**:
   ```bash
   cd /root/hot-yoga-teacher-profiles
   forge build
   cd vlayer
   bun install
   ```

2. **Deploy Contracts** (when ready):
   ```bash
   bun run deploy:testnet
   ```

3. **Start Development Server**:
   ```bash
   bun run web:testnet
   ```

4. **Access Application**:
   Open http://165.232.147.118:5137 in your browser

### Production Deployment

For production deployment, consider:

1. **Domain Setup**: Point domain to droplet IP
2. **SSL Certificate**: Use Nginx + Let's Encrypt
3. **Process Manager**: Use PM2 or systemd service
4. **Environment**: Switch to mainnet configuration

### Nginx Configuration (Optional)

For production with domain:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5137;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Firewall Rules

Current UFW rules:
```bash
sudo ufw allow ssh
sudo ufw allow 5137/tcp
sudo ufw enable
```

### Monitoring

Monitor the application:
```bash
# Check if service is running
ps aux | grep node

# Check logs
journalctl -f

# Check port usage
netstat -tlnp | grep 5137
```

### Troubleshooting

1. **Port not accessible**: Check UFW firewall rules
2. **App not starting**: Verify all dependencies installed
3. **Contract deployment fails**: Check API token and private key
4. **Web proof fails**: Ensure vlayer browser extension is installed
5. **Authentication fails**: Verify Privy App ID is correct and domain is configured
6. **Wallet creation fails**: Check Privy dashboard settings for embedded wallet configuration

### Security Notes

- Never commit private keys or API tokens to version control
- Use environment variables for all secrets (vlayer tokens, Privy App ID, private keys)
- Configure Privy domain restrictions in production
- Consider IP whitelisting for admin functions
- Regular security updates recommended
- Privy handles wallet security and key management automatically