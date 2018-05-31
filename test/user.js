process.env.NODE_ENV = 'local';

const   chai = require('chai'),
        chaiHttp = require('chai-http'),
        should = chai.should()


chai.use(chaiHttp);
let baseUrl = "http://localhost:8080/api"

describe("User", () => {

        let login = () => {
                return new Promise( (resolve, reject) => {
                        let user = {
                                username: 'testt',
                                password: '123456'
                        }
                        chai.request(baseUrl)
                        .post('/login')
                        .send(user)
                        .end( (err, res) => {
                                if (err) {
                                        let result = new Error({
                                                status: false,
                                                message: "Cannot login"
                                        })
                                        reject(result);
                                }

                                if (res.body.status) {
                                        resolve(res.body);
                                } else {
                                        let result = new Error({
                                                status: false,
                                                message: "Cannot login"
                                        })
                                        reject(result);
                                }
                        })
                })
                
        }

        describe("/GET user", () => {
                it("should return an user", (done) => {
                        chai.request(baseUrl)
                                .get('/user/6')
                                .end( (err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.be.a('object');
                                        res.body.should.have.property('status').eql(true);
                                        done();
                                });
                })
        })
        
        describe("/POST user", () => {

                let validate = (reqBody ,done) => {
                        chai.request(baseUrl)
                        .post('/user')
                        .send(reqBody)
                        .end((err, res) => {
                                if(err) {
                                        done();
                                } 
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('status').eql(false);
                                done();
                        })
                }

                it("Should return an error because of username length", done => {
                        let reqBody = {
                                username: 'test',
                                password: '123456',
                                name: 'Test Account',
                                email: 'test@test.com'
                        }
                        validate(reqBody,done);
                })

                it("Should return an error because of missing fields", done => {
                        let reqBody = {
                                username: 'admin',
                                password: '123456'
                        }
                        
                        validate(reqBody,done);
                })
                
                it("Should return an error due to password regex", done => {
                        let reqBody = {
                                username: 'admintest',
                                password: '12 3456',
                                name: "Testing",
                                email: "test@test.com.vn"
                        }
                       
                        validate(reqBody,done);
                })

                it("Should return an error due to email format", done => {
                        let reqBody = {
                                username: 'admin',
                                password: '123456',
                                name: "Testing",
                                email: "aWrongEmail"
                        }
                       
                        validate(reqBody,done);
                })
        })

        describe("/PUT user", () => {
                let validate = (reqBody, done) => {
                        chai.request(baseUrl)
                        .put('/user')
                        .send(reqBody)
                        .end((err,res) => {
                                if(err) done();
                                res.body.should.be.a('object');
                                res.body.should.have.property('status').eql(false);
                                done();
                        })
                }

                it("Should return an error when not login", done => {
                        let reqBody = {
                                name: 'Test'
                        }
                        validate(reqBody,done);
                })

                it("Should return an error due to an invalid name", done => {
                        
                        login()
                        .then(data => {
                                let reqBody = {
                                        name: "A+B",
                                        token: data.token
                                }
                                validate(reqBody,done);
                        })
                        .catch(err => {
                                done();
                        })
                })

        })
})