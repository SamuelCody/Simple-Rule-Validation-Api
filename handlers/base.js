require("dotenv").config();

//get programmer's info
exports.getInfo = function (req, res, next) {
    try {
        const data = {
            name: process.env.NAME,
            github: process.env.GITHUB,
            email: process.env.EMAIL,
            mobile: process.env.MOBILE,
            twitter: process.env.TWITTER
        };

        return res.status(200).json({
            message: "My Rule-Validation API",
            status: "success",
            data
        });
    } catch (err) {
        return res.status(400).json({
            message: "Cannot find data",
            status: "error",
            data: null
          });
    }
}