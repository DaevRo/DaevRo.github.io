// add items to cart local + storage

let cart = JSON.parse(localStorage.getItem('cart'))

function addToCart(imagesrc, itm, price) {

    let cart = JSON.parse(localStorage.getItem("cart"));
    // if cart does'nt exist or is pulled from storage
    if (!cart) {
        //create new cart and input imagesource, item, price, and item quantity
        let cart = [
            [imagesrc, itm, price, 1]
        ];
        //push the cart to storage
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);

    } else {

        let searchIdx = null
        cart.forEach((arrItm, arrIdx) => {
            if (arrItm[0] === itm) {
                searchIdx = arrIdx
            }
        });

        if (searchIdx !== null) {
            cart[searchIdx][2] += 1
        } else {
            // add item to cart
            cart.push([imagesrc, itm, price, 1]);
        }
        //send the cart to local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
    }
}