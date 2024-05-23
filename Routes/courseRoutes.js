const express= require('express')
const courseControler =require('../controllers/controllersCourse')
const verifyToken =require('../middlewares/verifytoken');
const allowTO = require('../middlewares/allowTO');
const userRole = require('../utilities/userRoles');

const router = express.Router()
const app =express();
app.use(express.json());
// const { body } = require('express-validator');
// [
//     body('title')
//         .notEmpty()
//         .withMessage("title is required"),
//         body('price')
//         .notEmpty()
//         .withMessage("price is required")
// ],


router.route('/')
        .get(verifyToken,courseControler.getAllCourses)
        .post(verifyToken,allowTO([userRole.ADMIN,userRole.MANGER]),courseControler.addCourse)

router.route('/:courseID')
        .get(verifyToken,courseControler.getCourse)
        .patch(verifyToken,allowTO([userRole.ADMIN,userRole.MANGER]),courseControler.updateCourse)
        .delete(verifyToken,allowTO([userRole.ADMIN,userRole.MANGER]),courseControler.deleteCourse)
module.exports = router;
