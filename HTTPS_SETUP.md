# HTTPS Setup for Privy Embedded Wallets

## 🚨 The Problem
Privy's embedded wallets require HTTPS to function. The error:
```
Embedded wallet is only available over HTTPS
```

## 🛠️ Solutions

### Option 1: Production Setup with Domain + SSL

1. **Get a Domain**
   - Purchase a domain (e.g., hotyogateachers.com)
   - Point it to your server IP: 165.232.147.118

2. **Install Nginx & SSL Certificate**
   ```bash
   # Run the provided script
   ./nginx-setup.sh
   
   # Update domain in nginx config
   sudo nano /etc/nginx/sites-available/hot-yoga-teachers
   # Replace 'your-domain.com' with your actual domain
   
   # Get free SSL certificate
   sudo certbot --nginx -d your-domain.com
   ```

3. **Update Privy Dashboard**
   - Add `https://your-domain.com` to allowed origins
   - Update redirect URIs

### Option 2: Quick Testing with ngrok

1. **Install ngrok**
   ```bash
   curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
   echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
   sudo apt update && sudo apt install ngrok
   ```

2. **Create ngrok Account**
   - Sign up at [ngrok.com](https://ngrok.com)
   - Get your auth token

3. **Run ngrok**
   ```bash
   # Authenticate
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   
   # Create HTTPS tunnel
   ngrok http 5137
   ```

4. **Use ngrok URL**
   - You'll get a URL like: `https://abc123.ngrok.io`
   - Use this URL instead of `http://165.232.147.118:5137`
   - Add the ngrok URL to Privy allowed origins

### Option 3: Local Development Only

For local development, you can:

1. **Disable Embedded Wallets Temporarily**
   ```tsx
   // In App.tsx
   embeddedWallets: {
     createOnLogin: 'off', // Changed from 'users-without-wallets'
   },
   ```

2. **Use External Wallets**
   - Users can connect MetaMask or other wallets
   - No HTTPS required for external wallets

## 📝 Privy Configuration Updates

Once you have HTTPS, update your Privy dashboard:

1. **Allowed Origins**:
   - Remove: `http://165.232.147.118:5137`
   - Add: `https://your-domain.com` (or ngrok URL)

2. **Redirect URIs**:
   - Remove: `http://165.232.147.118:5137`
   - Add: `https://your-domain.com` (or ngrok URL)

## 🚀 Recommended Approach

**For Production**: Use Option 1 (Domain + SSL)
- Professional appearance
- Better SEO
- Permanent solution

**For Testing**: Use Option 2 (ngrok)
- Quick setup
- No domain needed
- Good for demos

**For Development**: Use Option 3 (Disable embedded wallets)
- Simplest approach
- Still allows wallet connections
- Good for initial testing

## 🔧 Quick Fix for Immediate Testing

If you need to test immediately without HTTPS:

```tsx
// In vlayer/src/App.tsx, update the Privy config:
embeddedWallets: {
  createOnLogin: 'off', // Disable embedded wallets
},
```

This allows the app to run on HTTP, but users will need to connect their own wallets (MetaMask, etc.) instead of having wallets created automatically.