const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Automatically convert email to lowercase
        trim: true // Remove whitespace from both ends of a string
    },
    stream: {
        type: Schema.Types.ObjectId,
        ref: 'Stream', // Reference to the Stream model
        required: function() { return this.role === 'student'; } // Only required if role is student
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject', // Reference to the Subject model
        required: function() { return this.role === 'student'; } // Only required if role is student
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'student'], // Only allows these two roles
        default: 'student'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};
