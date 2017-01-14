/*
You're a successful Shopify merchant! You've been busy promoting your store, 
and in the whirlwind of marketing, dealing with suppliers, and shipping 
orders—you've completely forgotten to count all your hard-earned money. Write a 
program that calculates your total order revenue, including shipping and taxes. 
You can access your orders with this link.
Keep in mind there are multiple pages of results! A description of the data for 
each order is available in the Shopify API documentation here.
*/

let request = require('request');
var limit = require('simple-rate-limiter');

// forget about making it look nice let's just make it work

function orderSum() {
    let options = {
        json: true
    };
    request('https://shopicruit.myshopify.com/admin/orders/count.json?&access_token=c32313df0d0ef512ca64d5b336a0d7c6',options,
        function(err, resp, body) {
            if (err) { console.log(error) }
            else {
                processOrders(0, body.count);
            }
        });
}

/*
    Process all of the orders.
    Initialy, current order is set to 0.
 */
function processOrders(orderIndex, totalOrders) {
    function _processOrders(orderIndex, totalOrders) {
        let PAGE_MAX = 250; // 1-250

        // process this page
        let currentPage = (orderIndex / PAGE_MAX) + 1;
        console.log(currentPage);

        let pageFunds = processPage(currentPage, PAGE_MAX);

        // If there are more orders than will fit on a page call the function again
        if (totalOrders - orderIndex > PAGE_MAX) {
            let newIndex = orderIndex + PAGE_MAX;
            totalFunds = _processOrders(newIndex, totalOrders);
        }
    }

    _processOrders(orderIndex, totalOrders);    
}

function processPage(pageNumber, PAGE_MAX) {
    let options = {
        json: true
    };

    limit(request('https://shopicruit.myshopify.com/admin/orders.json?&page=' + pageNumber + '&limit=' + PAGE_MAX + '&access_token=c32313df0d0ef512ca64d5b336a0d7c6', options,
        function(err, resp, body){
            if (err) {console.error(err);}
            else {
                console.log(body);
                calculateMoney(body['orders']);
            }
        })).to(2).per(1000);
}

function calculateMoney(orderjson) {
    if (!orderjson) return;
    money = orderjson
        .filter(order => order.financial_status === 'paid')
        .reduce((acc, cur) => {
            return (parseFloat(acc) + parseFloat((cur.total_price))).toFixed(2)
        }, 0)
    console.log(money);
    money = Number(parseFloat(money).toFixed(2));
    bank.addMoney(money);
    
    console.log(bank.money.toFixed(2));
}

class orderHistory {
    constructor() {
        this.money = 0;
    };

    addMoney(amount) {
        this.money += Number(amount.toFixed(2));
    }
}

let bank = new orderHistory();
orderSum();
