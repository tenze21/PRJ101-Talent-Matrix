const path = require('path')

//home page//
exports.getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html')); // Adjust the path here
};

//faq//
exports.getfaq = (req, res) => {
    res.sendFile(path.join(__dirname, '../faq.html')); // Adjust the path here
};

//acout us//
exports.getaboutus = (req, res) => {
    res.sendFile(path.join(__dirname, '../aboutus.html')); // Adjust the path here
};

//clients//
exports.getclient = (req, res) => {
    res.sendFile(path.join(__dirname, '../client.html')); // Adjust the path here
};

//accountRecovery//
exports.getaccountRecovery = (req, res) => {
    res.sendFile(path.join(__dirname, '../accountRecovery.html')); // Adjust the path here
};

//clientREgister//
exports.getclientregister = (req, res) => {
    res.sendFile(path.join(__dirname, '../clientRegister.html')); // Adjust the path here
};

//apply.html//
exports.getapply = (req, res) => {
    res.sendFile(path.join(__dirname, '../apply.html')); // Adjust the path here
};

//talentProfile//
exports.gettalentProfile = (req, res) => {
    res.sendFile(path.join(__dirname, '../Talent_Module/index.html')); // Adjust the path here
};

//login//
exports.getlogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html')); // Adjust the path here
};

//passwordreset//
exports.getpasswordreset = (req, res) => {
    res.sendFile(path.join(__dirname, '../passwordreset.html')); // Adjust the path here
};

//selector//
exports.getselector = (req, res) => {
    res.sendFile(path.join(__dirname, '../selectrole.html')); // Adjust the path here
};



