const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/server");

chai.use(chaiHttp);
const should = chai.should();

describe("Testing Product API", () => {
  let product_id;

  it("Should GET all the products from DB", (done) => {
    chai
      .request(server)
      .get("/api/get-all")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an("array");
        done();
      });
  });

  it("Should POST a new product", (done) => {
    let product = {
      name: "Keyboard",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYXa7vM3XYUn1xaI--dR1ZfyNb2Aum3zyfrg&usqp=CAU",
      description: "Keyboard bluetooth battery 24hs",
      price: 100,
    };

    chai
      .request(server)
      .post("/api/create")
      .send(product)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("_id");
        product_id = res.body._id;
        done();
      });
  });

  it("Should GET the created product by ID", (done) => {
    chai
      .request(server)
      .get(`/api/get-one/${product_id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("Keyboard");
        done();
      });
  });

  it("Should PUT the product price", (done) => {
    chai
      .request(server)
      .patch(`/api/update/${product_id}`)
      .send({
        name: "Keyboard",
        image_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYXa7vM3XYUn1xaI--dR1ZfyNb2Aum3zyfrg&usqp=CAU",
        description: "Keyboard bluetooth battery 24hs",
        price: 250,
      })
      .end((req, res) => {
        res.should.have.status(200);
        res.body.product.should.have.property("price").eql(250);
        done();
      });
  });

  it("Should DELETE product by ID", (done) => {
    chai
      .request(server)
      .delete(`/api/delete/${product_id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
