import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }, 
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number
        }
    }],
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Orders = mongoose.model('Orders', ordersSchema);

export default Orders