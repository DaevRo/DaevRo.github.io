// Load Cart items
// get items from local storage
let cart = JSON.parse(localStorage.getItem('cart'))
    // load cart to into page
cart.forEach((itm, idx) => {
        // create a div element for item
        let rowElm = document.createElement('div')
            // add a class to div
        rowElm.classList.add('cart-row')
            // creating an id using items name
        rowElm.id = `itemID-${itm[0]}`
            // adding these contents into the div created 
        rowElm.innerHTML = `		
		<div class="cart-item cart-column">
			<img class="item" src="${itm[0]}"></img><br>
            <span class="cart-item-title">${itm[1].replaceAll('_', " ")}</span>
        </div>
        <span class="cart-price cart-column">${itm[2]}g</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" id="valID-${itm[0]}" type="number" value="${itm[3]}" min="1" onclick="updateAmmount('valID-${itm[0]}')"><br>
            <button class="btn-danger" type="button" onclick="removeItem('itemID-${itm[0]}')">REMOVE</button>
        </div>
    `
            // add element to cart 
        document.getElementById('payment-cart-list').appendChild(rowElm)
    })
    // Calculate the total price on page load
calcPrice()
    // Remove item(s)
function removeItem(id) {
    // change id back into the original item name
    let itemName = id.slice(7)
    cart.forEach((arrItm, arrIdx) => {
            if (arrItm.includes(itemName)) {
                cart.splice(arrIdx, 1)
                if (cart.length === 0) {
                    // remove item from storage
                    localStorage.removeItem('cart')
                } else {
                    // or else update the cart in storage
                    localStorage.setItem('cart', JSON.stringify(cart))
                }

            }
        })
        // remove the id 
    document.getElementById(id).remove()
        // update price
    calcPrice()
}

function calcPrice() {
    // if cart is empty total price is 0
    let totalPrice = 0
        // if there is a cart and more than one item in cart
    if (cart && cart.length > 0) {
        // cycle thought the cart
        cart.forEach(itm => {
            // add the price of each item x by the amount of items then add to total price
            totalPrice += (+itm[2] * itm[3])
        })
    }
    // update total price
    document.getElementById('payment-total-price').textContent = `${totalPrice}g`
}

function updateAmmount(id) {
    // select element and get the name from generated id 
    let elm = document.getElementById(id)
    let name = id.slice(6)
    cart.forEach((arrItm, arrIdx) => {
            if (arrItm.includes(name)) {
                cart[arrIdx][3] = +elm.value;
            }
        })
        // calulate total price
    calcPrice()
}