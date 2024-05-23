const express= require('express')
const userControllers =require('../controllers/userController')
const verifyToken =require('../middlewares/verifytoken');
const allowTO = require('../middlewares/allowTO');
const userRole = require('../utilities/userRoles');
const router = express.Router()
const multer = require('multer');
const appError = require('../utilities/appError');
const app =express();
app.use(express.json());

const storage= multer.diskStorage({
        destination: (req,file,cb)=>{
                cb(null,'uploads/')
        },
        fileName:(req,file,cb)=>{
                const ext = file.mimeType.split('/')[1];
                const fileName = `user-${date.now()}.${ext}`;
                cb(null,fileName)
        }
})
const fileFilter = (req,file,cb)=>{
        const fileType = file.mimeType.split('/')[0];
        if(fileType === 'image'){
                cb(null,true)
        }else{
                cb(appError.create(401,'file must be image'),false)
        }
}

const upload = multer({
        storage:storage,
        fileFilter
})

router.route('/')
        .get(verifyToken,userControllers.getAllUsers)

router.route('/rigister')
        .post(upload.single('avatar'),userControllers.register)

router.route('/login')
        .post(userControllers.login)
        
module.exports = router;
