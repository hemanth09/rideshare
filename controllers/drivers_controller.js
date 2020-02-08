const Driver = require("../models/driver");

module.exports = {
  index(req, res, next) {
    const { lng, lat } = req.query;
    Driver.find({
      "geometry.coordinates": {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 200000
        }
      }
    })
      .then(driver => res.send(driver))
      .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },

  edit(req, res, next) {
    const { id } = req.params;
    const props = req.body;

    Driver.findByIdAndUpdate(id, props, { new: true })
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const { id } = req.params;

    Driver.findByIdAndRemove(id)
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
