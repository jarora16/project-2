
// $(document).ready(() => {

//   $("#orderBtn").on("click", () => {
//     console.log("button clicked");
//     testObject = {
//       customerName: "Eric",
//       customerPhoneNumber: "2413248"
//     };

    $.ajax({
      type: "POST",
      url: "/api/orders/",
      data: testObject,
      success: "success",
      dataType: json,
    });

//     // $.post( "ajax/api/orders.html", ( data ) => {
//     //   $( ".result" ).html( data );
//     // });

//     // eslint-disable-next-line no-unused-vars
//     // function getPosts(category) {
//     //   let categoryString = category || "";
//     //   if (categoryString) {
//     //     categoryString = "/category/" + categoryString;
//     //   }
//     //   $.get("/api/posts" + categoryString, (data) => {
//     //     console.log("Posts", data);
//     //     posts = data;
//     //     if (!posts || !posts.length) {
//     //       displayEmpty();
//     //     }
//     //     else {
//     //       initializeRows();
//     //     }
//     //   });
//     // }

//     // eslint-disable-next-line no-unused-vars
//     // function Post(_testObject) {
//     //   $.ajax({
//     //     method: "POST",
//     //     url: "/api/orders/",
//     //   })
//     //     .then(() => {
//     //       getPost(postCategorySelect.val());
//     //     });
//     // }

//     // $.ajax({
//     //   method: "POST",
//     //   data: testObject,
//     //   url: "/api/orders/",
//     //   headers: {
//     //     Accept: "application/json, text/javascript, */*",
//     //     "Access-Control-Allow-Origin": "*"
//     //   }
//     // });
    
//   });



// });
