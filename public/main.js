var form = $('.input-form');
var results = $('.results');

form.on("submit", function (e) {
    e.preventDefault();

    $.ajax({
        url: '/search',
        method: 'POST',
        data: form.serialize(),
        dataType: 'json',
        success: function (data) {
            Load_products(data);
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    })
});

function Load_products(products) {
    console.log(products);
    results.html('');

    products.forEach(function (product) {
        var item = document.createElement('div');
        item.classList.add('results_item');

        var item_title = document.createElement('h3');
        item_title.classList.add('item_title');
        item_title.textContent = product.name;

        var item_price = document.createElement('div');
        item_price.classList.add('item_price');
        item_price.textContent = product.price + ' тг.';

        item.appendChild(item_title);
        item.appendChild(item_price);
        results.append(item);
    })
}