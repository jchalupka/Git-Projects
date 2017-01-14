// Read the file
let fs = require('fs');
let orderStr = fs.readFileSync('orders/orders.json', 'utf-8');

// Parse the contents of the file
let orderObj = JSON.parse(orderStr);
orderObj = orderObj['orders']
.filter(order => order.financial_status === 'paid')
.reduce((acc, cur) => {
	return (parseFloat(acc) + parseFloat((cur.total_price))).toFixed(2)
}, 0);