require("dotenv").config();
const express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
const cors = require("cors");
const session = require("express-session");
const { request } = require("http");
const path = require("path");
const connectDb = require("./config/Database");
const JwtStrategy = require("passport-jwt").Strategy;
const cookieParser = require("cookie-parser");
const ProductRouter = require("./routes/ProductRoutes");
const BrandRouter = require("./routes/BrandRoutes");
const CategoryRouter = require("./routes/CategoryRoutes");
const AuthRouter = require("./routes/AuthRoutes");
const UserRouter = require("./routes/UserRoutes");
const CartRouter = require("./routes/CartRoutes");
const OrderRouter = require("./routes/OrderRoutes");
const PaymentRouter = require("./routes/PaymentRoutes");
const { UserSchema } = require("./model/AuthModel");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");

const corsConfig = {
  origin: process.env.CLIENT_HOST,
  credentials: true,
  // methods:[" GET"," POST", "PUT"," DELETE"],
  headers: [" Content-Type", "*"],
  exposedHeaders: ["X-Total-Count"],
};

const app = express();
app.use(express.static(path.resolve(__dirname, "build")));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
app.use(passport.authenticate("session"));
app.use(cors(corsConfig));
app.use(express.json()); //to parse a req body
// app.use(express.raw({type: 'application/json'}))
app.use("/products", ProductRouter.router);
app.use("/brands", BrandRouter.router);
app.use("/categories", CategoryRouter.router);
app.use("/orders", isAuth(), OrderRouter.router);
app.use("/users", AuthRouter.router);
app.use("/user", isAuth(), UserRouter.router);
app.use("/cart", isAuth(), CartRouter.router);
app.use("/create-payment-intent", isAuth(), PaymentRouter.router);



const SECRET_KEY = process.env.SECRET_KEY;
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

//pasport strategies
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    console.log("Passport");
    // console.log({email,password}) by default passport uses username
    try {
      // console.log(email)
      const user = await UserSchema.findOne({ email: email }).exec();
      console.log({ indexUser: user });
      if (!user) {
        console.log("!USER");
        return done(null, false, { message: "invalid credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            console.log("timingSageEqual");
            console.log(user.password, hashedPassword);
            return done(null, false, {
              message: "Incorrect username or password.",
            });
          }
          console.log("LoginUser");
          console.log("SecretKey:" + SECRET_KEY);
          let token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          console.log(token);
          done(null, { id: user.id, role: user.role, token: token });
        }
      );
    } catch (err) {
      console.log("Error");
      return done(err);
    }
  })
);
//PASSPORT JWT
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log("JWT");
    console.log(jwt_payload);
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
    try {
      console.log("jwt try");
      const user = await UserSchema.findById(jwt_payload.id);
      console.log("jwtuser");
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
//serialize and deserialize
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log(user);
    console.log("Serialize user");
    return cb(null, { id: user.id, role: user.role });
  });
});
passport.deserializeUser(function (user, cb) {
  console.log("deserializeUser", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports=app

