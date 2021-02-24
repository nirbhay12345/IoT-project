
const mongoose = require('mongoose');

// USER SCHEMA / MODEL CONFIG
var relaySchema = new mongoose.Schema({
    relay: String,
    on_off: String
});
module.exports = mongoose.model('Relay', relaySchema);
