const mongoose = require("mongoose")
bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    modifiedOn: {
        type: Date,
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    }
})


userSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.validPassword = async (password, hashed) => {
    console.log("called")
    const result = await bcrypt.compare(password, hashed)
    console.log(password, hashed)
    console.log("returning ", result)
    return result

};


const User = mongoose.model("users", userSchema)

module.exports = User