// import 'dotenv/config'
// import express, { NextFunction, Request, Response } from 'express'
// import cors from 'cors'
// import connectDB from './config/db.js'
// import authRouter from './routes/authRoutes.js'
// import restaurantRouter from './routes/restaurantRoutes.js'
// import bookingRouter from './routes/bookingRoutes.js'
// import ownerRouter from './routes/ownerRoutes.js'
// import adminRouter from './routes/adminRoutes.js'
// const app = express()


// app.use(cors())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', [
//         'https://mernappecommerce-dashboard-app-eight.vercel.app/', // Your production Vercel URL
//         'http://localhost:3000',
//         'http://localhost:5173',
//         'http://localhost:5000/api',
//         'http://localhost:5000',
//     ]);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200); // Intercept and reply to preflight
//     }
//     next();
// });
// app.options('*', cors());













































import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
import restaurantRouter from './routes/restaurantRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'
import ownerRouter from './routes/ownerRoutes.js'
import adminRouter from './routes/adminRoutes.js'

const app = express()

// Connect to database
connectDB()

// Enable CORS safely for allowed origins
const allowedOrigins = [
    'https://mernappecommerce-dashboard-app-eight.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5000'
]

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

// Mount Routers
app.use('/api/auth', authRouter)
app.use('/api/restaurants', restaurantRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/owners', ownerRouter)
app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
    res.send('API is running...')
})

// Export for Vercel
export default app









// const corsOptions = {
//     origin: function (origin: any, callback: any) {
// const allowedOrigins = [
//     'https://mernappecommerce-dashboard-app-eight.vercel.app/', // Your production Vercel URL
//     'http://localhost:3000',
//     'http://localhost:5173',
//     'http://localhost:5000/api',
//     'http://localhost:5000',
// ];

//         // Allow server-to-server requests (no origin header)
//         if (!origin) return callback(null, true);

//         if (allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     maxAge: 86400
// };

// app.use(cors(corsOptions));

// // Explicitly handle preflight for all routes
// app.options('*', cors(corsOptions));



// const allowedOrigins = [
// 'https://mernappecommerce-dashboard-app-eight.vercel.app/', // Your production Vercel URL
// 'http://localhost:3000',
// 'http://localhost:5173',
// 'http://localhost:5000/api',
// 'http://localhost:5000',

// ];

// app.use(cors({
//     origin: function (origin, callback) {
//         // Allow requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     },
//     credentials: false // Set to true if you are using cookies/sessions
// }));


app.use('/api/auth', authRouter)
app.use('/api/restaurants', restaurantRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/admin', adminRouter)


await connectDB()
app.use(express.json())
const port = process.env.PORT || 5000
app.get('/', (req: Request, res: Response) => {
    res.send('server running')
})



// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error('unhandle error', err)
//     res.status(500).json({
//         message: err.message || 'internal server error',
//         stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
//     })
// })
app.listen(port, () => {
    console.log(`server running ${port}`)
})