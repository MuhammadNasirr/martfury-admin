import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const mongoURI =
  "mongodb+srv://test:test1234@cluster0.13uvc.mongodb.net/server?retryWrites=true&w=majority";
export const connect = () => {
  mongoose
    .connect(
      //"mongodb://127.0.0.1/ADAM",
      mongoURI,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    )
    .then(
      () => {
        console.log("connected");
      },
      (err) => {
        console.log("some error occured", err);
      }
    );
};

export default mongoose;
