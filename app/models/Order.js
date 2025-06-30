import mongoose, { Mongoose } from "mongoose";

const orderSchema = new mongoose.Schema({
    prodottiComprati: {
        type: String,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    userId: {
        type: String, 
        required: true
    }
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;