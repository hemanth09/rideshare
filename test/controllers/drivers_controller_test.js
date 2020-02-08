const assert = require("assert");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const Driver = mongoose.model("driver");

describe("Driver controller", () => {
  it("GET to /api/drivers find drivers in a location", done => {
    const londonDriver = new Driver({
      email: "london@test.com",
      geometry: {
        type: "Point",
        coordinates: [-73.968285, 40.785091]
      }
    });

    const manchesterDriver = new Driver({
      email: "manchester@test.com",
      geometry: {
        type: "Point",
        coordinates: [-120.8435, 45.321]
      }
    });

    Promise.all([londonDriver.save(), manchesterDriver.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-73&lat=40")
        .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].email === "london@test.com");
          done();
        });
    });
  });
  it("does post driver", done => {
    Driver.count().then(count => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end(() => {
          Driver.count().then(newCount => {
            assert(newCount === count + 1);
            done();
          });
        });
    });
  });

  it("PUT to /api/drivers/id edits an existing driver", done => {
    const driver = new Driver({ email: "t@t.com", driving: false });

    driver.save(() => {
      request(app)
        .put(`/api/drivers/${driver.id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then(driver => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it("DELETE to /api/drivers/id removes an existing driver", done => {
    const driver = new Driver({ email: "t@t.com", driving: false });

    driver.save(() => {
      request(app)
        .delete(`/api/drivers/${driver.id}`)
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then(driver => {
            assert(driver === null);
            done();
          });
        });
    });
  });
});
