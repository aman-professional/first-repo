# Chocolate Shopping Web App - COMPLETE SETUP & RUN GUIDE

A complete full-stack chocolate shopping application with live geolocation-based delivery tracking.

## ⚡ QUICK START (5 MINUTES)

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Seed database with products
npm run seed

# 3. Start backend server (keeps running)
npm start

# 4. In a NEW terminal, open frontend
# Option A: Direct URL: http://localhost:5000
# Option B: VS Code Live Server on frontend/index.html
```

---

## 📋 PREREQUISITES - INSTALL FIRST

### 1. Node.js (with npm)
- Download: https://nodejs.org/ (LTS version recommended)
- Verify: `node --version` and `npm --version`

### 2. MongoDB Community Edition
- Download: https://www.mongodb.com/try/download/community
- **Windows**: Run installer, check "Install MongoDB as a Service"
- **Mac/Linux**: Follow the installer instructions
- Verify: Open Command Prompt/Terminal and run `mongosh`

### 3. VS Code (Optional, for Live Server)
- Download: https://code.visualstudio.com/
- Install "Live Server" extension by Ritwick Dey

---

## 📂 PROJECT STRUCTURE

```
workshoplab is/
├── backend/                    (Node.js + Express server)
│   ├── package.json           ← npm dependencies
│   ├── server.js              ← Express app (PORT 5000)
│   ├── seed.js                ← Database seeding
│   ├── models/                ← MongoDB schemas
│   │   ├── Product.js
│   │   └── Order.js
│   └── routes/                ← API endpoints
│       ├── productRoutes.js   (GET /api/products)
│       └── orderRoutes.js     (POST/GET /api/orders)
│
├── frontend/                  (HTML, CSS, Vanilla JS)
│   ├── index.html             ← Home page
│   ├── products.html          ← Shop page
│   ├── cart.html              ← Shopping cart
│   ├── checkout.html          ← Checkout with geolocation
│   ├── admin.html             ← Orders dashboard
│   ├── css/
│   │   └── style.css          ← All styling
│   └── js/
│       ├── app.js             ← Main logic
│       └── checkout.js        ← Checkout logic
│
└── README.md                  ← This file
```

---

## 🚀 DETAILED SETUP INSTRUCTIONS

### STEP 1: Install Node.js

#### Windows:
1. Go to https://nodejs.org/
2. Download LTS version
3. Run installer → Click "Next" through all screens → Finish
4. Restart computer
5. Open Command Prompt and verify:
   ```bash
   node -v
   npm -v
   ```

#### Mac:
```bash
# Using Homebrew
brew install node
node -v
npm -v
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install nodejs npm
node -v
npm -v
```

---

### STEP 2: Install MongoDB

#### Windows:
1. Download from https://www.mongodb.com/try/download/community
2. Run MSI installer
3. **IMPORTANT**: Check "Install MongoDB as a Service" ✓
4. Complete installation
5. MongoDB starts automatically as a service

Verify:
- Open Services (services.msc) → Look for "MongoDB" → Status should be "Running"
- OR open Command Prompt: `mongosh` → Should connect without error

#### Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
mongosh
```

#### Linux:
```bash
sudo apt-get install mongodb-org
sudo systemctl start mongod
mongosh
```

---

### STEP 3: Clone/Open Project

Navigate to your project folder:
```bash
cd "c:\Users\LOQ\Documents\workshoplab is"
```

---

### STEP 4: Install Backend Dependencies

```bash
cd backend
npm install
```

Wait for completion. You should see no errors.

---

### STEP 5: Seed the Database

```bash
npm run seed
```

Expected output:
```
Connected to MongoDB for seeding...
✓ Database seeded successfully! 8 products added.
```

**This creates the database and adds chocolate products.**

---

### STEP 6: Start Backend Server

```bash
npm start
```

Expected output:
```
✓ Connected to MongoDB - chocolate_shop
✓ Server running on http://localhost:5000
✓ Frontend available at http://localhost:5000
```

**Keep this terminal open!** It will continue running.

---

### STEP 7: Open Frontend in Browser

**DO NOT CLOSE the backend terminal!** Open a NEW terminal or browser:

#### Option A: Direct URL (Easiest)
```
http://localhost:5000
```

