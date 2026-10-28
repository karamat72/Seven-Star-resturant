import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Persistent Database Directory & File
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Secure Admin Credentials for SEVEN STAR
// Username: bellagioadmin
// Private Strong Password: SevenStar@RoyalHearth2026!
const ADMIN_USERNAME = 'bellagioadmin';
const ADMIN_DEFAULT_PASSWORD = 'SevenStar@RoyalHearth2026!';

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Initial Database Seeding
interface DatabaseSchema {
  admin: {
    email: string;
    salt: string;
    passwordHash: string;
    createdAt: string;
  };
  orders: any[];
  reservations: any[];
  menu: any[];
  reviews: any[];
}

function loadDatabase(): DatabaseSchema {
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading database, creating new one', err);
    }
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(ADMIN_DEFAULT_PASSWORD, salt);

  const initialDb: DatabaseSchema = {
    admin: {
      email: ADMIN_USERNAME,
      salt,
      passwordHash,
      createdAt: new Date().toISOString()
    },
    orders: [
      {
        id: 'ord-101',
        orderNumber: 'FS-ORD-84920',
        items: [
          {
            id: 'it-1',
            menuItem: {
              id: 'dish-1',
              name: 'Truffle Alfredo Pasta',
              price: 520,
              category: 'Pasta',
              image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80'
            },
            quantity: 2,
            specialInstructions: 'Extra parmesan on the side please'
          },
          {
            id: 'it-2',
            menuItem: {
              id: 'dish-6',
              name: 'Chocolate Lava Cake',
              price: 350,
              category: 'Desserts',
              image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80'
            },
            quantity: 1
          }
        ],
        orderType: 'dine-in',
        tableNumber: 'Table 4 (Window Booth)',
        customerInfo: {
          name: 'Rahul Mehta',
          email: 'rahul.mehta@example.com',
          phone: '+91 98765 12345'
        },
        paymentMethod: 'stripe-card',
        paymentStatus: 'paid',
        subtotal: 1390,
        tax: 222,
        deliveryFee: 0,
        discount: 139,
        total: 1473,
        status: 'cooking',
        createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        estimatedTime: '20 mins'
      },
      {
        id: 'ord-102',
        orderNumber: 'FS-ORD-84921',
        items: [
          {
            id: 'it-3',
            menuItem: {
              id: 'dish-2',
              name: 'Grilled Salmon',
              price: 790,
              category: 'Steaks',
              image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80'
            },
            quantity: 1
          },
          {
            id: 'it-4',
            menuItem: {
              id: 'dish-3',
              name: 'Classic Margherita',
              price: 480,
              category: 'Pizza',
              image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80'
            },
            quantity: 1
          }
        ],
        orderType: 'delivery',
        deliveryAddress: {
          street: 'Apartment 4B, Silver Heights',
          area: 'VIP Road, Zirakpur',
          city: 'Punjab',
          notes: 'Call upon arrival at reception gate'
        },
        customerInfo: {
          name: 'Priya Sharma',
          email: 'priya.sharma@example.com',
          phone: '+91 98765 67890'
        },
        paymentMethod: 'cash-on-delivery',
        paymentStatus: 'pending',
        subtotal: 1270,
        tax: 203,
        deliveryFee: 60,
        discount: 0,
        total: 1533,
        status: 'preparing',
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        estimatedTime: '35 mins'
      }
    ],
    reservations: [
      {
        id: 'res-201',
        referenceNumber: 'FS-RES-7821',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot: '7:30 PM',
        guestsCount: 2,
        seatingPreference: 'Romantic Window Booth',
        occasion: 'Romantic Dinners',
        guestName: 'Rahul Mehta',
        guestEmail: 'rahul.mehta@example.com',
        guestPhone: '+91 98765 12345',
        specialRequests: 'Candlelight setup with rose petals for anniversary',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      },
      {
        id: 'res-202',
        referenceNumber: 'FS-RES-7822',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot: '8:00 PM',
        guestsCount: 6,
        seatingPreference: 'Indoor Main Dining',
        occasion: 'Family Gatherings',
        guestName: 'Amit Kapoor',
        guestEmail: 'amit.kapoor@example.com',
        guestPhone: '+91 98765 44332',
        specialRequests: 'High chair for toddler please',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    ],
    menu: [],
    reviews: []
  };

  saveDatabase(initialDb);
  return initialDb;
}

function saveDatabase(db: DatabaseSchema) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

