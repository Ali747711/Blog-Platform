const express = require('express');
const {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postsController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', listPosts);
router.get('/:slug', getPost);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;