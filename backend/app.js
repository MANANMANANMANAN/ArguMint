const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require("cors");  // Use require instead of import
const app = express();
const cookieParser = require("cookie-parser");
// const { deposit, withdraw, getBalance } = require('./alchemy');

// app.post('/deposit', async (req, res) => {
//     try {
//       await deposit();
//       res.status(200).send('Deposit successful');
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   });
  
//   // Route to withdraw funds from the contract
//   app.post('/withdraw', async (req, res) => {
//     const { amount, recipient } = req.body;
//     try {
//       await withdraw(amount, recipient);
//       res.status(200).send('Withdrawal successful');
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   });
  
//   // Route to get the balance of the contract
//   app.get('/balance', async (req, res) => {
//     try {
//       const balance = await getBalance();
//       res.status(200).send(`Balance: ${balance}`);
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   });
app.use(express.json({ limit: '10mb' }));  // Example to increase limit to 10 MB
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Importing routes
const debate = require("./routes/debate");
const user = require("./routes/user");

// Using routes
app.use("/api/v1", debate);
app.use("/api/v1", user);

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
}));

io.on("connection", (socket) => {
    console.log("User Connected");

    // socket.on("connect_wallet", (data) => {
    //     socketToWalletMap.set(socket.id, data);
    //     console.log("Connected Successfully");
    // });

    socket.on("message", (data) => {
        console.log(data);
        // console.log(data);
        const messageData = {
            state: data.state,
            message: data.message,
            sender: data.socketId,
            messageId : data.messageId
        };
        io.to(data.room).emit("receive-message", messageData);
    });

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User joined room - ${room}`);
    });

    socket.on("liker", (data) => {
        let integer = parseInt(data.content, 10);
        integer = integer + 1;
        // console.log(integer);
        // console.log(data.index);
        const likeData = {
            message: String(integer),
            index: data.index,
        };
        // console.log(likeData);
        io.to(data.room).emit("receive-counter", likeData);
    });

    console.log("Id", socket.id);
    socket.emit("welcome", `Welcome to the server, ${socket.id}`);
    socket.broadcast.emit("Welcome", `${socket.id} joined the server`);

    // socket.on("disconnect", () => {
    //     console.log("User Disconnected", socket.id);
    // });
});

// Start server
const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
