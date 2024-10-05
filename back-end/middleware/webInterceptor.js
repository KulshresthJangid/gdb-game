const { OPEN_ROUTES } = require("../Constants/APIs");
const APIResponse = require("../DTOs/APIResponse");
const { validateAuthToken } = require("../utils/authUtils");

const intercept = async (req, res, next) => {
    // await OPEN_ROUTES.forEach(el => {
    //     console.log("requset pasth", req.path, el)
    //     if (req.path == el) {
    //         next();
    //     }
    // });

    let index = OPEN_ROUTES.indexOf(req.path);
    if(index != -1) {
        next();
        return;
    }

    let token = req.headers?.authorization?.split(" ")[1];
    if (token && validateAuthToken(token)) {
        next();
        return;
    } else {
        res.status(401).send(new APIResponse(401, "Please provide auth token!!", null, false));
        return;
    }
}

module.exports = { intercept }