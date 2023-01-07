import { Router } from 'express';
import { getOnePost, getPosts, createPost, updatePost, deletePost } from '../controllers/posts.controller';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getOnePost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
//router.patch('/:id/upvotePost', upvotePost);

export default router;