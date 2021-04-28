const userModel = require('../../models/user')
const userController = {

    getAll: (req, res) => {
        userModel.find().exec((err, resp) => {
            if (err) {
                res.status(500);
                res.json({
                    status: 'fail',
                    message: err.message || err
                });
            }
            res.json(resp);
        });
    },
    getById: (req, res, next) => {
        if (req.params.id) {
            req.receiveId = req.params.id
            next();
        } else {
            res.status(400);
            res.json({
                status: 'Bad Request',
                message: 'id is required'
            });
        }

    },
    create: (req, res) => {
        userModel.create(req.body).then(user => {
            res.json(user);
        }).catch(err => {
            res.status(500);
            res.json({
                status: 'fail',
                message: err.message || err
            });
        });
    },
    update: (req, res) => {
        userModel.updateOne({ _id: req.body._id }, {
            name: req.body.name,
            surname: req.body.surname,
            tel: req.body.tel,
            gender: req.body.gender
        }, (err, resp) => {
            if (err) {
                res.status(500);
                res.json({
                    status: 'fail',
                    message: err.message || err
                });
            }
            res.json(req.body);
        });
    },
    delete: (req, res) => {
        userModel.deleteOne({ _id: req.params.id }, (err, resp) => {
            if (err) {
                res.status(500);
                res.json({
                    status: 'fail',
                    message: err.message || err
                });
            }
            res.json({ status: 'delete success' });
        });
    },
    getUserDetail: (req, res) => {
        userModel.findById(req.receiveId).exec((err, resp) => {
            if (err) {
                res.status(500);
                res.json({
                    status: 'fail',
                    message: err.message || err
                });
            }
            res.json(resp)
        });
    }
};

module.exports = userController;