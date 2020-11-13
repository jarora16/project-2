
$(document).ready(() => {

  $("#orderBtn").on("click", () => {
    console.log("button clicked");
    testObject = {
      customerName: "Eric",
      customerPhoneNumber: "2413248",
    };
  
    $.ajax({
      type: "GET",
      url: "/api/orders",
      // data: testObject,
      success: "success",
      dataType: "json"
    });
  });
});