const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{1,}$/;
    return name && nameRegex.test(name);
};

const validateEmail = (email) => {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email && emailRegex.test(email);
};

const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phone && phoneRegex.test(phone);
};

const validatePassword = (password) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return password && passwordRegex.test(password);
};

module.exports = {
    validateName,
    validateEmail,
    validatePhone,
    validatePassword,
};
