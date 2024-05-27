import mongoose from "mongoose";
export const mongooseConnect = () => {
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve();
    } else {
        const uri = process.env.MONGODB_URI;
        return mongoose.connect(uri);
    }
};
