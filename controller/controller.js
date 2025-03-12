const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()
const User = require("../database/schema/userSchema")
const Ad = require("../database/schema/adSchema")
const { request, response } = require("express")
const { v4: uuidv4 } = require('uuid')

exports.firstget = async (request, response) => {

    response.send("hii express")

}

exports.firstpost = async (request, response) => {
    const { name, age } = request.body
    response.send(`my name is ${name} and ${age}`)

}

exports.login = async (request, response) => {
    const { email, password } = request.body
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        return response.status(404).json("user not found")
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password)
    if (!passwordMatch) {
        return response.status(404).json("password not matching")
    }
    try {
        const token = jwt.sign({ emailId: existingUser.email }, process.env.JWT_SECRET
            , { expiresIn: "1h" });
        return response.status(201).json({ userDetails: existingUser, token, message: "Login successful" })

    } catch (error) {
        return response.status(500).json({ error: error.message })
    }

}

exports.register = async (request, response) => {
    const { name, email, password } = request.body
    try {
        if (!name || !email || !password) {
            return response.status(406).json("provide required credentials")
        }

        const existingUser = await User.findOne({ email })
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)
        if (existingUser) {
            console.log(existingUser);

            return response.status(406).json("already existing account, please login")
        }



        else {
            const newId = uuidv4();
            const newUser = new User({
                user_id: newId,
                name,
                email,
                password: encryptedPassword
            })
            await newUser.save()
            return response.status(200).json({ newUser, message: "Registration successful" })
        }
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }

}

exports.updateUser = async (request, response) => {
    const formData = request.body
    const formFiles = request.files
    console.log("request body: \n", formData, "\nrequest files:\n", formFiles);
    response.status(200).json("success")
    try {
        const existingUser = await User.findOne({ email: formData.email })
        if (existingUser) {
            try {
                if (formData.name) existingUser.name = formData.name;
                if (formData.password) existingUser.password = formData.password;
                if (formData.phone) existingUser.phone = formData.phone;
                if (formFiles.images) {
                    const imgPaths = formFiles.images.map(file => {
                        `/pictures/profileImage/${file.fileName}`
                    })
                    existingUser.profileImg = imgPaths
                };
                await existingUser.save();

                return response.status(200).json({ msg: "updated profile successfully" });

            } catch (error) {
                return response.status(500).json({ error: error.message });
            }
        }

        else {
            return response.status(406).json({ msg: "user not found" })
        }
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

exports.insertNewAds = async (request, response) => {
    console.log("insert new ads");

    const formData = request.body
    const formFiles = request.files
    console.log(request.files);



    try {
        if (formData && formFiles) {
            const imgPath = formFiles.map(file => `/pictures/car/${file.filename}`)

            const newAd = new Ad({
                user_id: formData.user_id,
                brand: formData.brand,
                year: formData.year,
                fuel: formData.fuel,
                transmission: formData.transmission,
                kmdriven: formData.kmdriven,
                owners: formData.no_of_owners,
                price: formData.price,
                description: formData.description,
                imgPath: imgPath,
                location: formData.location,
            })
            await newAd.save()

            return response.status(200).json("images found")

        }
        else {
            return response.status(400).json("images not found")

        }
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }

}


exports.fetchAds = async (request, response) => {
    const { userId } = request.params;

    try {

        const adDetails = await Ad.find({ user_id: (userId) });


        if (adDetails.length === 0) {
            return response.status(404).json({ message: "No ads posted" });
        }

        return response.status(200).json(adDetails);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
};

exports.fetchUserDetails = async (request, response) => {
    const { userId } = request.params;

    try {
        const userDetails = await User.findOne({ user_id: (userId) });
        if (!userDetails) {
            return response.status(404).json({ message: "No user found" });
        }
        return response.status(200).json(userDetails);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
};

