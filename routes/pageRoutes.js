const router= require('express').Router();
const pageController = require('../controllers/pageController');
const { protect } = require('../middlewares/protect');
const upload  = require('../middlewares/upload');

const pageUploads = upload.fields([
    { name : "pageCoverImage" , maxCount : 1 } , 
    { name : "pageProfileImage" , maxCount : 1 } 
])

router.post('/create' , protect , pageUploads , pageController.createPage);
router.get('/my' , protect , pageController.getMyPages);
router.get('/all', protect , pageController.getAllPages);
router.get('/:id' , protect, pageController.getSinglePage);

module.exports = router;