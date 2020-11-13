const express = require("express");
const router = express.Router();
const db = require("../models");
const twilio = require("../services/twilio");

// GET: /orders
// eslint-disable-next-line no-unused-vars
router.post("/", (req, res) => {
  console.log("new order", req.body);
  db.Order.create().then((orders) => {
    res.json(orders);
    twilio.sendMessage({
      customerPhoneNumber:req.body. customerPhoneNumber,
      customerName:"Customer", 
      message:"Welcome brown bag! We look forward to serving you! Your table is ready now. Please proceed to table 12. Then when you are ready to eat please place your order on the app and our chefs will be happy to prepare it for you.Powered by Twilio."});
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
        return order.sendSmsNotification("Your order will be ready in 20 minutes", getCallbackUri(req));
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
      const smsPromise = order.sendSmsNotification("Your food is ready for pickup", getCallbackUri(req));

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

  Order.findOne({_id: id})
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

function getCallbackUri(req) {
  const host = req.headers.host;
  return `http://${host}/orders/${req.params.orderId}/status/update`;
}

module.exports = router;