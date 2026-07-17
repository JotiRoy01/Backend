import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  
    // get user details from frontend
    // validation of user details - not empty
    // check if user already exists: username, email
    // check for images, check for avater
    // upload them to cloudinary
    // create user object - create entry in database
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {fullName, username, email, password} = req.body;
    console.log("email", email);

    if(
        [fullName, username, email, password].some((field) =>
        field?.trim === "")

    )   {
            throw new ApiError(400, "All fields are required");
    }

    const existedUser = User.findOne(
        {
            $or: [{username}, {email}]
        }
    );

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const avaterLocalPath = req.files?.avater[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avaterLocalPath) {
        throw new ApiError(400, "Avater image is required");
    }

    const avater = await uploadOnCloudinary(avaterLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avater) {
        throw new ApiError(500, "Avater file is required");
    }

    const user = await User.create({
        fullName,
        avater: avater.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createUser) {
        throw new ApiError(500, "User creation failed");
    }

    return res.status(201).json(
        new ApiResponse(201, "User created successfully", createUser)
    )
})

export {registerUser};