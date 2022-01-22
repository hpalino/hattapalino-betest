import jwt from 'jsonwebtoken';

function createJwt(payload) {
    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: 86400});
}

async function verifyJwt(jwtToken) {
    return new Promise((resolve) => {
        jwt.verify(jwtToken, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                resolve([false, err]);
            } else {
                resolve([true, decoded]);
            }
        });
    });
}

export {createJwt, verifyJwt}
