import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import {User} from '../models/user.models.js'
import {uploadFileOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // receiving user info

    const { fullName, email, username, password } = req.body
    // console.log(`email: ${email}`);

    if ([fullName, email, username, password].some((field) => field?.trim() === '')) 
    {
        throw new ApiError(400, "All fields are required!")
    }
    else if(!email.includes('@'))
    {
        throw new ApiError(400,'Invalid Email')
    }

    const existedUser = User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser)
    {
       throw new ApiError(409,'Already an existing account') 
    }

    // files to upload i.e. coverImage and avatar image
    // files are received in req.files
    const avatarLocalPath = req.files?.avatar[0]?.path // multer acts as a middleware which is used to receive files from the client
    const coverImagePath = req.files?.coverImage[0].path

    if(!avatarLocalPath)
    {
        throw new ApiError(400,'Avatar image required!')
    }

    const avatar = await uploadFileOnCloudinary(avatarLocalPath)
    const coverImage = await uploadFileOnCloudinary(coverImagePath)

    if(!avatar)
    {
        throw new ApiError(400,'Avatar image required!')
    }

    //storing in database

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage: coverImage?.url || '',
        email,
        username: username.toLowerCase()
    })
 // validating data stored in DB

    const createdUser = await User.findById(user._id).select('-password -refreshToken')
    if(!createdUser)    throw new ApiError(500,'Database entry creation error while creating user!')

    return res.status(201).json(
        new ApiResponse(200,'User registered!',createdUser)
    )
}
)
export { registerUser }