const getLastName = (username) => {
    const nameParts = username.trim().split(' ');
    return nameParts[nameParts.length - 1];
};

export default getLastName;
