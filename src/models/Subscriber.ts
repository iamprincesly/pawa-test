import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name for the review'],
        maxlenght: 100,
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Please add a email for the review'],
        maxlenght: 200,
    },
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

export default Subscriber;