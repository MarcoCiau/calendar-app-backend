import { Schema, model, Types } from "mongoose";

interface Token {
    user: Types.ObjectId,
    refreshToken: string
}

const tokenSchema: Schema<Token> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    refreshToken: {
        type: String,
        required: true,
    }
});
const RefreshTokenModel = model<Token>('RefreshTokens', tokenSchema);

export default RefreshTokenModel;