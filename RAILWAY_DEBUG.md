# 🔍 RAILWAY BACKEND TROUBLESHOOTING

## ❌ **PROBLEM: Cannot access Railway backend**

URL: https://myblog-production.up.railway.app/health

---

## ✅ **DIAGNOSTIC CHECKLIST**

### **Step 1: Check Railway Deployment Status** ⏱️ 1 min

```
1. Go to: https://railway.app/dashboard
2. Click your backend service
3. Check deployment status:

🟢 Active = Good, continue to Step 2
🟡 Building/Deploying = Wait 2-3 minutes
🔴 Failed = Check logs (Step 5)
```

---

### **Step 2: Verify Environment Variables** ⏱️ 2 min

**Required Variables (ALL must be set):**

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://myblog_admin:fLAqExqgpBGdtnEI@cluster1.ovcadur.mongodb.net/myblog?retryWrites=true&w=majority&appName=Cluster1
JWT_SECRET=8ef433566f883bb43568b541436b735dfce0b2b0dba13a92e2cacf54ccacaf18
ADMIN_REGISTRATION_SECRET=b23b34494708357a60a2d4cf017e074b
FRONTEND_URL=https://your-app.netlify.app
```

**How to check:**
```
1. Railway Dashboard → Your Service
2. Click "Variables" tab
3. Verify all 6 variables exist
4. If missing, add them
5. Railway will auto-redeploy
```

---

### **Step 3: Check Domain/URL** ⏱️ 1 min

**Verify domain is generated:**

```
1. Railway Dashboard → Your Service
2. Click "Settings" tab
3. Scroll to "Networking" section
4. Should see domain: myblog-production.up.railway.app
5. If not, click "Generate Domain"
```

**Copy the EXACT URL Railway gives you**

---

### **Step 4: Test Different Endpoints** ⏱️ 2 min

**Try these URLs in browser:**

```
1. https://myblog-production.up.railway.app/health
   Should return: {"status":"OK",...}

2. https://myblog-production.up.railway.app/api/posts
   Should return: {"posts":[],...} or list of posts

3. https://myblog-production.up.railway.app/
   Might return: Cannot GET / (this is OK)
```

**If ALL fail:**
- Check deployment status
- Check logs

---

### **Step 5: Check Railway Logs** ⏱️ 2 min

**View deployment logs:**

```
1. Railway Dashboard → Your Service
2. Click "Deployments" tab
3. Click latest deployment
4. Scroll through logs
```

**Look for:**

**✅ Good signs:**
```
✅ MongoDB Connected: cluster1-shard-00-00...
📊 Database: myblog
Server running in production mode on port 5000
```

**❌ Bad signs:**
```
❌ MongoDB Connection Error
❌ Error: Cannot find module
❌ Port 5000 is already in use
❌ MONGODB_URI is not defined
```

---

### **Step 6: Verify GitHub Push** ⏱️ 1 min

**Make sure latest code is on GitHub:**

```bash
# Check git status
cd backend
git status

# If changes not pushed:
git add .
git commit -m "Fix Railway deployment"
git push

# Railway will auto-deploy
```

---

### **Step 7: Check Root Directory** ⏱️ 1 min

**Railway must know where backend is:**

```
1. Railway Dashboard → Your Service
2. Click "Settings" tab
3. Scroll to "Build & Deploy"
4. Check "Root Directory": should be "backend"
5. If wrong, update and redeploy
```

---

## 🔧 **COMMON FIXES**

### **Fix 1: Missing Environment Variables**

**Add all 6 variables in Railway:**
```
Variables tab → New Variable → Add each one
```

**After adding, Railway auto-redeploys (~2-3 min)**

---

### **Fix 2: Wrong Root Directory**

**Set root directory:**
```
Settings → Root Directory → backend
```

---

### **Fix 3: MongoDB Connection Failed**

**Check MongoDB Atlas:**
```
1. Network Access: 0.0.0.0/0 allowed
2. Database user exists
3. Password correct in MONGODB_URI
```

---

### **Fix 4: Build Failed**

**Check package.json has start script:**
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

**Railway uses "start" script for production**

---

### **Fix 5: Port Issues**

**Railway automatically sets PORT**

**Your code should use:**
```javascript
const PORT = process.env.PORT || 5000;
```

**Check src/server.js has this**

---

## 🧪 **QUICK TEST**

### **After fixing, test:**

**1. Health Endpoint:**
```
https://YOUR-RAILWAY-URL.up.railway.app/health

Expected response:
{
  "status": "OK",
  "timestamp": "2025-12-09...",
  "environment": "production"
}
```

**2. API Endpoint:**
```
https://YOUR-RAILWAY-URL.up.railway.app/api/posts

Expected response:
{
  "posts": [],
  "page": 1,
  "pages": 0,
  "count": 0
}
```

---

## 💡 **DEBUGGING TIPS**

### **1. Use Railway CLI:**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs in real-time
railway logs

# Check variables
railway variables
```

### **2. Check Browser Console:**

```
F12 → Network tab → Try accessing URL
Look for:
- 404 Not Found = Wrong URL
- 500 Server Error = Check logs
- Connection refused = Service not running
- CORS error = Different issue
```

### **3. Test Locally First:**

```bash
# Set production env
export NODE_ENV=production

# Use Railway MongoDB
export MONGODB_URI="mongodb+srv://..."

# Start server
npm start

# Test
curl http://localhost:5000/health
```

---

## 📋 **DEPLOYMENT CHECKLIST**

**Before Railway works, you need:**

```
✅ Code pushed to GitHub
✅ Railway connected to GitHub repo
✅ Root directory set to "backend"
✅ All 6 environment variables set
✅ MongoDB Atlas configured (IP whitelist)
✅ Domain generated
✅ Deployment successful (green)
✅ Logs show "Server running..."
```

---

## 🆘 **STILL NOT WORKING?**

### **Get Railway URL:**

```
1. Railway Dashboard
2. Your service
3. Settings → Networking
4. Copy EXACT domain
5. Test: https://EXACT-DOMAIN/health
```

### **Share These:**

1. Railway deployment status (Active/Failed)
2. Railway logs (last 20 lines)
3. Environment variables (are they all set?)
4. Root directory setting
5. Error message in browser

---

## ✅ **EXPECTED RESULT**

**When everything works:**

```
URL: https://myblog-production.up.railway.app/health

Response:
{
  "status": "OK",
  "timestamp": "2025-12-09T12:08:16.000Z",
  "environment": "production"
}

Status: 200 OK
```

---

**Follow the checklist above and let me know what you find!** 🔍
