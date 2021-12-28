// создаем массив с товарами и каждому товару присваиваем наименование и цену
let items = [
    {name: "Galmar-MZ", price: 1800},
	{name: "Galmar-Mini", price: 3200},
	{name: "Galmar-Standart", price: 6000},
	{name: "Galmar-MAX", price: 11200},
]

// находим в верстке наши товары по id с определенным индексом и записываем туда значения из массива - название и цену
for (var i=0; i < items.length; i++) {
	index = i+1;
	document.getElementById("item-" + index + "-name").innerHTML = items[i].name;
	document.getElementById("item-" + index + "-price").innerHTML = items[i].price + " USD";
}

//находим все кнопки Купить и вешаем на каждую слушатель кликов
  var addToCartButtons = document.getElementsByClassName('btn-addToCart')
  for (var i = 0; i < addToCartButtons.length; i++) {
     	var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

function addToCartClicked(event) {
    var button = event.target; //определяем какая именно кнопка была нажата
    var index = parseInt(button.id.match(/\d+/))-1; //получаем id нажатой кнопки, извлекаем число из названия класса и получаем индекс, соответсвуюший ключу товара в массиве items
    var itemName = items[index].name;
    var itemPrice = items[index].price;
    addItemToCart(itemName, itemPrice)
    updateCartTotal()
}

function addItemToCart(itemName, itemPrice) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart__item');
    cartRow.classList.add('grid-row');
    var cartItems = document.getElementById('cartItems');
    var cartItemNames = cartItems.getElementsByClassName('cart__item-name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == itemName) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <p class="cart__item-name">${itemName}</p>
        <p class="cart__item-price">${itemPrice + " USD"}</p>
        <div class="cart__item-quantity flex-row">
            <input class="cart__item-quantity-input" type="number" min="1" value="1">
            <button class="cart__item-quantity-button btn-delete" type="button"></button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.querySelector('.btn-delete').addEventListener('click', removeCartItem)
    cartRow.querySelector('.cart__item-quantity-input').addEventListener('change', quantityChanged)
}

var removeFromCartButtons = document.getElementsByClassName("btn-delete")
for (var i = 0; i < removeFromCartButtons.length; i++) {
    var button = removeFromCartButtons[i]
    button.addEventListener('click', removeCartItem)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.querySelector('.cart__items')
    var cartRows = cartItemContainer.getElementsByClassName('grid-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart__item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart__item-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('USD', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementById('cartTotalAmount').innerText = total + " " + "USD"
}

var quantityInputs = document.getElementsByClassName('cart__item-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}