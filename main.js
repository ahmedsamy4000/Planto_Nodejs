const express=require('express');
const app=express();
const port=process.env.PORT||7500;
const bodyparser=require("body-parser");
const path=require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const multer=require('multer');
mongoose.connect("mongodb+srv://merafahmy219:NN6AM42JAjsMhdu8@cluster0.a9arhwd.mongodb.net/Planto");


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });


  const upload = multer({
    storage: storage
  }).single('image');

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specified headers
    next();
  });

  app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error uploading image.' });
      } else {
        if (!req.file) {
          res.status(400).json({ error: 'No file uploaded.' });
        } else {
          res.json({ imageUrl: `http://localhost:${port}/${req.file.filename}`});
        }
      }
    });
  });


  app.use(express.static('uploads'));

//#region MiddleWares
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors({
    exposedHeaders: ["x-auth-token"],
}))
//#endregion

//#region Register
const registerRouter=require("./Routes/RegisterRoutes");
app.use("/api/register",registerRouter);
//#endregion

//#region Login
const loginRouter=require("./Routes/LoginRoutes");

app.use("/api/login",loginRouter);
//#endregion

//#region Users
const userRouter=require("./Routes/UserRoutes");
app.use("/api/user",userRouter);
//#endregion

//#region Products
const productRoutes=require("./Routes/ProductRoutes");

app.use("/api/products",productRoutes);
//#endregion


//#region Receipt
const receiptRouter=require("./Routes/ReceiptRoutes");

app.use("/api/receipt",receiptRouter);
//#endregion




//////////////////////////////////////////////////////////////
const feedbackRoutes=require("./Routes/FeedBackRoutes");
const { name } = require('ejs');
app.use("/api/feedbacks",feedbackRoutes);

app.listen(port,()=>{console.log("http://localhost:"+port)});