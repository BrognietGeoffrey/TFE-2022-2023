const db = require("../models");
const Op = db.Sequelize.Op;
const { Comments } = require("../models");

// Create and Save a new Comment
const createComment = (req, res) => {
    data = req.body
    // Create a comment
    const comment = {
        comments: data.comments,
        user_id: data.user_id,
        facturier_id: data.facturier_id
    };

    // Save comment in the database
    Comments.create(comment)
        .then(data => {
        res.send(data);
        }
        )
        .catch(err => {
        res.status(409).send({
            message:
            err.message || "Some error occurred while creating the comment."
        });
        }
        );
}

const getAllComments = (req, res) => {
    Comments.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(409).send({
            message:
            err.message || "Some error occurred while retrieving comments."
        });

        });
    }



module.exports = {
    createComment, 
    getAllComments
}
    
        