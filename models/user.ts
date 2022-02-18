import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

interface User {
    name: string,
    email: string,
    password: string
}

interface UserDocument extends User, Document {
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<UserDocument> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.methods.toJSON = function () {
    const { password, __v, ...user } = this.toObject();
    return user;
}

userSchema.methods.comparePassword = async function (password: string = '') {
    try {
        if (!password) {
            return false;
        }
        const isAValidPassword: boolean = await bcrypt.compare(password, this.password);
        return isAValidPassword;
    } catch (error) {
        throw new Error(`Compare Password failed. ${error}`);
    }
}

const UserModel = model<UserDocument>('Users', userSchema);

export default UserModel;