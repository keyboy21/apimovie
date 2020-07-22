const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Directors = require('../model/Directors');
// router.get('/', function (req, res, next) {

// });

router.post('/', (req, res, next) => {
    const directors = new Directors(req.body)

    const promise = directors.save()

    promise.then(data => res.json(data))
        .catch(err => console.log(err))
})




router.get('/', function (req, res, next) {

    const promise = Directors.find({});

    promise.then(data => res.json(data))
        .catch(err => console.log(err))

});





router.get('/', (req, res, next) => {

    const promise = Directors.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'moovies'

            }
        },
        {
            $unwind: {
                path: '$moovies',
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$moovies'

                }

            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                moovies: '$moovies',
            }

        }


    ]);

    promise.then(data => res.json(data))
        .catch(err => console.log(err))

});




/* // router.get('/:director_id', (req, res, next) => {

    // const promise = Directors.aggregate([
    //     {
    //         $match: {
    //             '_id': mongoose.Types.ObjectId(req.params.director_id)

    //         }

    //     },
    //     {
    //         $lookup: {
    //             from: 'movies',
    //             localField: '_id',
    //             foreignField: 'director_id',
    //             as: 'moovies'

    //         }
    //     },
    //     {
    //         $unwind: {
    //             path: '$moovies',
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: {
    //                 _id: '$_id',
    //                 name: '$name',
    //                 surname: '$surname',
    //                 bio: '$bio',
    //             },
    //             movies: {
    //                 $push: '$moovies'

    //             }

    //         }
    //     },
    //     // {
    //     //     $project: {
    //     //         _id: '$_id._id',
    //     //         name: '$_id.name',
    //     //         surname: '$_id.surname',
    //     //         moovies: '$moovies',
    //     //     }

    //     // } */


//     ]);

//     promise.then(data => res.json(data))
//         .catch(err => console.log(err))

// });


// UPDATE
router.put('/:directors_id', function (req, res, next) {

    const promise = Directors.findByIdAndUpdate(req.params.directors_id, req.body, {
        new: true
    })

    promise.then(directors => {
        res.json(directors)
    })

        .catch(err => console.log(err))
});





// DELETE
router.delete('/:movie_id', function (req, res, next) {

    const promise = Directors.findByIdAndRemove(req.params.movie_id);

    promise.then(directors => {
        res.json(directors)
    })

        .catch(err => console.log(err))
});



// TOP
router.get('/:director_id/top', (req, res, next) => {

    const promise = Directors.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)

            }

        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'moovies'

            }
        },
        {
            $unwind: {
                path: '$moovies',
            }
        },

        {
            $sort: {
                'moovies.imd_score': 1
            }

        },

        {
            $limit: 10

        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$moovies'

                }

            }
        },
        // {
        //     $project: {
        //         _id: '$_id._id',
        //         name: '$_id.name',
        //         surname: '$_id.surname',
        //         moovies: '$moovies',
        //     }

        // }


    ]);

    promise.then(data => res.json(data))
        .catch(err => console.log(err))

});



module.exports = router;