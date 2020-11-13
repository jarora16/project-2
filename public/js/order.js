
$(document).ready(() => {

  $("#orderBtn").on("click", () => {
    console.log("Welcome brown bag! We look forward to serving you! Your table is ready now. Please proceed to table 12. Then when you are ready to eat please place your order on the app and our chefs will be happy to prepare it for you.Powered by Twilio.");
    testObject = {
      customerName: "Customer",
      customerPhoneNumber: "1234567890"
    };
  
    $.ajax({
      type: "POST",
      url: "/api/orders",
      data: testObject,
      success: "success",
      dataType: "json"
    });
  });
});