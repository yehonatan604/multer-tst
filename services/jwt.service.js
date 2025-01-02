import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

const { SECRET_KEY: key } = process.env;

const generateAuthToken = (user) => {
    const { _id, isAdmin, firstName, permission, companyId } = user;
    const payloadData = { _id, isAdmin, firstName, permission, companyId };
    const token = jwt.sign(payloadData, key);
    return token;
};

const verifyToken = (tokenFromClient) => {
    try {
        const userData = jwt.verify(tokenFromClient, key);
        return userData;
    } catch (error) {
        return null;
    }
};

export { generateAuthToken, verifyToken };
