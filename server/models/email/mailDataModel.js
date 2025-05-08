import mongoose from "mongoose";

const mailDataShema = new mongoose.Schema({
    userData:{
        type:Array
    },
    emailSubject:{
        type:String,
        required:true
    },
    emailMessage:{
        type:String
    }
});

const mailData = mongoose.model("emailData",mailDataShema);

export default mailData;
