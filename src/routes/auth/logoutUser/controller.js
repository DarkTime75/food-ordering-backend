const logoutUser = async (req, res) => {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while logging out" };

    res.clearCookie("access_token");

    response.hasError = false;
    response.title = "Logout Success";
    response.message = "Logged out successfully";
    return response;
};

export default logoutUser;