// In-memory or verified token storage
const activeSessions = new Set<string>();

// Middleware to protect admin routes
function requireAdminAuth(req: Request, res: Response, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Admin credentials required.' });
  }
  const token = authHeader.substring(7);
  if (!activeSessions.has(token)) {
    return res.status(403).json({ error: 'Invalid or expired session token.' });
  }
  next();
}

// ==================== API ROUTES ====================

// 1. Admin Authentication
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const db = loadDatabase();
  const normalizedUser = username.trim().toLowerCase();

  // Accept bellagioadmin, bellagioadmin@sevenstar.dining, or existing db admin
  const isMatchUser = 
    normalizedUser === 'bellagioadmin' || 
    normalizedUser === 'bellagioadmin@sevenstar.dining' ||
    normalizedUser === db.admin.email.toLowerCase();

  if (!isMatchUser) {
    return res.status(401).json({ error: 'Invalid credentials. User not found.' });
  }

  // Check against either current private password or stored hash
  const expectedHash = hashPassword(password, db.admin.salt);
  const isCorrect = (expectedHash === db.admin.passwordHash) || (password === ADMIN_DEFAULT_PASSWORD);

  if (!isCorrect) {
    return res.status(401).json({ error: 'Incorrect password.' });
  }

  // Generate secure token
  const token = `adm_${crypto.randomBytes(32).toString('hex')}`;
  activeSessions.add(token);

  res.json({
    success: true,
    token,
    user: {
      name: 'SEVEN STAR Operations Director',
      email: 'bellagioadmin',
      role: 'admin'
    }
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// 2. Orders API
app.get('/api/orders', (req: Request, res: Response) => {
  const db = loadDatabase();
  res.json(db.orders);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const db = loadDatabase();
  const orderData = req.body;

  const orderNum = `FS-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  const newOrder = {
    ...orderData,
    id: `ord-${Date.now()}`,
    orderNumber: orderNum,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    estimatedTime: orderData.orderType === 'delivery' ? '35-45 mins' : '20-25 mins'
  };

  db.orders.unshift(newOrder);
  saveDatabase(db);

  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id/status', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const db = loadDatabase();
  const orderIndex = db.orders.findIndex((o) => o.id === id || o.orderNumber === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  db.orders[orderIndex].status = status;
  db.orders[orderIndex].updatedAt = new Date().toISOString();
  saveDatabase(db);

  res.json(db.orders[orderIndex]);
});

// 3. Reservations API
app.get('/api/reservations', (req: Request, res: Response) => {
  const db = loadDatabase();
  res.json(db.reservations);
});

app.post('/api/reservations', (req: Request, res: Response) => {
  const db = loadDatabase();
  const resData = req.body;

  const refNum = `FS-RES-${Math.floor(1000 + Math.random() * 9000)}`;
  const newRes = {
    ...resData,
    id: `res-${Date.now()}`,
    referenceNumber: refNum,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  db.reservations.unshift(newRes);
  saveDatabase(db);

  res.status(201).json(newRes);
});

app.patch('/api/reservations/:id/status', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const db = loadDatabase();
  const resIndex = db.reservations.findIndex((r) => r.id === id || r.referenceNumber === id);
  if (resIndex === -1) {
    return res.status(404).json({ error: 'Reservation not found.' });
  }

  db.reservations[resIndex].status = status;
  db.reservations[resIndex].updatedAt = new Date().toISOString();
  saveDatabase(db);

  res.json(db.reservations[resIndex]);
});

// Cancel reservation (customer or admin)
app.delete('/api/reservations/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = loadDatabase();
  const resIndex = db.reservations.findIndex((r) => r.id === id || r.referenceNumber === id);
  if (resIndex === -1) {
    return res.status(404).json({ error: 'Reservation not found.' });
  }

  db.reservations[resIndex].status = 'cancelled';
  saveDatabase(db);
  res.json({ success: true, message: 'Reservation cancelled.' });
});

// 4. Server health & status
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    restaurant: 'SEVEN STAR Continental Kitchen',
    adminUsername: ADMIN_USERNAME,
    timestamp: new Date().toISOString()
  });
});

// Setup Vite or Static File Serving
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`SEVEN STAR Continental Kitchen Server on port ${PORT}`);
    console.log(`Admin Portal:`);
    console.log(`  Username: ${ADMIN_USERNAME}`);
    console.log(`  Password: [SECURE PRIVATE KEY CONFIGURED]`);
    console.log(`=======================================================`);
  });
}

startServer();
