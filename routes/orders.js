/* eslint-disable require-jsdoc */
const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const db = require("../models");

// GET: /orders
// eslint-disable-next-line no-unused-vars
router.get("/", (_req, res, _next) => {
  Order.find().then((orders) => {
    res.render("orders/index", { orders });
  });
});

// GET: /orders/4
// eslint-disable-next-line no-unused-vars
router.get("/:id/show", (req, res, _next) => {
  // eslint-disable-next-line prefer-destructuring
  const id = req.params.id;
  Order.findOne({ _id: id }).then((order) => {
    res.render("orders/show", { order: order });
  });
});

router.post("/", (req, res) => {
  db.Order.create(req.body).then((dbOrder) => {
    res.json(dbOrder);
  });
});

// POST: /orders/4/pickup
// eslint-disable-next-line no-unused-vars
router.post("/:orderId/pickup", (req, res, _next) => {
  const id = req.params.orderId;

  Order.findOne({ _id: id }).then((order) => {
    order.status = "Shipped";
    order.notificationStatus = "Queued";

    order.save()
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        return order.sendSmsNotification("Your food will be cooked and delivered in 20 minutes", getCallbackUri(req));
      })
      .then(() => {
        res.redirect(`/orders/${id}/show`);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  });
});

// POST: /orders/4/deliver
// eslint-disable-next-line no-unused-vars
router.post("/:orderId/deliver", (req, res, _next) => {
  const id = req.params.orderId;

  Order.findOne({ _id: id })
    .then((order) => {
      order.status = "Delivered";
      order.notificationStatus = "Queued";
      const savePromise = order.save();
      // eslint-disable-next-line no-use-before-define
      const smsPromise = order.sendSmsNotification("Your clothes have been delivered", getCallbackUri(req));

      return Promise.all([savePromise, smsPromise]);
    })
    .then(() => {
      res.redirect(`/orders/${id}/show`);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});


// POST: /orders/4/status/update
// eslint-disable-next-line no-unused-vars
router.post("/:orderId/status/update", (req, res, _next) => {
  const id = req.params.orderId;

  const notificationStatus = req.body.MessageStatus;

  Order.findOne({ _id: id })
    .then((order) => {
      order.notificationStatus = notificationStatus.charAt(0).toUpperCase() + notificationStatus.slice(1);
      return order.save();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// eslint-disable-next-line require-jsdoc
// eslint-disable-next-line func-style
function getCallbackUri(req) {
  // eslint-disable-next-line prefer-destructuring
  const host = req.headers.host;
  return `http://${host}/orders/${req.params.orderId}/status/update`;
}

module.exports = router;
