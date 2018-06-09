process.env.NODE_ENV = 'local';

const   chai = require('chai'),
        chaiHttp = require('chai-http'),
        should = chai.should()


chai.use(chaiHttp);
let baseUrl = "http://localhost:8080/api"

describe("Post", () => {

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

        describe("/GET post", () => {
                it("should return a post", (done) => {
                        chai.request(baseUrl)
                                .get('/post/8')
                                .end( (err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.be.a('object');
                                        res.body.should.have.property('status').eql(true);
                                        done();
                                });
                }),

                it("should return a list of posts", (done) => {
                    chai.request(baseUrl)
                            .get('/post/100/100')
                            .end( (err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('array');
                                    done();
                            });
                }),

                it("should return a list of posts", (done) => {
                    chai.request(baseUrl)
                            .get('/post')
                            .end( (err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('array');
                                    done();
                            });
                })
        }),

        describe("/POST post", () => {

                // search for a list of posts
                it("should return a list of posts", (done) => {
                        let reqBody = {
                                page: 100,
                                limit: 100,
                                string: "abcsdsjdwoiwod"
                        }

                        chai.request(baseUrl)
                        .post('/post/search')
                        .send(reqBody)
                        .end((err, res) => {
                                if(err) {
                                        done();
                                } 
                                res.should.have.status(200);
                                res.body.should.be.a('array');
                                done();
                        })
                })

                
                // insert a new post
                it("Should return 404 as the categoryID is missing", done => {
                        login()
                        .then(data => {
                                let reqBody = {
                                        title: "Hello",
                                        content: "1",
                                        categoryID: ""
                                }
                                
                                chai.request(baseUrl)
                                .post('/post')
                                .set('x-access-token', data.token)
                                .send(reqBody)
                                .end((err, res) => {
                                        if(err) {
                                                done();
                                        } 
                                        res.should.have.status(404);
                                        res.body.should.be.a('object');
                                        res.body.should.have.property('status').eql(false);

                                        done();
                                })
                        })
                        .catch(err => {
                                done();
                        })
                })
        }),

        describe("/PUT post", () => {

                // edit a post
                it("Should return an error due to false authorization", (done) => {
                        login()
                        .then(data => {
                                let reqBody = {
                                        title: "Edited",
                                        ID: "12",
                                }

                                chai.request(baseUrl)
                                .put('/post')
                                .set('x-access-token', data.token)
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
                        })
                })
        }),

        describe("/DELETE post", () => {

                // delete a post
                it("Should return an error due to false authorization", (done) => {
                        login()
                        .then(data => {
                                chai.request(baseUrl)
                                .delete('/post/13')
                                .set('x-access-token', data.token)
                                .end((err, res) => {
                                        if(err) {
                                                done();
                                        } 
                                        res.body.should.be.a('object');
                                        res.body.should.have.property('status').eql(false);

                                        done();
                                })
                        })
                })
        })
        
       
})