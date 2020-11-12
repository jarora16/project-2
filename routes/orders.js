/* eslint-disable require-jsdoc */
var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var db = require("../models");

// GET: /orders
// eslint-disable-next-line no-unused-vars
router.get("/", function(_req, res, _next) {
  Order.find().then(function(orders) {
    res.render("orders/index", { orders });
  });
});

// GET: /orders/4
// eslint-disable-next-line no-unused-vars
router.get("/:id/show", function(req, res, _next) {
  // eslint-disable-next-line prefer-destructuring
  var id = req.params.id;
  Order.findOne({ _id: id }).then(function(order) {
    res.render("orders/show", { order: order });
  });
});

router.post("/", function(req, res) {
    db.Order.create(req.body).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

// POST: /orders/4/pickup
// eslint-disable-next-line no-unused-vars
router.post("/:orderId/pickup", function(req, res, _next) {
  var id = req.params.orderId;

  Order.findOne({ _id: id }).then(function(order) {
    order.status = "Shipped";
    order.notificationStatus = "Queued";

    order.save()
      .then(function() {
        // eslint-disable-next-line no-use-before-define
        return order.sendSmsNotification("Your food will be cooked and delivered in 20 minutes", getCallbackUri(req));
      })
      .then(function() {
        res.redirect(`/orders/${id}/show`);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });
});

// POST: /orders/4/deliver
// eslint-disable-next-line no-unused-vars
router.post("/:orderId/deliver", function(req, res, _next) {
  var id = req.params.orderId;

  Order.findOne({ _id: id })
    .then(function(order) {
      order.status = "Delivered";
      order.notificationStatus = "Queued";
      var savePromise = order.save();
      // eslint-disable-next-line no-use-before-define
      var smsPromise = order.sendSmsNotification("Your clothes have been delivered", getCallbackUri(req));

      return Promise.all([savePromise, smsPromise]);
    })
    .then(function() {
      res.redirect(`/orders/${id}/show`);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
});


// POST: /orders/4/status/update
// eslint-disable-next-line no-unused-vars
router.post("/:orderId/status/update", function(req, res, _next) {
  var id = req.params.orderId;

  var notificationStatus = req.body.MessageStatus;

  Order.findOne({ _id: id })
    .then(function(order) {
      order.notificationStatus = notificationStatus.charAt(0).toUpperCase() + notificationStatus.slice(1);
      return order.save();
    })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
});

// eslint-disable-next-line require-jsdoc
// eslint-disable-next-line func-style
function getCallbackUri(req) {
  // eslint-disable-next-line prefer-destructuring
  var host = req.headers.host;
  return `http://${host}/orders/${req.params.orderId}/status/update`;
}

module.exports = router;
