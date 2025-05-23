// src/utils/validators.js
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

module.exports = { validateEmail };