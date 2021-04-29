const Brand = require('../../models/brand');
const Model = require('../../models/model');
const phoneController = {
    createBrand: (req, res) => {
        // {
        //     "brand": "brandName",
        //     "logo": "logo url"
        // }
        Brand.create(req.body).then(phone => {
            res.json(phone);
        }).catch(err => {
            res.status(500);
            res.json({
                status: 'fail',
                message: err.message || err
            });
        });
    },
    updateBrand: (req, res) => {
        // {
        //     "_id": "_id",
        //     "brand": "brandName",
        //     "logo": "logo url"
        // }
        const updateObj = {};
        if (req.body.brand) {
            updateObj.brand = req.body.brand;
        }
        if (req.body.logo) {
            updateObj.logo = req.body.logo;
        }
        Brand.updateOne({ _id: req.body._id }, updateObj, (err, ok) => {
            if (err) {
                res.status(500);
                res.json({
                    status: 'fail',
                    message: err.message || err
                });
            }
            res.json(req.body)
        });
    },
    deleteBrand: (req, res) => {
        if (req.params.id) {
            Brand.findById(req.params.id, (err, resp) => {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 'fail',
                        message: err.message || err
                    })
                }

                Brand.deleteOne({ _id: req.params.id }, (err, brandDeleted) => {
                    if (err) {
                        res.status(500);
                        res.json({
                            status: 'fail',
                            message: err.message || err
                        })
                    }

                    Model.deleteMany({ _id: { $in: resp.models } }, (err, ok) => {
                        res.json({ status: 'delete success.' });
                    });
                })

            });
        } else {
            res.status(400);
            res.json({
                status: 'fail',
                message: 'BrandId is required.'
            });
        }
    },
    createModel: (req, res) => {
        // {
        //     "brandId": "brand _id",
        //     "name": "",
        //     "image": "",
        //     "color": "",
        //     "stock": "",
        //     "price": ""
        // }
        const createObj = {
            name: req.body.name,
            image: req.body.image,
            color: req.body.color,
            stock: req.body.stock,
            price: req.body.price
        }
        Model.create(createObj).then(modelResp => {
            Brand.updateOne({ _id: req.body.brandId }, { $push: { models: modelResp } }, (err, ok) => {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 'fail',
                        message: err.message || err
                    })
                }
                res.json(modelResp);
            });
        }).catch(err => {
            res.status(500);
            res.json({
                status: 'fail',
                message: err.message || err
            });
        });
    },
    updateModel: (req, res) => {
        // {
        //     "_id": "_id",
        //     "name": "",
        //     "image": "",
        //     "color": "",
        //     "stock": "",
        //     "price": ""
        // }
        Model.updateOne({ _id: req.body._id }, {
            name: req.body.name,
            image: req.body.image,
            color: req.body.color,
            stock: req.body.stock,
            price: req.body.price
        }, (err, ok) => {
            if (err) {
                res.status(500);
                res.json({
                    status: 'fail',
                    message: err.message || err
                })
            }
            res.json(req.body);
        });
    },
    deleteModel: (req, res) => {
        if (req.params.id) {
            Model.deleteOne({ _id: req.params.id }, (err, ok) => {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 'fail',
                        message: err.message || err
                    })
                }
                res.json({ status: 'delete success.' });
            });
        } else {
            res.status(400);
            res.json({
                status: 'fail',
                message: 'modelId is required.'
            });
        }
    },
    getAll: (req, res) => {
        Brand.find().select('brand logo').exec((err, brands) => {
            if (err) {
                res.status(500);
                res.json({
                    status: 'fail',
                    message: err.message || err
                })
            }
            res.json({ brands: brands });
        });
    },
    getById: (req, res) => {
        if (req.params.id) {
            Brand.findById(req.params.id).populate('models').then(resp => res.json(resp)).catch(err => {
                res.status(500);
                res.json({
                    status: 'fail',
                    message: err.message || err
                })
            });
        } else {
            res.status(400);
            res.json({
                status: 'fail',
                message: 'brandId is required.'
            });
        }
    }
}

module.exports = phoneController;