window.onload = function () {
  document.getElementById("loading").style.display = "flex";

  const currentPage = window.location.pathname.split("/").pop();
  let loadingDuration = 2000;

  if (currentPage === "info.html") {
    loadingDuration = 200;
  }

  setTimeout(function () {
    document.getElementById("loading").style.display = "none";
  }, loadingDuration);
};

const size = $(".slider .setting").outerWidth(true);

$(".slider").animate({ left: -size }, 0);
$(".top a").slideUp(0);

let flag = true;

$(".slider .icons").on("click", function () {
  if (flag == true) {
    $(".slider").animate({ left: 0 }, 500, function () {
      $(".top a").slideDown(300);
    });
    $("#tabs").addClass("d-none");
    $("#bigX").removeClass("d-none");
    flag = false;
  } else {
    flag = true;
    $(".slider").animate({ left: -size }, 500);
    $(".top a").slideUp(300);
    $("#bigX").addClass("d-none");
    $("#tabs").removeClass("d-none");
  }
});

let res;
let data;

// index
let input = document.getElementById("input");
if (input != null) {
  for (var i = 0; i < 25; i++) {
    getMeal();
  }
}

async function getMeal() {
  try {
    res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    data = await res.json();
    //    console.log(data);
    putPic2(input, 0);
    storingId();
  } catch (error) {
    console.log("Error getting meals");
  }
}

// search
let inputSearch = document.getElementById("input-search");

let nameInput = document.getElementById("byName");
if (inputSearch != null) {
  nameInput.addEventListener("input", function () {
    getMealsByName(nameInput.value);
  });
}
let flag1 = 1;
async function getMealsByName(test) {
  res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${test}`
  );
  data = await res.json();

  for (var i = 0; i < data.meals.length; i++) {
    putPic(inputSearch, i);
    storingId();
  }
  flag1 = 0;
}

function putPic2(cartona, index) {
  if (flag1 == 1) {
    cartona.innerHTML += `<div class="col-lg-3 col-md-4 col-12 ">
        <div id="${data.meals[index].idMeal}" class="inner my-4  rounded-3 overflow-hidden position-relative">
        <img class="w-100" src="${data.meals[index].strMealThumb}" alt="">
        
        <a href="../html files/info.html"> <div  class="layer d-flex  align-items-center  ">
        <h2 class="fw-bolder">${data.meals[index].strMeal}</h2>
        </div></a>
        </div>
        </div>`;
  } else {
    cartona.innerHTML = "";
    flag1 = 1;
    cartona.innerHTML += `<div class="col-lg-3 col-md-4 col-12 ">
    <div id="${data.meals[index].idMeal}" class="inner rounded-3 overflow-hidden position-relative">
    <img class="w-100" src="${data.meals[index].strMealThumb}" alt="">
    
                                   <a href="../html files/info.html"> <div  class="layer d-flex  align-items-center  ">
                                         <h2 class="fw-bolder">${data.meals[index].strMeal}</h2>
                                         </div></a>
                                    </div>
                            </div>`;
  }
}


function putPic(cartona, index) {
  if (flag1 == 1) {
    cartona.innerHTML += `<div class="col-lg-3 col-md-4 col-12 ">
        <div id="${data.meals[index].idMeal}" class="inner my-4  rounded-3 overflow-hidden position-relative">
        <img class="w-100" src="${data.meals[index].strMealThumb}" alt="">
        
        <a href="../html files/info.html"> <div  class="layer d-flex  align-items-center  ">
        <h2 class="fw-bolder">${data.meals[index].strMeal}</h2>
        </div></a>
        </div>
        </div>`;
  } else {
    cartona.innerHTML = "";
    flag1 = 1;
    cartona.innerHTML += `<div class="col-lg-3 col-md-4 col-12 ">
    <div id="${data.meals[index].idMeal}" class="inner rounded-3 overflow-hidden position-relative">
    <img class="w-100" src="${data.meals[index].strMealThumb}" alt="">
    
                                   <a href="../html files/info.html"> <div  class="layer d-flex  align-items-center  ">
                                         <h2 class="fw-bolder">${data.meals[index].strMeal}</h2>
                                         </div></a>
                                    </div>
                            </div>`;
  }
}
let firstInput = document.getElementById("firstLetter");
if (firstInput != null) {
  firstInput.addEventListener("input", function () {
    if (firstInput.value != "") {
      getbyLetter(firstInput.value);
    } else {
      clearInfo(inputSearch);
    }
  });
}
async function getbyLetter(key) {
  res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`
  );
  data = await res.json();
  for (var i = 0; i < data.meals.length; i++) {
    putPic(inputSearch, i);
  }
  storingId();
  flag1 = 0;
}

