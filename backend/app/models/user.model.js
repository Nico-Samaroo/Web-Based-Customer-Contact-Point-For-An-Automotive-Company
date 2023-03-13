module.exports = mongoose => {
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");

    var schema = mongoose.Schema({
        first_name: {
            type: String,
            required: [true, "Please include your first name"],
        },
        last_name: {
            type: String,
            required: [true, "Please include your last name"],
        },
        email: {
            type: String,
            required: [true, "Please include your email"],
        },
        password: {
            type: String,
            required: [true, "Please include your password"],
        },
        tokens: [{
            token: {
                type: String,
                required: true,
            },
        }],
        admin:{
            type:Boolean,
            required:[true, "Please select admin"],
        }
    });

    //this method will hash the password before saving the user model
    schema.pre("save", async function(next) {
        const user = this;
        if (user.isModified("password")) {
            user.password = await bcrypt.hash(user.password, 8);
        }
        next();
    });

    //this method generates an auth token for the user
    schema.methods.generateAuthToken = async function() {
        const user = this;
        const token = jwt.sign({
            _id: user._id,
            name: user.name, 
            email: user.email,
            contact_no: user.contact_no,
            admin: user.admin
        },
        "secret");

        user.tokens = user.tokens.concat({ token });
        await user.save();
        return token;
    };

    //this method search for a user by email and password.
    schema.statics.findByCredentials = (email, password) => {
        const user = User.findOne({ email });
        if (!user) {
            throw new Error({ error: "Invalid login details" });
        }
        const isPasswordMatch = bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error({ error: "Invalid login details" });
        }
        return user;
    };

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("user", schema);
    return User;
};