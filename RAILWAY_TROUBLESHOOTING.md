# 🔧 RAILWAY DEPLOYMENT - TROUBLESHOOTING

## ❌ **ERROR: MongoDB URI undefined**

### **Problem:**
```
Error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

### **Cause:**
Environment variable `MONGODB_URI` tidak terset di Railway

---

## ✅ **SOLUTION - STEP BY STEP:**

### **1. Check Railway Environment Variables** ⏱️ 2 min

```
1. Go to Railway Dashboard: https://railway.app/dashboard
2. Click your backend service
3. Click "Variables" tab
4. Check if MONGODB_URI exists
```

**Should have:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myblog?retryWrites=true&w=majority
```

---

### **2. Add Missing Environment Variables** ⏱️ 3 min

**Required Variables:**
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://myblog_admin:YOUR_PASSWORD@cluster.mongodb.net/myblog?retryWrites=true&w=majority
JWT_SECRET=8ef433566f883bb43568b541436b735dfce0b2b0dba13a92e2cacf54ccacaf18
ADMIN_REGISTRATION_SECRET=b23b34494708357a60a2d4cf017e074b
FRONTEND_URL=https://your-app.netlify.app
```

**How to Add:**
```
1. Railway Dashboard → Your Service
2. Variables tab
3. Click "New Variable"
4. Add each variable above
5. Click "Add" for each
6. Service will auto-redeploy
```

---

### **3. Verify MongoDB Atlas Setup** ⏱️ 2 min

**Check Network Access:**
```
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click "Network Access" (left sidebar)
3. Verify: 0.0.0.0/0 is allowed
4. If not, click "Add IP Address" → "Allow Access from Anywhere"
```

**Check Database User:**
```
1. Click "Database Access" (left sidebar)
2. Verify user exists: myblog_admin
3. Check password is correct
4. User should have "Read and write to any database" privileges
```

---

### **4. Test Connection String** ⏱️ 1 min

**Format Check:**
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority

Replace:
- USERNAME: your database username (e.g., myblog_admin)
- PASSWORD: your database password (NO special chars like @, :, /)
- CLUSTER: your cluster address (e.g., cluster0.xxxxx)
- DATABASE: your database name (e.g., myblog)
```

**Common Mistakes:**
```
❌ Missing database name: /myblog?
❌ Wrong password (special characters not encoded)
❌ Wrong cluster address
❌ Missing ?retryWrites=true&w=majority
```

**Correct Example:**
```
mongodb+srv://myblog_admin:aB3xYz9mN2pQ5w@myblog-cluster.abc123.mongodb.net/myblog?retryWrites=true&w=majority
```

---

### **5. Check Railway Logs** ⏱️ 1 min

```
1. Railway Dashboard → Your Service
2. Click "Deployments" tab
3. Click latest deployment
4. Check logs for errors
```

**Look for:**
```
✅ Good:
✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
📊 Database: myblog

❌ Bad:
❌ MongoDB Connection Error: ...
```

---

## 🔍 **COMMON ISSUES & FIXES:**

### **Issue 1: Variable Name Mismatch**

**Problem:**
```
Code uses: MONGO_URI
Railway has: MONGODB_URI
```

**Solution:**
```
✅ Code now supports both!
✅ Use MONGODB_URI (recommended)
✅ Or use MONGO_URI (also works)
```

---

### **Issue 2: Password with Special Characters**

**Problem:**
```
Password: P@ssw0rd!123
Connection fails because @ and ! are special
```

**Solution:**
```
Option 1: URL encode password
P%40ssw0rd%21123

Option 2: Generate new password without special chars
Use only: a-z, A-Z, 0-9
```

**Generate Safe Password:**
```
1. MongoDB Atlas → Database Access
2. Click user → Edit
3. Click "Edit Password"
4. Click "Autogenerate Secure Password"
5. Copy password (will be safe)
6. Update MONGODB_URI in Railway
```

---

### **Issue 3: IP Not Whitelisted**

**Problem:**
```
MongoServerError: connection timed out
```

**Solution:**
```
1. MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. IP: 0.0.0.0/0
5. Comment: "Railway deployment"
6. Click "Confirm"
7. Wait 1-2 minutes for update
```

---

### **Issue 4: Wrong Database Name**

**Problem:**
```
Connection works but no data
```

**Solution:**
```
Check connection string has database name:
mongodb+srv://...mongodb.net/DBNAME?retryWrites=true

Should be:
mongodb+srv://...mongodb.net/myblog?retryWrites=true
```

---

## 📋 **DEPLOYMENT CHECKLIST:**

### **Railway Environment Variables:**
```
✅ NODE_ENV=production
✅ PORT=5000
✅ MONGODB_URI=<your-connection-string>
✅ JWT_SECRET=<your-jwt-secret>
✅ ADMIN_REGISTRATION_SECRET=<your-admin-secret>
✅ FRONTEND_URL=<your-netlify-url>
```

### **MongoDB Atlas:**
```
✅ Cluster created (M0 Free)
✅ Database user created
✅ Password saved
✅ Network access: 0.0.0.0/0
✅ Connection string copied
```

### **Railway Service:**
```
✅ Connected to GitHub
✅ Root directory: backend
✅ Environment variables set
✅ Domain generated
✅ Deployment successful
```

---

## 🧪 **TEST CONNECTION:**

### **After Fixing:**

**1. Check Railway Logs:**
```
Should see:
✅ MongoDB Connected: cluster0-shard-00-00...
📊 Database: myblog
Server running in production mode on port 5000
```

**2. Test Health Endpoint:**
```
https://your-app.up.railway.app/health

Should return:
{
  "status": "OK",
  "timestamp": "2025-12-09...",
  "environment": "production"
}
```

**3. Test API:**
```
Try registering a user from frontend
Check Railway logs for database operations
```

---

## 💡 **PRO TIPS:**

### **1. Copy Connection String Correctly:**
```
✅ Include everything after "Connect your application"
✅ Replace <password> with actual password
✅ Add /myblog before ?retryWrites
✅ No spaces or line breaks
```

### **2. Use Railway CLI for Debugging:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Check variables
railway variables

# View logs
railway logs
```

### **3. Test Locally First:**
```bash
# Set environment variable
export MONGODB_URI="mongodb+srv://..."

# Test connection
npm start

# Should see:
# ✅ MongoDB Connected: ...
```

---

## 🆘 **STILL NOT WORKING?**

### **Double Check:**

1. **Connection String Format:**
   ```
   mongodb+srv://USER:PASS@CLUSTER.mongodb.net/DB?retryWrites=true&w=majority
   ```

2. **Railway Variables:**
   ```
   All 6 variables set correctly
   No typos in variable names
   No extra spaces
   ```

3. **MongoDB Atlas:**
   ```
   IP whitelist: 0.0.0.0/0
   User exists with correct password
   Cluster is running
   ```

4. **Railway Deployment:**
   ```
   Latest deployment successful
   No build errors
   Logs show startup
   ```

---

## ✅ **FIXED!**

**After following these steps:**
```
✅ MONGODB_URI set in Railway
✅ MongoDB Atlas configured
✅ Connection successful
✅ Backend running
✅ Ready to deploy frontend!
```

---

**Need more help?**
- Railway Docs: https://docs.railway.app
- MongoDB Docs: https://docs.mongodb.com/atlas
- Check Railway Discord: https://discord.gg/railway
