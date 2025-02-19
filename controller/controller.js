const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()
const User = require("../database/schema/userSchema")

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
            const newUser = new User({ name, email, password: encryptedPassword })
            await newUser.save()
            return response.status(200).json({ newUser, message: "Registration successful" })
        }
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }

}

exports.updateUser = async (request, response) => {
    const { nameToUpdate, currentEmail, emailIdToUpdate, passwordToUpdate } = request.body
    console.log(nameToUpdate, currentEmail, emailIdToUpdate, passwordToUpdate);

    try {

        const existingUser = await User.findOne({ email: currentEmail })
        if (existingUser) {

            try {
                if (nameToUpdate) existingUser.name = nameToUpdate;
                if (emailIdToUpdate) existingUser.email = emailIdToUpdate;
                if (passwordToUpdate) existingUser.password = passwordToUpdate;
                await existingUser.save();


                return response.status(200).json({
                    msg: `${nameToUpdate ? "name, " : ""}${emailIdToUpdate ? "email, " : ""}${passwordToUpdate ? "password " : ""}updated successfully`.trim().replace(/,\s*$/, "")
                });

            } catch (error) {
                return response.status(500).json({ error: error.message });
            }

        }

        else {
            console.log(existingUser);

            return response.status(406).json({ msg: "user not found" })
        }
    } catch (error) {
        return response.status(400).json("error:", error)
    }
}


