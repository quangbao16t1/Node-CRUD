import mongoose from "mongoose";

const schema = mongoose.Schema;

const roleModel = new schema({
    name: {
        type: String,
        required: true
    }
});

const RoleModel = mongoose.model("roles", roleModel);

export default RoleModel;