import { Document, model, Schema } from "mongoose";

export interface IGuild extends Document {
    _id: string;
    scripts: {
        name: string;
        script: string;
    }[];
}

const guildSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    scripts: {
        type: Array,
        default: [],
    },
});

const guilds = model<IGuild>("guilds", guildSchema);

export default guilds;
