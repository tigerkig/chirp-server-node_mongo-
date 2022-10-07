const router = require('express').Router();
const storyController = require('../controllers/storyController');
const { protect } = require('../middlewares/protect');
const upload  = require('../middlewares/upload');

router.post('/create/text' , protect , storyController.createStory);
router.post('/create' , protect , upload.single('media') , storyController.createStory);
router.get('/my' , protect , storyController.getMyStories);
router.get('/all' , protect , storyController.getAllStories);

module.exports = router;