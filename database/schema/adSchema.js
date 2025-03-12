const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: [true, "user id required"]
        },
        brand: {
            type: String,
            required: [true, "brand required"]
        },
        year: {
            type: Date,
            required: [true, "year required"]
        },
        fuel: {
            type: String,
            required: [true, "fuel required"]
        },
        transmission: {
            type: String,
            required: [true, "transmission required"]

        },
        kmdriven: {
            type: Number,
            required: [true, "km required"]
        },
        owners: {
            type: String,
            required: [true, "no of owners required"]
        },
        price: {
            type: String,
            required: [true, "price required"]
        },
        description: {
            type: String,
            required: [true, "description required"]
        },
        imgPath: {
            type: [String],
            required: [true, "image required"]
        },
        location: {
            type: String,
            required: [true, "location required"]
        }

    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Ad = mongoose.model("Ad", adSchema);

module.exports = Ad;
