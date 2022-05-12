import mongoose from "mongoose";

const connectDatabase = () => {
    //    const mongoDbUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    const url = "mongodb+srv://quangbao:M4Lfq28EW6COSVGw@cluster0.acspo.mongodb.net/UserModel?retryWrites=true&w=majority";
    console.log(`Connecting to ${url}`);
    mongoose.Promise = global.Promise;
    // Connecting to the database
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //   useCreateIndex: true,
        //   useFindAndModify: false,
    })
        .then(() => {
            console.log("Successfully connected to the database");
        })
        .catch((err) => {
            console.log(`Could not connect to the database. Exiting now...\n${err}`);
            process.exit();
        });
};


export default connectDatabase;