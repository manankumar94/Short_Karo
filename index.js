const express= require("express");
const path= require("path");
const {connectToMongoDB}= require("./connect")
const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const URL= require("./models/url");

const app= express();
const PORT=8000;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("MongoDb connected Successfully"))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); // path for ejs files

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//for ejs files
// app.get("/test", async(req, res)=>{
//   const allUrls= await URL.find({});
//   return res.render("home",{
//     urls: allUrls,
//   });
// })

app.use((req, res, next) => {
  res.locals.port = PORT;
  next();
});
app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
      const entry = await URL.findOneAndUpdate(
        { ShortId: shortId }, 
        {
          $push: {
            visitHistory: {
              timestamp: Date.now()
            }
          }
        },
        { new: true } // To return the updated document
      );
  
      if (entry) {
        console.log("Redirecting to:", entry.redirectURL);
        res.redirect(entry.redirectURL);
      } else {
        res.status(404).send("URL not found");
      }
    } catch (err) {
      console.error("Error fetching URL from database:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

app.listen(PORT, (err)=>{
    if(err) console.log(`Error is ${err}`);
    else console.log(`Server running on PORT ${PORT}`);
})