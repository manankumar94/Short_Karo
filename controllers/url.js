const shortid= require("shortid");
const URL = require("../models/url");

async function generateNewShortURL (req, res){
    const body= req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});
    const shortID= shortid();  // require above
    await URL.create({
        ShortId: shortID,
        redirectURL: body.url,
        visitHistory:[]
    });

    return res.render("home",{
        id: shortID,
    })
}

async function getAnalytics (req, res){
    const shortId = req.params.shortId;
    const result= await URL.findOne({ShortId: shortId});
    if(!result) return res.status(404).json({Error: "Short Url Not Found"});
    return res.json({
        Redirected_URL:result.redirectURL,
        TotalClicks : result.visitHistory.length, 
        Analytics : result.visitHistory,
    });
}

module.exports={
    generateNewShortURL,
    getAnalytics,
}