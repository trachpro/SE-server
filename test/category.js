process.env.NODE_ENV = 'local';

const   chai = require('chai'),
        chaiHttp = require('chai-http'),
        should = chai.should()


chai.use(chaiHttp);
let baseUrl = "http://localhost:8080/api"

describe("Category", () => {

        describe("/GET category", () => {
                it("should return a list of categories", (done) => {
                        chai.request(baseUrl)
                                .get('/category')
                                .end( (err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.be.a('array');
                                        done();
                                });
                })
        })
})