#### Option B: VS Code Live Server
1. Open project folder in VS Code
2. Install "Live Server" extension
3. Right-click `frontend/index.html` → "Open with Live Server"
4. Browser opens automatically (usually http://localhost:5500)

---

## ✅ TEST THE APPLICATION

### 1. Homepage
- Go to http://localhost:5000
- ✓ See featured chocolates
- ✓ Navbar visible
- ✓ Click "Shop Now"

### 2. Products Page
- Go to http://localhost:5000/products.html
- ✓ See all 8 chocolate products
- ✓ Click "Add to Cart"
- ✓ Cart count increases in navbar

### 3. Cart Page
- Go to http://localhost:5000/cart.html
- ✓ See products in cart
- ✓ Change quantity
- ✓ Click "Remove"
- ✓ Click "Proceed to Checkout"

### 4. Checkout Page
- Fill in your name
- Fill in your phone number
- **IMPORTANT**: Click "Get My Live Location"
- ✓ Browser asks for location permission → Click "Allow"
- ✓ Map preview appears
- ✓ Click "Place Order"
- ✓ See confirmation message

### 5. Admin Orders Page
- Go to http://localhost:5000/admin.html
- ✓ See your order listed
- ✓ Click "View on Google Maps" to see location
- ✓ Order details show correctly

---

## 🌍 GEOLOCATION & MAPS

The app uses:
- **Browser Geolocation API** to capture lat/long
- **Google Maps Embed** to show delivery location
- No API key needed (embedded maps work locally)

When you click "Get My Live Location":
1. Browser requests permission
2. Shows your current location on map
3. Saves coordinates to database
4. Admin can see it on Google Maps

---

## 📊 DATABASE STRUCTURE

### MongoDB Collections

**products** collection:
```json
{
  "_id": "...",
  "name": "Dark Chocolate Truffles",
  "description": "Rich 70% dark chocolate...",
  "price": 15.99,
  "image": "https://...",
  "category": "chocolate",
  "createdAt": "2026-01-26T..."
}
```

**orders** collection:
```json
{
  "_id": "...",
  "name": "John Doe",
  "phone": "555-1234567",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "cartItems": [
    { "productId": "...", "name": "...", "price": 15.99, "quantity": 2 }
  ],
  "totalAmount": 31.98,
  "createdAt": "2026-01-26T..."
}
```

---

## 🔌 API ENDPOINTS

All endpoints start with `http://localhost:5000/api`

### GET /api/products
Get all chocolate products
```bash
curl http://localhost:5000/api/products
```

### POST /api/orders
Create new order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "phone": "5551234567",
    "location": {"latitude": 40.7128, "longitude": -74.0060},
    "cartItems": [...],
    "totalAmount": 31.98
  }'
```

### GET /api/orders
Get all orders (admin)
```bash
curl http://localhost:5000/api/orders
```

---

## 🐛 TROUBLESHOOTING

### Problem: "Cannot connect to MongoDB"
**Solution:**
```bash
# Check MongoDB service (Windows Command Prompt as Admin)
net start MongoDB

