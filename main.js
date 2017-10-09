const xhr = new XMLHttpRequest();
const shoeDisplay = document.querySelector('.shoeDisplay').innerHTML;
const output = Handlebars.compile(shoeDisplay);

//Bootstrap modals
$('#myModal').on('shown.bs.modal', () => {
    $('#myInput').focus()
});

//Get all shoes from the DB
$.ajax({
  type: "GET",
  url: "https://codex-shoe-catalogue-api.herokuapp.com/api/shoes"
})
.then((shoeData) => {
  console.log(shoeData);
  document.querySelector(".shoeDisplay").innerHTML = output({
      shoes: shoeData
  })
});

//Add a shoe
$('.submitButton').on('click',() => {
  
  const shoes = {
      brand: document.querySelector('#brand').value,
      size: document.querySelector('#size').value,
      color: document.querySelector('#color').value,
      price: document.querySelector('#price').value,
      in_stock: document.querySelector('#in_stock').value
  }

  $.ajax({
    type: "POST",
    url: "https://codex-shoe-catalogue-api.herokuapp.com/api/shoes",
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
    quantity.value = " ";
    alert("Shoe has been added!")
})