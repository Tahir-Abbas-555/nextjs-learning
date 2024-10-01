import mongoose, {Schema, Document} from "mongoose";
import { urlToUrlWithoutFlightMarker } from "next/dist/client/components/app-router";
import { StaticImageData } from "next/image";

export interface Message extends Document{
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema(
    {
        content:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            required:true,
            default: Date.now
        }
    } 
)

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifycode: string;
    varifycodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema(
    {
        username: {
            type:String,
            required:[true,"Username is Required"],
            trim:true,
            unique:true
        },
        email: {
            type:String,
            required:[true,"Email is Required"],
            trim:true,
            unique:true,
            match: [/.+\@.+\..+/, "Please use a valid email"]
        },
        password: {
            type:String,
            required: [true,"Password is Reuired"]

        },
        verifycode:{
            type:String,
            required: [true,"Verify Code is Reuired"]
        },
        varifycodeExpiry:{
            type:Date,
            required: [true,"Verify Code Expiray is Reuired"]
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
        isAcceptingMessage:{
            type:Boolean,
            default:true,
        },
        messages: [MessageSchema]
    }
)

const UserModel = (mongoose.models.User as mongoose.Model.<User>) || ()