// clear cartona
function clearInfo(cartona) {
  cartona.innerHTML = null;
}

/// info
let inputInfo = document.getElementById("info");
function storingId() {
  $(".inner").on("click", function () {
    let idz = $(this).attr("id");
    localStorage.setItem("idz", idz);
  });
}

if (inputInfo != null) {
  var idihat = localStorage.getItem("idz");
  parseInt(idihat);

  getInfo(idihat);
  
}

async function getInfo(key) {
  try {
    res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${key}`
    );
    data = await res.json();
    await printInfo(inputInfo, data);
  } catch (error) {
    console.log("error");
  }
}
async function printInfo(cartona, data) {
  cartona.innerHTML = `
        <div class="col-lg-5">
            <div class="image-container border-0 rounded-2">
                <img src="${data.meals[0].strMealThumb}" class="rounded-2 w-100 mb-4" alt="${data.meals[0].strMeal}">
                <h2 class="text-white">${data.meals[0].strMeal}</h2>
            </div>
        </div>
        
        <div class="col-lg-6 text-white">
            <div id="instructions" class="instructions">
                <h2>Instructions</h2>
                <p>${data.meals[0].strInstructions}</p>
            </div>
            
            <div  class="info">
                <p>
                    <h3>Area:<span class="fw-light h5"> ${data.meals[0].strArea}</span></h3><br>
                    <h3>Category:<span class="fw-light h5"> ${data.meals[0].strCategory}</span></h3><br>
                    <h3>Recipes:</h3>
                </p>
            </div>

            <div class="mb-3">
                <div id="recipeContainer" class="d-flex  flex-wrap gap-2 text-white">`;
  printRecipes();

  cartona.innerHTML += `
                </div>
            </div>
            <div class="buttons text-white mt-3">
            <h2 >links:</h2>
            <button class="btn btn-danger mt-2 ms-2">
                <a class="text-white fs-5" href="${data.meals[0].strYoutube}">Youtube</a>
            </button>
            <button class="btn btn-success mt-2 ms-2">
                <a class="text-black fs-5" href="${data.meals[0].strSource}">Sources</a>
            </button>
            </div>
        </div>`;
}
function printRecipes() {
  let recipeContainer = document.getElementById("recipeContainer");
  // Loop through the ingredients and measurements
  for (let i = 1; i <= 20; i++) {
    // Assuming there are 20 possible ingredients
    const ingredient = data.meals[0][`strIngredient${i}`];
    const measure = data.meals[0][`strMeasure${i}`];

    // Check if both ingredient and measure are not empty
    if (ingredient && measure) {
      recipeContainer.innerHTML += `
                <span class="recipes badge bg-info float-end w-25 text-dark">${measure} ${ingredient}</span>`;
    }
  }
}

//   categories

let categories = document.getElementById("categories");
if (categories != null)
    {

        getCategories();
    }
async function getCategories() {

  try {
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    data = await res.json();
    printCategory(data.categories);
    storingId();
    

  } catch (error) {
    console.log("error loading categories");
  }
}

function printCategory(cat) {
  for (var i = 0; i < cat.length; i++) {
    categories.innerHTML += `<div class="col-lg-3 col-md-4 col-12 ">
            <div id="${cat[i].strCategory}" class="inner my-4  rounded-3 overflow-hidden position-relative">
            <img class="w-100" src="${cat[i].strCategoryThumb}" alt="">
            
            <a href="../html files/filterCat.html"> 
                <div  class="layer d-flex flex-column align-items-center justify-content-center text-center  ">
                    <h2 class="fw-bolder">${cat[i].strCategory}</h2>
                    <p>${cat[i].strCategoryDescription
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}</p>
                </div>
            </a>
            </div>
            </div>`;
  }
}

let filterdCategories = document.getElementById("filterdCategories");
if(filterdCategories != null)
    {
        printFilterCat();
    }
    async function printFilterCat (){
        try {
        let name = localStorage.getItem("idz");
        
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
        data = await res.json();
        for( i =0 ; i<data.meals.length ; i++)
            {
                putPic(filterdCategories, i);
            }
            storingId();
    } catch (error) {
        console.log("error loading filtered categories");
        
    }
}

//area
let inputArea = document.getElementById("inputArea");
if (inputArea != null)
{
    getAreas();
}

async function getAreas (){
    try {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        data = await res.json();
        printArea(data.meals);
        storingId();
    } catch (error) {
        console.log("error geting areas");
    }
}


function printArea(data){
    for(i=0 ; i<29; i++)
        {
            inputArea.innerHTML+=`
            <div class="col-lg-3 col-md-4 col-12 overflow-hidden rounded-4">
                    <div class="inner border-0 rounded-2" id="${data[i].strArea}">
                        <div class="image-container border-0 rounded-2 flex-column mt-2 d-flex text-center g-4">
                           <a href="../html files/filtered Area.html" class="text-white " >  
                           <i class="fas big fa-house-laptop" ></i> 
                           <h2>${data[i].strArea}</h2>
                           </a>
                        </div>
                    </div>
            </div>

            `
        }
}

let filteredArea = document.getElementById("filteredArea");
if(filteredArea != null)
{
    printFilterArea();
}
async function printFilterArea () {
    try {
       let name = localStorage.getItem("idz");
        
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
        data = await res.json();
        for( i =0 ; i<data.meals.length ; i++)
            {
                putPic(filteredArea, i);
            }
            storingId();
        
    } catch (error) {
        console.log("error loading filtered area");
    }
    
}


// Ingredients
let Ingredients = document.getElementById("Ingredients");
if (Ingredients != null)
{
    getIngredients(); 
}
async function getIngredients (){
    try {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        data = await res.json();
        printIngredients(data.meals);
        storingId();
    } catch (error) {
        console.log("error geting Ingredients");
    }
}


function printIngredients(data){
    for(i=0 ; i<25; i++)
        {
            Ingredients.innerHTML+=`
            <div class="col-lg-3 col-md-4 col-12 overflow-hidden rounded-4">
                    <div class="inner border-0 rounded-2" id="${data[i].strIngredient}">
                        <div class="image-container border-0 rounded-2 flex-column mt-2 d-flex text-center g-4">
                           <a href="../html files/filtered ingredients.html" class="text-white " >  
                          <i class="fa-solid big fa-drumstick-bite"></i>
                           <h2>${data[i].strIngredient}</h2>
                           <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                           </a>
                        </div>
                    </div>
            </div>

            `
        }
}
let filteredIngredients = document.getElementById("filteredIngredients");
if(filteredIngredients != null)
{
    printFilterIngredients();
}
async function printFilterIngredients() {
    try {
       let name = localStorage.getItem("idz");
        
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
        data = await res.json();
        for( i =0 ; i<data.meals.length ; i++)
            {
                putPic(filteredIngredients, i);
            }
            storingId();
        
    } catch (error) {
        console.log("error loading filtered Ingredients");
    }
    
}


submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}