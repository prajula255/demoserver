const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: [true, "user id required"]
        },
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        profileImg: {
            type: [String],
        },
        phone: {
            type: Number
        }


        // role: {
        //   type: String,
        //   enum: ["user", "admin"],
        //   default: "user",
        // },
        // isActive: {
        //   type: Boolean,
        //   default: true,
        // },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

module.exports = User;
