require("dotenv").config();
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
var assert = require('assert');
let server = 'localhost:3000'
let should = chai.should();

//Apply http request to cahi
chai.use(chaiHttp);


//Example Login test case sets
describe('Login', () => {
    //Example of testing Login with correct user detail
    it('correct user detail', (done) => {
        let body = {
            username: "n10050256@qut.edu.au",
            password: "qwefqwerfqwef",
        }
        // request POST /api/login/ with body valurable
        // username: "n10050256@qut.edu.au",
        // password: "qwefqwerfqwef",
        // Detail documentation of API is in the link below
        // https://documenter.getpostman.com/view/2992957/S11Huz7y#8c0ccf67-d079-4433-94d9-cbb9d780e62c
        // This is the expected response  
        //{
        //     "auth": true,
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im4xMDA1MDI1NkBxdXQuZWR1LmF1IiwiaWF0IjoxNTUzMTM5NzY0LCJleHAiOjE1ODQ2NzU3NjR9.1tEAOMg2pkq6i7Mporsx5myoxo1AYJguNsri_4uzz0s",
        //     "message": "n10050256@qut.edu.au login successful"
        // }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(200); // acceptance criteria
                res.body.should.have.property('auth').eql(true);  // acceptance criteria
                done();
            });
    });
    it('Incorrect user detail', (done) => {
        let body = {
            username: "n10050256@qut.edu.au",
            password: "incorrectpaswrodhjahah",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                res.body.should.have.property('message').eql('passwords do not match');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });


});
