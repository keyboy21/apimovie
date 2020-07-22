const chai = require('chai')
const should = chai.should()
const chaiHTTP = require('chai-http')
const server = require('../../app')


chai.use(chaiHTTP)

let token;
describe('testdan otkazvommiza', () => {

    before((done) => {
        chai.request(server)
            .post('/aoutorihate')
            .send({ username: 'Kalish', password: '5454545' })
            .end((err, res) => {
                token = res.body.token

                done()
            })
    })

    describe('get method Movies', () => {
        it('Get method Testing MOvie page', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-accses-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done()
                })
        })
    })




    describe('/Post method', () => {
        it('api movieslani testtdan otkazvommiza', (done) => {

            const movies = {

                title: 'HUL',
                category: 'fantasy',
                country: 'USA',
                year: '2001',
                director_id: '5f0ab643b717ad1d142fa30a',
                imd_score: 12

            }

            chai.request(server)
                .post('/api/movies')
                .send(movies)
                .set('x-accses-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.property('title')
                    res.body.should.property('category')
                    res.body.should.property('country')
                    res.body.should.property('year')
                    res.body.should.property('director_id')
                    res.body.should.property('imd_score')
                    MovieID = res.body._id
                    done()
                })
        })
    })
    describe('/get method', () => {
        it('get movieslani testtdan otkazvommiza', (done) => {

            
            chai.request(server)
                .get(`/api/movies/${MovieID}`)
                .set('x-accses-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.property('title')
                    res.body.should.property('category')
                    res.body.should.property('country')
                    res.body.should.property('year')
                    res.body.should.property('director_id')
                    res.body.should.property('imd_score')
                    res.body.should.property('_id').eql(MovieID)
                    done()
                })
        })
    })

})