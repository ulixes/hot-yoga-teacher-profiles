#!/bin/bash

# Nginx Setup Script for Hot Yoga Teacher Platform
# This script configures Nginx as a reverse proxy with SSL

echo "🧘‍♀️ Setting up Nginx for Hot Yoga Teacher Platform..."

# Install Nginx and Certbot
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx

# Create Nginx configuration
sudo tee /etc/nginx/sites-available/hot-yoga-teachers << 'EOF'
server {
    listen 80;
    server_name your-domain.com;  # REPLACE with your actual domain

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
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/hot-yoga-teachers /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

echo "✅ Nginx configuration complete!"
echo ""
echo "Next steps:"
echo "1. Update 'your-domain.com' in /etc/nginx/sites-available/hot-yoga-teachers"
echo "2. Point your domain to this server (165.232.147.118)"
echo "3. Run: sudo certbot --nginx -d your-domain.com"
echo "4. Your app will be available at https://your-domain.com"