import {Router} from 'express';
import {registerUser} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';

const router = Router();

// const handleUserImageUpload = (req, res, next) => {
//     upload.fields([
//         {
//             name: "avatar",
//             maxCount: 1
//         },
//         {
//             name: "coverImage",
//             maxCount: 1
//         }
//     ])(req, res, (err) => {
//         if (err) {
//             if (err.code === "LIMIT_UNEXPECTED_FILE") {
//                 return res.status(400).json({
//                     message: `Unexpected file field '${err.field}'. Allowed fields are 'avatar' and 'coverImage'.`
//                 });
//             }

//             return next(err);
//         }

//         return next();
//     });
// };


// const handleUserImageUpload = (req, res, next) => {
//     upload.fields([
//         { name: "avatar", maxCount: 1 },
//         { name: "coverImage", maxCount: 1 }
//     ])(req, res, (err) => {

//         console.log("====================");
//         console.log(err);
//         console.log("code:", err?.code);
//         console.log("field:", err?.field);
//         console.log("====================");

//         if (err) {
//             return res.status(400).json({
//                 code: err.code,
//                 field: err.field,
//                 message: err.message
//             });
//         }

//         console.log(req.files);

//         next();
//     });
// };

// router.route('/register').post(
//     handleUserImageUpload,
//     registerUser);
//router.route('/login').post(login)



//const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

export default router;