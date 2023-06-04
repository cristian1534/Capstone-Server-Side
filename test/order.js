const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/server");

chai.use(chaiHttp);
const should = chai.should();

describe("Testing Order API", () => {
  it("Should POST a new order", (done) => {
    let order = {
      name: "Laptop HP 32ram 1Tb SSD",
      quantity: 2,
      price: 1500,
      user: "Cristian",
      address: "Odessa 65000",
    }
    chai
      .request(server)
      .post("/api/create-order")
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("Should GET all the orders in the DB", (done) => {
    chai
      .request(server)
      .get("/api/get-orders")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      })

  })
});







