var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("index.html", function(req, res) {
    db.Farmersmarket.findAll({}).then(function(dbFarmersmarket) {
      res.render("index", {
        msg: "Welcome!",
        Farmersmarket: dbFarmersmarket
      });
    });
  });
  app.get("/farmersmarket/:id", function(req, res) {
    db.Farmersmarket.findOne({ where: { id: req.params.id } }).then(function(dbFarmersmarket) {
      res.render("Farmersmarket", {
        Farmersmarket: dbFarmersmarket
      });
    });
  });

  app.get("/farmersmarket/:name", function(req, res) {
    db.Farmersmarket.findOne({ where: { id: req.params.name } }).then(function(dbFarmersmarket) {
      res.render("Farmersmarket", {
        Farmersmarket: dbFarmersmarket
      });
    });
  });

  
  app.get("/farmersmarket/:city", function(req, res) {
    db.Farmersmarket.findOne({ where: { id: req.params.city } }).then(function(dbFarmersmarket) {
      res.render("Farmersmarket", {
        Farmersmarket: dbFarmersmarket
      });
    });
  });
  // Load Farmersmarket page and pass in an Farmersmarket by id
  app.get("/farmersmarket/:zip", function(req, res) {
    db.Farmersmarket.findOne({ where: { id: req.params.zip } }).then(function(dbFarmersmarket) {
      res.render("Farmersmarket", {
        Farmersmarket: dbFarmersmarket
      });
    });
  });
  app.get("/farmersmarket/:rating", function(req, res) {
    db.Farmersmarket.findOne({ where: { id: req.params.rating} }).then(function(dbFarmersmarket) {
      res.render("Farmersmarket", {
        Farmersmarket: dbFarmersmarket
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
