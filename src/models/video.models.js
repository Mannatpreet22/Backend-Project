import mongoose,{Schema} from "mongoose";   // destructing already done
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema({
    videoFile:{
        type : String,  //cloudinary uri
        required:true
    },
    thumbnail:{
        type: String,
        required: true,
    },
    owner :{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0,
    },
    isPublished:{
        type:Boolean,
        default:true,
    }

},{timestamps:true})  // second way of creating a new schema(title) in mongoDB by destructing

mongoose.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video',videoSchema)