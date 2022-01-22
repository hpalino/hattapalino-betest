import {verifyJwt} from "../util/jwt.util.js";

const jwtValidation = async (req, res, next) => {
    const tokenHeader = req.headers['x-access-token'];
    if (!tokenHeader) {
        return res.status(403).send({
            auth: false,
            message: "Error",
            errors: "Token not found"
        });
    }

    const response = await verifyJwt(tokenHeader);
    if (!response[0]) {
        return res.status(403).send({
            auth: false,
            message: "Error",
            errors: response[1],
        });
    }
    next();
}

export default jwtValidation;
