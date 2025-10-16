import express, { json } from 'express'
import UserModel from '../Models/UserModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()


router.post('/register', async (req, res) => {
    const { user, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10)
        const newUser = new UserModel({ user, password: hashed })
        await newUser.save()
        res.status(201).json({ message: "Registerd Succesfully", userId: newUser._id })
    } catch (error) {
        res.status(500).json({ error: "Error message in Posting" })
    }
})


router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    try {
        const existUsers = await UserModel.findOne({ user })
        if (!existUsers) {
            console.log("user not found")
            res.status(400).json({ message: "Not found the User" })
        }
        const isMatch = await bcrypt.compare(password, existUsers.password)

        if (!isMatch) {
            console.log("Password Mistmatch");
            res.status(500).json({ error: "Password Mismatch" })
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT,
            { expiresIn: "1h" }
        );
        console.log('Login Succesfull')
        res.json({message:"Login Succesfull", token})
    } catch (error) {
        console.error(error)
        res.status(500).json("error login")
    }
})

export default router