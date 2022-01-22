import {createJwt} from "../util/jwt.util.js";
import { v4 as uuid } from 'uuid';

export const signIn = async (req, res) => {
    try {
        const token = createJwt({id: uuid()});
        res.json({
            accessToken: token,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
