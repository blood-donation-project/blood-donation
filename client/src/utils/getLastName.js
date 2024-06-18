const getLastName = (username) => {
    try {
        const nameParts = username.trim().split(' ');
        return nameParts[nameParts.length - 1];
    } catch (error) {
        console.log(error);
    }
};

export default getLastName;
