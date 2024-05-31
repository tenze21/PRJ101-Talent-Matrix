// controllers/admin/adminController.js
const Admin = require('../model/admin_profileModel');

exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findOne();
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findOne();
        if (admin) {
            admin.name = req.body.name || admin.name;
            admin.role = req.body.role || admin.role;
            admin.phoneNumber = req.body.phoneNumber || admin.phoneNumber;
            admin.dzongkhag = req.body.dzongkhag || admin.dzongkhag;
            admin.region = req.body.region || admin.region;
        } else {
            const newAdmin = new Admin(req.body);
            await newAdmin.save();
            return res.status(201).json(newAdmin);
        }
        await admin.save();
        res.json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
