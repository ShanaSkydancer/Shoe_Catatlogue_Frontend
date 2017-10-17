//All variables needed from HTML etc
const xhr = new XMLHttpRequest();
const urlCall = "http://localhost:3000/api/shoes";
// const urlCall = "https://codex-shoe-catalogue-api.herokuapp.com/api/shoes/";
const shoeTable = document.querySelector('.shoeTable').innerHTML;
const shoeDisplay = document.querySelector('.shoeDisplay').innerHTML;
const output = Handlebars.compile(shoeDisplay);

const filterTable = document.querySelector('.filterTable').innerHTML;
const filterDisplay = document.querySelector('.filterDisplay').innerHTML;
const filterOutput = Handlebars.compile(filterDisplay);

// const addButton = document.querySelector('.addButton').innerHTML;
// const buyButton = document.querySelector('.buyButton').innerHTML;
// const deleteButton = document.querySelector('.deleteButton').innerHTML;

//Bootstrap modals
$('#myModal').on('shown.bs.modal', () => {
    $('#myInput').focus()
});

//Get all shoes from the DB
$(document).ready(() => {
  $.ajax({
    type: "GET",
    url: urlCall
  })
  .then((shoeData) => {
    console.log(shoeData);
    document.querySelector(".filterTable").innerHTML = filterOutput({
      shoes: shoeData
    })
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
    success: (result, reload) => {
      location.reload(reload);
      // console.error(err);
    }
    // else(reload) {
    //   console.log(results);
    //   console.log(success);
    //   }
  })

    brand.value = " ";
    size.value = " ";
    color.value = " ";
    price.value = " ";
    in_stock.value = " ";
    alert("Shoe has been added!");
    location.reload(reload);
})

//Buy a shoe
$('.shoeTable').on('click', (e) => {

  if (e.target.className.includes('buyButton')) {
    const _id = e.target.value;
  
    $.ajax({
        type: "POST",
        url: urlCall + '/sold/' + _id,
        success: (result, reload) => {
            alert("You have purchased a shoe!")
            location.reload(reload);
        }
    })
  }
})

//Delete a shoe
// $('.deleteButton').on('click', (e) => {
// const currentShoe = e.target.value;

//   $.ajax({
//     url: urlCall + '?' + currentShoe,
//     type: 'DELETE',
//     success: () => {
//       alert('Shoe has been deleted!')
//     },
//     error: (err) => {
//       console.error(err);
//     }
//   })
// });

//Filter a shoe
// $('.filterButton').on('click', (e) => {
//   const currentFilter = e.target.value;
//   const dropdownBrand = document.querySelector('.dropdownBrand').innerHTML;
//   const dropdownSize = document.querySelector('.dropdownSize').innerHTML;
//   const dropdownColor = document.querySelector('.dropdownColor').innerHTML;  


// })