import jwt from 'jsonwebtoken'
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified; // Gắn thông tin user vào req để sử dụng
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export {authenticateUser};
