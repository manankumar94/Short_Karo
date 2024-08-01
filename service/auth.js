const jwt= require("jsonwebtoken");
const secret= "Manan$123@";

//this function generate token for you
function setUser(user){
    const payload={
        _id: user._id,
        email: user.email,
    }
    return jwt.sign(payload, secret);
}

function getUser(token){
    if(!token) return null;
    try {
        console.log("Token being verified:", token);
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}


module.exports={
    setUser,
    getUser,
}