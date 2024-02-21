import express from 'express';

const router = express.Router();

router
    .route('/')
    .get(getUsersAction);

router
    .route('/:id')
    .get(getUserByIdAction);

export default router;