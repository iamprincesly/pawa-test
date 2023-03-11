import express from 'express';

import { validateRequest, subscribe, getAllSubscribers, getOneSubscriber, deleteOneSubscriber, updateOneSubscriber, validateUpdateRequest } from '../controllers/newsletters';

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getAllSubscribers)
    .post(validateRequest, subscribe);

router
    .route('/:newsletterId')
    .get(getOneSubscriber)
    .put(validateUpdateRequest, updateOneSubscriber)
    .delete(deleteOneSubscriber);

export default router;
