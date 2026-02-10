import Password from "../models/Password.js";
import { encrypt, decrypt } from "../utils/crypto.js";

//add

export const addPassword = async (req, res) => {
    const { website, username, password } = req.body;

    try {
        const encryptedPassword = encrypt(password);

        const newPassword = await Password.create({
            userId: req.user,
            website,
            username,
            password: encryptedPassword
        });

        res.status(201).json(newPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get all password

export const getPasswords = async (req, res) => {
    try {
        const passwords = await Password.find({ userId: req.user });

        const decryptedPasswords = passwords.map(p => ({
            _id: p._id,
            website: p.website,
            username: p.username,
            password: decrypt(p.password)
        }));
        res.json(decryptedPasswords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update
export const updatePassword = async (req, res) => {

    try {
        const { website, username, password } = req.body;

        const updateData = {};

        if (website) updateData.website = website;
        if (username) updateData.username = username;

        if (password && password.trim() !== "") {
            updateData.password = encrypt(password);
        }

        const updated = await Password.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//delete
export const deletePassword = async (req, res) => {
    try {
        await Password.findOneAndDelete({
            _id: req.params.id,
            userId: req.user
        });

        res.json({ message: "Password deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};