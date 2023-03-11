import Subscriber from '../models/Subscriber';

interface ErrorBagInterface {
    name?: string;
    email?: string;
}

export function validateRequest(req, res, next) {

    const errorBag: ErrorBagInterface = {};

    if (!req.body.email || !/^\S+@\S+\.\S+$/.test(req.body.email)) {
        errorBag.email = 'Please provide a valid email address.';
    }
    
    if (!req.body.name) {
        errorBag.name = 'Please enter your name.';
    }
  
    if (Object.entries(errorBag).length !== 0) {
        return res.status(400).json({ status: 'failed', errors: errorBag });
    }

    next();
}

export function validateUpdateRequest(req, res, next) {

    const errorBag: ErrorBagInterface = {};

    if (req.body.email && !/^\S+@\S+\.\S+$/.test(req.body.email)) {
        errorBag.email = 'Please provide a valid email address.';
    }
    
    if (Object.entries(errorBag).length !== 0) {
        return res.status(400).json({ status: 'failed', errors: errorBag });
    }

    next();
}

export async function subscribe(req, res, next) {

    const subscriber = await Subscriber.findOne({ email: req.body.email }).exec();

    if (!subscriber) {

        const subscriber = await Subscriber.create({
            name: req.body.name,
            email: req.body.email,
        });

        return res.status(201).json({ status: 'success', data: subscriber, });
    }
    
    return res.status(400).json({ status: 'failed', message: 'Look like email already exist' });
}

export async function getAllSubscribers(req, res, next) {

    const subscribers = await Subscriber.find();

    if (!subscribers.length) {
        return res.status(404).json({ status: 'failed', message: 'Look like there is no subscriber at the moment' });
    }
    
    return res.status(200).json({ status: 'success', data: subscribers, });
}

export async function getOneSubscriber(req, res, next) {

    const subscriber = await Subscriber.findById(req.params.newsletterId);

    if (!subscriber) {
        return res.status(400).json({ status: 'failed', message: 'Look like there is no subscriber with the provided ID' });
    }
    
    return res.status(200).json({ status: 'success', data: subscriber, });
}

export async function updateOneSubscriber(req, res, next) {

    const subscriber = await Subscriber.findByIdAndUpdate(req.params.newsletterId, req.body);

    if (!subscriber) {
        return res.status(400).json({ status: 'failed', message: 'Look like there is no subscriber with the provided ID' });
    }
    
    return res.status(200).json({ status: 'success', message: 'Subscriber updated successfully', });
}

export async function deleteOneSubscriber(req, res, next) {

    const subscriber = await Subscriber.findById(req.params.newsletterId);

    if (!subscriber) {
        return res.status(400).json({ status: 'failed', message: 'Look like there is no subscriber with the provided ID' });
    }
    
    subscriber.deleteOne();

    return res.status(200).json({ status: 'success', message: 'Subscriber deleted successfully', });
}