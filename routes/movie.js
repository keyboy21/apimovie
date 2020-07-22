var express = require('express');
var router = express.Router();

const Moovie = require("../model/Movie")


router.post('/', function (req, res, next) {
    const moovie = new Moovie(req.body)

    const promise = moovie.save()
    promise.then(data => {
        res.json(data)
    })
        .catch(err => {
            console.log(err);
        })
})


/* GET method ALLinfo________ */
router.get('/', function (req, res, next) {

    const promise = Moovie.find({});

    promise.then(moovie => {
        res.json(moovie)
    })
        .catch(err => console.log(err))

});




/* ID */
router.get('/:movie_id', function (req, res, next) {

    const promise = Moovie.findById(req.params.movie_id);

    promise.then(movie => {
        res.json(movie)
    })

        .catch(err => console.log(err))
});



/* Update */
router.put('/:movie_id', function (req, res, next) {

    const promise = Moovie.findByIdAndUpdate(req.params.movie_id, req.body);

    promise.then(movie => {
        res.json(movie)
    })

        .catch(err => console.log(err))
});


/* DELETE */
router.delete('/:movie_id', function (req, res, next) {

    const promise = Moovie.findByIdAndRemove(req.params.movie_id);

    promise.then(movie => {
        res.json(movie)
    })

        .catch(err => console.log(err))
});


/* TOP  */
router.get('/top/top10', function (req, res, next) {

    const promise = Moovie.find({}).limit(10).sort({ imd_score: -1 });

    promise.then(movie => {
        res.json(movie)
    })

        .catch(err => console.log(err))
});


/* Year */
router.get('/between/:start_year/:end_year', function (req, res, next) {

    const { start_year, end_year } = req.params
    const promise = Moovie.find({
        year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
    })

    promise.then(movie => {
        res.json(movie)
    })

        .catch(err => console.log(err))
});


module.exports = router;