# Or verify MongoDB is running
mongosh
```

### Problem: "Port 5000 is already in use"
**Solution:**
```bash
# Kill the process using port 5000
npx kill-port 5000
npm start
```

### Problem: "Products not loading"
**Solution:**
1. Check if backend is running: See "npm start" terminal
2. Make sure you ran `npm run seed`
3. Open browser DevTools (F12) → Console → Check for errors
4. Check if API responds: http://localhost:5000/api/products

### Problem: "Location permission denied"
**Solution:**
1. Click lock icon in address bar
2. Find "Location" permission
3. Change to "Allow"
4. Refresh page
5. Try "Get My Live Location" again

### Problem: "Order not saving"
**Solution:**
1. Verify MongoDB is running: `mongosh`
2. Check backend terminal for errors
3. Fill all form fields (name, phone, location)
4. Look at browser console (F12) for error messages

### Problem: "Cannot reach localhost:5000"
**Solution:**
- Make sure backend is running: `npm start`
- Terminal should show "Server running on http://localhost:5000"
- Try refreshing browser

---

## 📱 RESPONSIVE DESIGN

The app works on:
- ✓ Desktop (1024px+)
- ✓ Tablet (768px+)
- ✓ Mobile (320px+)

All pages are mobile-friendly with responsive CSS.

---

## 🎨 CUSTOMIZATION

### Change Colors
Edit `frontend/css/style.css`:
```css
--primary-color: #4e342e;      /* Chocolate brown */
--accent-color: #d4a373;       /* Gold accent */
--bg-color: #fffaf0;           /* Light cream */
```

### Add More Products
Edit `backend/seed.js` and add to the `products` array, then run:
```bash
npm run seed
```

### Change Port Number
Edit `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3000;  // Changed from 5000
```

---

## 📦 DEPLOYMENT

### Deploy Backend to Heroku:
1. Create `Procfile`: `web: node server.js`
2. Create `heroku.yml`
3. Deploy: `heroku create` → `git push heroku main`

### Deploy Frontend to Vercel:
1. Push frontend folder to GitHub
2. Connect Vercel to GitHub
3. Deploy automatically

### Use MongoDB Atlas (Cloud):
1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `server.js` with your connection string

### Render Deployment:
The project includes a root-level `package.json` that automatically handles deployment on Render.
1. Connect your GitHub repo to Render.
2. Render will automatically detect the root `package.json`.
3. Use `npm run build` as the **Build Command**.
4. Use `npm start` as the **Start Command**.

---

## 📝 npm COMMANDS

```bash
# Backend commands
cd backend

npm install              # Install dependencies
npm start               # Start server (production)
npm run dev             # Start with nodemon (dev mode)
npm run seed            # Add products to database

# Frontend commands
npm install -g live-server   # Install Live Server globally
live-server frontend/         # Run frontend on port 8000
```

---

## 🎯 CHECKLIST - AM I READY?

- [ ] Node.js installed? (`node -v` shows version)
- [ ] MongoDB installed? (`mongosh` connects)
- [ ] In backend folder? (`ls` shows package.json)
- [ ] Dependencies installed? (`npm install` completed)
- [ ] Database seeded? (`npm run seed` shows success)
- [ ] Backend running? (`npm start` shows server running)
- [ ] Frontend loads? (http://localhost:5000 opens)
- [ ] Products visible? (Products page shows items)
- [ ] Cart works? (Can add/remove items)
- [ ] Location works? (Geolocation captures coordinates)
- [ ] Order saves? (Admin page shows orders)

**If all checked ✓ → You're ready!** 🎉

---

## 🆘 SUPPORT

### Debug Mode:
1. Open Browser DevTools: Press F12
2. Console tab → See JavaScript errors
3. Network tab → Check API calls
4. Check backend terminal for server errors

### Database Check:
```bash
mongosh
use chocolate_shop
db.products.count()    # Should show 8
db.orders.count()      # Should show your orders
db.orders.find()       # See order details
```

---

## 🚀 NEXT STEPS (AFTER SETUP)

1. **Add Payment Gateway** (Stripe, PayPal)
2. **Send Email Confirmations** (Nodemailer)
3. **User Authentication** (JWT, MongoDB users)
4. **Order Tracking** (Real-time updates)
5. **Admin Authentication** (Protect /admin.html)
6. **Review System** (5-star ratings)
7. **Recommendation Engine** (Based on purchases)
8. **Promo Codes** (Discount system)

---

## 📄 FILES CHECKLIST

**Backend files (must have):**
- ✓ backend/package.json
- ✓ backend/server.js
- ✓ backend/seed.js
- ✓ backend/models/Product.js
- ✓ backend/models/Order.js
- ✓ backend/routes/productRoutes.js
- ✓ backend/routes/orderRoutes.js

**Frontend files (must have):**
- ✓ frontend/index.html
- ✓ frontend/products.html
- ✓ frontend/cart.html
- ✓ frontend/checkout.html
- ✓ frontend/admin.html
- ✓ frontend/css/style.css
- ✓ frontend/js/app.js
- ✓ frontend/js/checkout.js

---

## 🎉 SUCCESS!

Once everything is running:
1. Shop for chocolates at http://localhost:5000
2. Add to cart and checkout
3. Allow browser location permission
4. Place order with your location
5. View order in admin dashboard
6. Click map to see delivery location on Google Maps

**Congratulations! Your full-stack app is complete!** 🍫✨

---

**Questions?** Check the troubleshooting section or review the code comments.

**Ready to deploy?** See the Deployment section above.
