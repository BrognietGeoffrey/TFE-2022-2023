exports.accessPublic = (req, res) => {
    res.status(200).send("Public Content.");
}

exports.accessUser = (req, res) => {
    res.status(200).send("User Content.");
}

exports.accessModerator = (req, res) => {
    res.status(200).send("Moderator Content.");
}

exports.accessAdmin = (req, res) => {
    res.status(200).send("Admin Content.");
}
