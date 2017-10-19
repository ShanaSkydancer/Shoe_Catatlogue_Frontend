//All variables needed from HTML etc
// const xhr = new XMLHttpRequest();
// const urlCall = "http://localhost:3000/api/shoes";
const urlCall = "https://codex-shoe-catalogue-api.herokuapp.com/api/shoes";
const shoeTable = document.querySelector('.shoeTable').innerHTML;
const shoeDisplay = document.querySelector('.shoeDisplay').innerHTML;
const output = Handlebars.compile(shoeDisplay);

const filterTable = document.querySelector('.filterTable').innerHTML;
const filterDisplay = document.querySelector('.filterDisplay').innerHTML;
const filterOutput = Handlebars.compile(filterDisplay);

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
    document.querySelector(".shoeTable").innerHTML = output({
        shoes: shoeData
    })
    document.querySelector(".filterTable").innerHTML = filterOutput({
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
  if(brand.value !== "" && size.value !== "" && color.value !== "" && price.vaalue !== "" && in_stock.value !== ""){
    $.ajax({
      type: "POST",
      url: urlCall,
      data: shoes,
      success: (result, reload) => {
        alert("Shoe has been added!");
        location.reload(reload);   
        }
    })
    } else{
      alert("Do not leave a field blank")
    } 
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
});

//Filter though shoes using the dropdowns and search button
$('.filterTable').on('click', (e) => {
  if (e.target.className.includes('searchButton')) {
  const filter = e.target.value;
  const brandOption = document.querySelector('#brandFilter').value;
  console.log(brandOption);
  const sizeOption = document.querySelector('#sizeFilter').value;
  console.log(sizeOption);
  // const colorOption = document.querySelector('#colorFilter').value;   
  // console.log(colorOption);

    //Brand filter
    if(brandOption !== "" && sizeOption == "Choose size"){
      $.ajax({
        url: urlCall + '/brand/' + brandOption,
        type: "GET",
        success: (shoeData, results) => {
          document.querySelector(".shoeTable").innerHTML = output({
              shoes: shoeData
          })
        }
      })
    }

    //Size filter
    else if (sizeOption !== "" && brandOption == "Choose brand"){
      $.ajax({
        url: urlCall + '/size/' + sizeOption,
        type: "GET",
        success: (shoeData, results) => {
          document.querySelector(".shoeTable").innerHTML = output({
            shoes: shoeData
          }) 
        }
      })
    }

    //Brand and size filter
    else if(brandOption !== "" && sizeOption !== ""){
      $.ajax({
        url: urlCall + '/brand/' + brandOption + '/size/' + sizeOption,
        type: "GET",
        async: true,
        dataType: "json",
        success: (shoeData, results) => {
          // if(shoesData.brand === undefined || shoesData.size === undefined){
          //   alert("Shoe brand does not exist");
          // }
          // else{ 
            document.querySelector(".shoeTable").innerHTML = output({
              shoes: shoeData
            })
          // }
        }
      })
    }
  }
});