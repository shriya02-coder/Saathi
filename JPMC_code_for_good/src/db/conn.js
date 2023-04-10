const mongoose = require("mongoose");
//creating a database
mongoose.connect("mongodb://localhost:27017/cfgdata",{
    //useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("connection sucessful");
}).catch((error) => {
    console.log(error);
})