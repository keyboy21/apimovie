const chai = require('chai')
const should = chai.should()
const chaiHTTP = require('chai-http')
const server = require('../../app')

chai.use(chaiHTTP)
 

describe('Home Page Testing', ()=>{
    it('Get method Testing Page', (done) =>{
        chai.request(server)
        .get('/')
        .end((err,res) =>{
            res.should.have.status(200)
            done()
        })
    })
})