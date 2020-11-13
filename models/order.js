// eslint-disable-next-line no-unused-vars
const twilio = require("twilio");

// eslint-disable-next-line no-unused-vars
module.exports = function(sequelize, DataTypes) {
// eslint-disable-next-line no-undef
  const Order = sequelize.define("Order", {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // status: { 
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: "Ready" },
    // notificationStatus: { type: DataTypes.STRING,
    //   defaultValue: "Pending" },
  });

  Order.prototype.sendSmsNotification = function(message, statusCallback) {
    if (!statusCallback) {
      throw new Error("status callback is required to send notification.");
    }

    // eslint-disable-next-line no-undef
    const client = twilio(config.twilioAccountSid, config.twilioAuthToken);
    // eslint-disable-next-line consistent-this
    const self = this;
    const options = {
      to: self.customerPhoneNumber,
      // eslint-disable-next-line no-undef
      from: config.twilioPhoneNumber,
      body: message,
      statusCallback: statusCallback,
    };

    return client.messages.create(options)
      .then((message) => {
      // eslint-disable-next-line no-console
        console.log("Message sent to " + message.to);
      });
  
  };
  return Order;
};
