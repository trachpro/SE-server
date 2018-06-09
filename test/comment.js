process.env.NODE_ENV = 'local';

const   chai = require('chai'),
        chaiHttp = require('chai-http'),
        should = chai.should()


chai.use(chaiHttp);
let baseUrl = "http://localhost:8080/api"

describe("Comment", () => {

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

        describe("/GET comment", () => {
                it("should return an error as id = 0", (done) => {
                    chai.request(baseUrl)
                            .get('/comment/0')
                            .end( (err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('status').eql(false);
                                    done();
                            });
            })
        }),


        describe("/POST comment", () => {
                
                // insert a new post
                it("Should return error as postID is incorrect", done => {
                        login()
                        .then(data => {
                                let reqBody = {
                                        postID: 0,
                                        content: "..."
                                }
                                
                                chai.request(baseUrl)
                                .post('/comment')
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
                        .catch(err => {
                                done();
                        })
                })
        }),

        describe("/PUT comment", () => {

                // edit a comment
                it("Should return an error due to false authorization", (done) => {
                        login()
                        .then(data => {
                                let reqBody = {
                                        ID: "6",
                                        content: "aaaa",
                                }

                                chai.request(baseUrl)
                                .put('/comment')
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
        })

        describe("/DELETE comment", () => {

                // delete a comment
                it("Should return an error due to false authorization", (done) => {
                        login()
                        .then(data => {
                                chai.request(baseUrl)
                                .delete('/comment/0')
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