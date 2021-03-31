import mongoose from "../config/database";

const socialLoginSchema = mongoose.Schema(
  {
    id: { type: Number, default: 1, unique: true },
    isEnabled: { type: Boolean, default: true },
    socialLogins: [
      {
        id: Number,
        name: { type: String, required: true },
        appId: { type: String },
        callbackUrl: { type: String },
        isEnabled: { type: Boolean, default: false },
      },
    ],
  },

  { strict: "throw" }
);

export default mongoose.model("socialLogin", socialLoginSchema);
