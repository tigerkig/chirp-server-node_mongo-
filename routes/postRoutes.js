const router = require('express').Router();
const upload  = require('../middlewares/upload');
const { protect } = require('../middlewares/protect');
const postController = require('../controllers/postController');

const postUploads =  upload.fields([
    { name : 'backgroundImage', maxCount: 1 }, 
    { name : 'gif', maxCount: 1 }, 
    { name : 'media' } 
]);


router.post('/' , protect , postUploads , postController.createPost);
router.get('/' , protect , postController.getPosts);

module.exports = router;