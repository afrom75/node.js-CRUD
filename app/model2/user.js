const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    firstname: String,
    age: String,
    email: String,
    ville: String,
    password: String,
    confirmPassword: String
});

var schema = mongoose.Schema;

// NOTE: methods must be added to the schema before compiling it with mongoose.models()
UserSchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

var User = mongoose.model('Users', UserSchema);

module.exports = User;
