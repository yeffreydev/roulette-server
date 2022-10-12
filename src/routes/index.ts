import {Router} from 'express';

var router = Router();

router.use('/users', users);
router.use('/post', post);
router.use('/comments', comments);

export default router;
