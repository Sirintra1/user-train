
const Movie = require('../../models/movie');
const Seat = require('../../models/seat');
const cinemaController = {
    createMovie: (req, res) => {
        // {
        //     "detail": "detail",
        //     "type": "action",
        //     "movie": "เหินฟ้าท้านรก",
        //     "image": "jaidee",
        //     "seats": [
        //         {
        //             "name": "A",
        //             "price": 200,
        //             "type": "Deluxe",
        //             "total": 12
        //         },
        //         {
        //             "name": "B",
        //             "price": 200,
        //             "type": "Deluxe",
        //             "total": 12
        //         }
        //     ]
        // }
        let seatCreateArr = [];
        req.body.seats.forEach(seat => {
            for (let index = 1; index <= seat.total; index++) {
                let txt = index;
                if (index < 10) {
                    txt = '0' + index;
                }
                const element = {
                    name: seat.name + txt,
                    price: seat.price,
                    type: seat.type
                };

                seatCreateArr.push(Seat.create(element));
            }
        });

        return Promise.all(seatCreateArr).then(datas => {

            Movie.create({
                image: req.body.image,
                detail: req.body.detail,
                type: req.body.type,
                movie: req.body.movie,
                seats: datas
            }).then(ok => {
                res.json(ok);
            }).catch(err => {
                res.status(500);
                res.json({
                    status: 'fail',
                    message: err.message || err
                });
            });
        }).catch(err => {
            res.status(500);
            res.json({
                status: 'fail',
                message: err.message || err
            });
        });
    },
    updateMovie: (req, res) => {
        // {
        //     "_id": "6089507601651baf7e421711",
        //     "image": "jaideesdfaf",
        //     "detail": "asdfasdfasf",
        //     "type": "action",
        //     "movie": "เหินฟ้าท้านรก น้ำตกคอหมูย่าง"
        // }
        const updateObj = {};
        if (req.body.image) {
            updateObj.image = req.body.image;
        }

        if (req.body.detail) {
            updateObj.detail = req.body.detail;
        }

        if (req.body.type) {
            updateObj.type = req.body.type;
        }

        if (req.body.movie) {
            updateObj.movie = req.body.movie;
        }

        Movie.updateOne({ _id: req.body._id }, updateObj, (err, ok) => {
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
    deleteMovie: (req, res) => {
        if (req.params.id) {
            Movie.findById(req.params.id).exec((err, movie) => {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 'fail',
                        message: err.message || err
                    })
                }
                Movie.deleteOne({ _id: req.params.id }, (err, ok) => {
                    if (err) {
                        res.status(500);
                        res.json({
                            status: 'fail',
                            message: err.message || err
                        })
                    }
                    Seat.deleteMany({ _id: { $in: movie.seats } }, (err, ok) => {
                        res.json({ status: 'delete success.' });
                    });
                });
            })
        } else {
            res.status(400);
            res.json({
                status: 'fail',
                message: 'movieId is required.'
            });
        }
    },
    getMovieAll: (req, res) => {
        Movie.find().select('image detail type movie').exec((err, movies) => {
            if (err) {
                res.status(500);
                res.json({
                    status: 'fail',
                    message: err.message || err
                })
            }

            res.json({ movies: movies });
        });
    },
    getMovieById: (req, res) => {
        if (req.params.id) {
            Movie.findById(req.params.id).populate({
                path: 'seats',
                options: { sort: { name: 1 } }
            }).exec((err, movie) => {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 'fail',
                        message: err.message || err
                    })
                }

                res.json(movie);
            });
        } else {
            res.status(400);
            res.json({
                status: 'fail',
                message: 'movieId is required.'
            });
        }
    },
    addSeat: (req, res) => {
        // {
        //     "movieId": "movie _id",
        //     "name": "A012",
        //     "price": 240,
        //     "type": "super special"
        // }
        const seat = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type
        };
        Seat.create(seat).then(ok => {
            Movie.updateOne({ _id: req.body.movieId }, { $push: { seats: ok } }, (err, success) => {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 'fail',
                        message: err.message || err
                    })
                }

                res.json(ok);
            });
        }).catch(err => {
            res.status(500);
            res.json({
                status: 'fail',
                message: err.message || err
            })
        });
    },
    updateSeat: (req, res) => {
        // {
        //     "name": "A012",
        //     "price": 240,
        //     "type": "super special",
        //     "_id": "60895281e572fd82a5f56afb"
        // }
        Seat.updateOne({ _id: req.body._id }, { name: req.body.name, price: req.body.price, type: req.body.type }, (err, ok) => {
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
    deleteSeat: (req, res) => {
        if (req.params.id) {
            Seat.deleteOne({ _id: req.params.id }, (err, ok) => {
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
                message: 'seatId is required.'
            });
        }
    }
}

module.exports = cinemaController;