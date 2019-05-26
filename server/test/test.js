require("dotenv").config();
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
var assert = require('assert');
let server = 'localhost:3000'
let should = chai.should();

//Apply http request to cahi
chai.use(chaiHttp);

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


//Example Login test case sets
describe('Login', () => {
    //Example of testing Login with correct user detail
    it('correct user detail', (done) => {
        let body = {
            username: "n10050256@qut.edu.au",
            password: "abcd1234",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(200); // acceptance criteria
                res.body.should.have.property('auth').eql(true);  // acceptance criteria
                done();
            });
    });

    it('MentorLoginTest', (done) => {
        let body = {
            username: "mentorTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(200); // acceptance criteria
                res.body.should.have.property('auth').eql(true);  // acceptance criteria
                done();
            });
    });
    it('enterPrenuesLoginTest', (done) => {
        let body = {
            username: "enterTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(200); // acceptance criteria
                res.body.should.have.property('auth').eql(true);  // acceptance criteria
                done();
            });
    });
    it('adminLoginTest', (done) => {
        let body = {
            username: "adminTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(200); // acceptance criteria
                res.body.should.have.property('auth').eql(true);  // acceptance criteria
                done();
            });
    });
    //----------------------------------------------------------------------------//
    //--------------------------- Incorrect info Test ----------------------------//
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
                // res.body.should.have.property('message').eql('passwords do not match');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('incEmailTypeLogin', (done) => {
        let body = {
            username: "n10050256@gmail.com",
            password: "abcd1234",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('incEmailSimbolLogin', (done) => {
        let body = {
            username: "n10050256#qut.edu.au",
            password: "abcd1234",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });

    it('lessEmailLogin', (done) => {
        let body = {
            username: "10050256@qut.edu.au",
            password: "abcd1234",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('incEmailLoginFSpace', (done) => {
        let body = {
            username: " n10050256@qut.edu.au",
            password: "abcd1234",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('incEmailLoginRSpace', (done) => {
        let body = {
            username: "mentorTests@qut.edu.au ",
            password: "abcd1234",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('incPasswordLogin', (done) => {
        let body = {
            username: "n10050256@qut.edu.au",
            password: "abcd12345",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('incPasswordLoginFSpace', (done) => {
        let body = {
            username: "n10050256@qut.edu.au",
            password: " abcd1234",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('incPasswordLoginRSpace', (done) => {
        let body = {
            username: "n10050256@qut.edu.au",
            password: "abcd1234 ",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('incPasswordLoginSimbol', (done) => {
        let body = {
            username: "n10050256@qut.edu.au",
            password: "abcd123#",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('lessPasswordLogin', (done) => {
        let body = {
            username: "n10050256@qut.edu.au",
            password: "bcd1234",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('lessIncSimbolPasswordLogin', (done) => {
        let body = {
            username: "n10050256@qut.edu.au",
            password: "bcd123#",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('incCapEmailLogin', (done) => {
        let body = {
            username: "N10050256@qut.edu.au",
            password: "abcd1234",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('incCapPasswordLogin', (done) => {
        let body = {
            username: "n10050256@qut.edu.au",
            password: "Abcd1234",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('Wrong Password');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });

    ////////
    it('MincEmailTypeLogin', (done) => {
        let body = {
            username: "mentorTest@gmail.com",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MincEmailSimbolLogin', (done) => {
        let body = {
            username: "mentorTest#qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });

    it('MlessEmailLogin', (done) => {
        let body = {
            username: "entorTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MincEmailLoginFSpace', (done) => {
        let body = {
            username: " mentorTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MincEmailLoginRSpace', (done) => {
        let body = {
            username: "mentorTests@qut.edu.au ",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MincPasswordLogin', (done) => {
        let body = {
            username: "mentorTest@qut.edu.au",
            password: "password",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MincPasswordLoginFSpace', (done) => {
        let body = {
            username: "mentorTest@qut.edu.au",
            password: " password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MincPasswordLoginRSpace', (done) => {
        let body = {
            username: "mentorTest@qut.edu.au",
            password: "password123 ",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MincPasswordLoginSimbol', (done) => {
        let body = {
            username: "mentorTest@qut.edu.au",
            password: "password12#",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MlessPasswordLogin', (done) => {
        let body = {
            username: "mentorTest@qut.edu.au",
            password: "assword123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MlessIncSimbolPasswordLogin', (done) => {
        let body = {
            username: "mentorTest@qut.edu.au",
            password: "assword12#",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MincCapEmailLogin', (done) => {
        let body = {
            username: "MentorTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('MincCapPasswordLogin', (done) => {
        let body = {
            username: "mentorTest@qut.edu.au",
            password: "Password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('Wrong Password');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });

    it('EntincEmailTypeLogin', (done) => {
        let body = {
            username: "enterTest@gmail.com",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntincEmailSimbolLogin', (done) => {
        let body = {
            username: "enterTest#qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntlessEmailLogin', (done) => {
        let body = {
            username: "nterTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntincEmailLoginFSpace', (done) => {
        let body = {
            username: " enterTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntincEmailLoginRSpace', (done) => {
        let body = {
            username: "enterTests@qut.edu.au ",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntincPasswordLogin', (done) => {
        let body = {
            username: "enterTest@qut.edu.au",
            password: "password",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntincPasswordLoginFSpace', (done) => {
        let body = {
            username: "enterTest@qut.edu.au",
            password: " password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntincPasswordLoginRSpace', (done) => {
        let body = {
            username: "enterTest@qut.edu.au",
            password: "password123 ",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntincPasswordLoginSimbol', (done) => {
        let body = {
            username: "enterTest@qut.edu.au",
            password: "password12#",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntlessPasswordLogin', (done) => {
        let body = {
            username: "enterTest@qut.edu.au",
            password: "assword123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntlessIncSimbolPasswordLogin', (done) => {
        let body = {
            username: "enterTest@qut.edu.au",
            password: "assword12#",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntincCapEmailLogin', (done) => {
        let body = {
            username: "EnterTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('EntincCapPasswordLogin', (done) => {
        let body = {
            username: "enterTest@qut.edu.au",
            password: "Password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('Wrong Password');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });

    var i;
    //var result = 'lessPasswordLogin';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (i = 0; i < 15; i++) {
        //(characters.charAt(Math.floor(Math.random() * charactersLength))+result
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'incEmailTypeLogin', (done) => {
            let body = {
                username: "adminTest@gmail.com",
                password: "password123",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'incEmailSimbolLogin', (done) => {
            let body = {
                username: "adminTest#qut.edu.au",
                password: "password123",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'lessEmailLogin', (done) => {
            let body = {
                username: "dminTest@qut.edu.au",
                password: "password123",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'incEmailLoginFSpace', (done) => {
            let body = {
                username: " adminTest@qut.edu.au",
                password: "password123",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'incEmailLoginRSpace', (done) => {
            let body = {
                username: "adminTests@qut.edu.au ",
                password: "password123",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'incPasswordLogin', (done) => {
            let body = {
                username: "adminTest@qut.edu.au",
                password: "password",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'incPasswordLoginFSpace', (done) => {
            let body = {
                username: "adminTest@qut.edu.au",
                password: " password123",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'incPasswordLoginRSpace', (done) => {
            let body = {
                username: "adminTest@qut.edu.au",
                password: "password123 ",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'incPasswordLoginSimbol', (done) => {
            let body = {
                username: "adminTest@qut.edu.au",
                password: "password12#",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'lessPasswordLogin', (done) => {
            let body = {
                username: "adminTest@qut.edu.au",
                password: "assword123",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'lessIncSimbolPasswordLogin', (done) => {
            let body = {
                username: "adminTest@qut.edu.au",
                password: "assword12#",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'incCapEmailLogin', (done) => {
            let body = {
                username: "AdminTest@qut.edu.au",
                password: "password123",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('should be the QUT email');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
        it(characters.charAt(Math.floor(Math.random() * charactersLength)) + 'incCapPasswordLogin', (done) => {
            let body = {
                username: "adminTest@qut.edu.au",
                password: "Password123",
            }
            chai.request(server)
                .post('/api/login/')
                .send(body)
                .end((err, res) => { //err stands for Error, res stands for response
                    res.should.have.status(401); // acceptance criteria
                    //res.body.should.have.property('message').eql('Wrong Password');
                    console.log("If I want to see the console, I will do like this")
                    console.log(res.body)
                    done();
                });
        });
    }

    it('AdincEmailTypeLogin', (done) => {
        let body = {
            username: "adminTest@gmail.com",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdincEmailSimbolLogin', (done) => {
        let body = {
            username: "adminTest#qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdlessEmailLogin', (done) => {
        let body = {
            username: "dminTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdincEmailLoginFSpace', (done) => {
        let body = {
            username: " adminTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdincEmailLoginRSpace', (done) => {
        let body = {
            username: "adminTests@qut.edu.au ",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdincPasswordLogin', (done) => {
        let body = {
            username: "adminTest@qut.edu.au",
            password: "password",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdincPasswordLoginFSpace', (done) => {
        let body = {
            username: "adminTest@qut.edu.au",
            password: " password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdincPasswordLoginRSpace', (done) => {
        let body = {
            username: "adminTest@qut.edu.au",
            password: "password123 ",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdincPasswordLoginSimbol', (done) => {
        let body = {
            username: "adminTest@qut.edu.au",
            password: "password12#",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdlessPasswordLogin', (done) => {
        let body = {
            username: "adminTest@qut.edu.au",
            password: "assword123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdlessIncSimbolPasswordLogin', (done) => {
        let body = {
            username: "adminTest@qut.edu.au",
            password: "assword12#",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdincCapEmailLogin', (done) => {
        let body = {
            username: "AdminTest@qut.edu.au",
            password: "password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('should be the QUT email');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('AdincCapPasswordLogin', (done) => {
        let body = {
            username: "adminTest@qut.edu.au",
            password: "Password123",
        }
        chai.request(server)
            .post('/api/login/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(401); // acceptance criteria
                //res.body.should.have.property('message').eql('Wrong Password');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    //----------------------------------------------------------------------------//
    //----------------------------- forgotPass Test ------------------------------//
    it('ForgotPassTest', (done) => {
        let body = {
            username: "",
            password: "",
        }
        chai.request(server)
            .post('/api/register?type=mentor/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(400); // acceptance criteria
                res.body.should.have.property('message').eql('Token not exist');
                done();
            });
    });
});

//----------------------------------------------------------------------------//
//----------------------------- Invitation Test ------------------------------//

describe('Invitation', () => {
    it('adminRegisterInviteTest', (done) => {
        let body = {
            name: "jeffrey",
            email: "adminTest@qut.edu.au",
            role: "admin",
        }
        chai.request(server)
            .post('/api/register?type=admin/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(400); // acceptance criteria
                res.body.should.have.property('message').eql('Token not exist');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });
    it('adminRegisterInviteTest', (done) => {
        let body = {
            name: "jeffrey",
            email: "adminTest@qut.edu.au",
            role: "admin",
        }
        chai.request(server)
            .post('/api/register?type=admin/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(400); // acceptance criteria
                res.body.should.have.property('message').eql('Token not exist');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });

    it('mentorRegisterInviteTest', (done) => {
        let body = {
            name: "Jeffrey",
            email: "mentorTest@qut.edu.au",
            role: "mentor",
        }
        chai.request(server)
            .post('/api/register?type=mentor/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(400); // acceptance criteria
                res.body.should.have.property('message').eql('Token not exist');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });

    it('enterpRegisterInviteTest', (done) => {
        let body = {
            name: "Jeffrey",
            email: "enterTest@qut.edu.au",
            role: "enterpreneur",
        }
        chai.request(server)
            .post('/api/register?type=enterpreneur/')
            .send(body)
            .end((err, res) => { //err stands for Error, res stands for response
                res.should.have.status(400); // acceptance criteria
                res.body.should.have.property('message').eql('Token not exist');
                console.log("If I want to see the console, I will do like this")
                console.log(res.body)
                done();
            });
    });

});

// describe('Register',() =>{ 
//     let body = {
//         email: "mentorTest@qut.edu.au",
//         password: "password123",
//         firstName: "Jeffrey",
//         lastName: "Teo",
//         dob:"1994-05-28",
//         gender:"male",
//         userId:"n9830642",
//         userType:"mentor", 
//         qutId:"9830642",
//     }
//     chai.request(server)
//         .post('/api/register/')
//         .send(body)
//         .end((err, res) => { //err stands for Error, res stands for response
//             res.should.have.status(200); // acceptance criteria
//             res.body.should.have.property('message').eql('Token not exist');
//             console.log("If I want to see the console, I will do like this")
//             console.log(res.body)
//             //res.body.should.have.property('auth').eql(true);  // acceptance criteria
//             done();
//         });
// });
