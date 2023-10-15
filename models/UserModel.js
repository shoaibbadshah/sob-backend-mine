var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },

    isPaid: { type: Boolean, required: false, default: false },

    status: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

// Virtual for user's full name
// UserSchema.virtual("fullName").get(function () {
//   return this.firstName + " " + this.lastName;
// });

module.exports = mongoose.model("User", UserSchema);
