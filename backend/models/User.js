const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name: {
type: String,
required: true
},

email: {
type: String,
required: true,
unique: true
},

password: {
type: String,
required: true
},

// KTP Verification
ktp: {
type: String,
default: null
},

isVerified: {
type: String,
enum: ['unverified', 'pending', 'confirmed', 'rejected'],
default: 'pending'
},

// WhatsApp Owner
whatsapp: {
type: String,
default: ''
},

// Bank Information
bankName: {
type: String,
default: ''
},

accountNumber: {
type: String,
default: ''
},

accountHolder: {
type: String,
default: ''
},

// QRIS Image URL / Filename
ownerQR: {
type: String,
default: ''
}

}, { timestamps: true });

// Anti overwrite error
module.exports =
mongoose.models.User ||
mongoose.model('User', userSchema);
