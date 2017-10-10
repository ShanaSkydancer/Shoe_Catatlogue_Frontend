//All variables needed from HTML etc
const xhr = new XMLHttpRequest();
const urlCall = "http://localhost:3000/api/shoes";
// const urlCall = "https://codex-shoe-catalogue-api.herokuapp.com/api/shoes/";
const shoeTable = document.querySelector('.shoeTable').innerHTML;
const shoeDisplay = document.querySelector('.shoeDisplay').innerHTML;
const output = Handlebars.compile(shoeDisplay);
const addButton = document.querySelector('.addButton').innerHTML;
const buyButton = document.querySelector('.buyButton').innerHTML;
const editButton = document.querySelector('.editButton').innerHTML;
const deleteButton = document.querySelector('.deleteButton').innerHTML;
const searchInput = document.querySelector('.searchInput').innerHTML;
const searchButton = document.querySelector('.searchButton').innerHTML;

//Bootstrap modals
$('#myModal').on('shown.bs.modal', () => {
    $('#myInput').focus()
});

// $(document).ready(() => {
//   $("#myModal").modal();
// });

//Get all shoes from the DB
$(document).ready(() => {
  $.ajax({
    type: "GET",
    url: urlCall
  })
  .then((shoeData) => {
    console.log(shoeData);
    document.querySelector(".shoeTable").innerHTML = output({
        shoes: shoeData
    })
  });
});

//Add a shoe
$('.addButton').on('click',() => {
  
  const shoes = {
      brand: document.querySelector('#brand').value,
      size: document.querySelector('#size').value,
      color: document.querySelector('#color').value,
      price: document.querySelector('#price').value,
      in_stock: document.querySelector('#in_stock').value
  }

  $.ajax({
    type: "POST",
    url: urlCall,
    data: shoes,
    success: (err, result) => {
      console.error(err);
    },
    else(result) {
      console.log(results);
      console.log(success);
      }
  })

    brand.value = " ";
    size.value = " ";
    color.value = " ";
    price.value = " ";
    in_stock.value = " ";
    alert("Shoe has been added!");
})

//Edit a shoe
// $('.editButton').on('click', () => {
//   const $amount = $('.in_stock');
//   if ($in_stock.val().length > 0) {
//     $.ajax({
//       type: "POST",
//       url: urlCall + '/id/' + _id + '/in_stock/' + $in_stock.val()
//     }).done((ShoeData) => {
//       alert("Shoe has been updated!");
//     });
//   } else {
//     alert("Please enter stock amount!");
//   }
// });

//Buy a shoe
// $('.shoeTable').on('click', (e) => {
//   const soldShoe = e.target.value;

//   $.ajax({
//       type: "POST",
//       url: urlCall + '/sold/' + soldShoe,
//       success: (result, reload) => {
//           alert("You have purchased a shoe!")
//           location.reload(reload);
//       }
//   })
// })

//Delete a shoe
// $('.deleteButton').on('click', (e) => {
// const currentShoe = e.target.value;

//   $.ajax({
//     url: urlCall + '?' + currentShoe,
//     type: 'DELETE',
//     success: () => {
//       alert('Shoe deleted!')
//     },
//     error: (err) => {
//       console.error(err);
//     }
//   })
// });