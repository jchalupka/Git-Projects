let credentials = {
    access_token: 'c32313df0d0ef512ca64d5b336a0d7c6',
    shopname: 'shopicruit'
}
let api = {
    callsPerSec: 2,
    limit: 250
}

let pageNum = 1;

let rp = require('request-promise')
let limit = require('simple-rate-limiter')

base_url = `https://${credentials.shopname}.myshopify.com/admin/`
count_orders_url = `${base_url}/orders/count.json?access_token=c32313df0d0ef512ca64d5b336a0d7c6`
orders_url = `${base_url}orders.json`


function getNumOrders() {
    return new Promise((resolve, reject) => {
        options = { 
            json: true,
            method: 'GET',
            uri: count_orders_url,
            resolveWithFullResponse: true
        }
        rp(options)
            .then((response) => {
                resolve(response.body.count)
            })
            .catch((err) => {
                reject(new Error('API count request failed'))
            })
    })
    
}

function doStuff(numOrders) {
    let ordersPerPage = api.limit;
    let numPages = Math.ceil(numOrders/ordersPerPage)

    return new Promise((resolve, reject) => {
        options = {
            json: true,
            method: 'GET',
            uri: orders_url,
            qs: {
                page: `${pageNum}`,
                limit: `${api.limit}`,
                access_token: `${credentials.access_token}`
            },
            resolveWithFullResponse: true
        }

        let totalMoney = 0;

        var tick = limit(function(i) {
            pageNum = i + 1
            options.qs.page = pageNum;
            //console.log(options)
            rp(options)
                .then((response) => {
                    moreMoney = calculateMoney(response.body['orders'])
                    totalMoney = (Number(totalMoney) +  Number(moreMoney)).toFixed(2)
                    console.log(totalMoney)
                })
                .catch((err) => {
                    console.log(err)
                })
        }).to(2).per(1000);

        
        for (let i = 0; i < numPages || function() { resolve(totalMoney)}(); i++) {
            tick(i);
        }

    })
}

function calculateMoney(orderJson) {
    let money = 0;

    money = orderJson
        .filter(order => order.financial_status === 'paid')
        .reduce(addMoney, 0)
        

    //console.log(orderJson[0].financial_status)

    return Number(money);
}

addMoney = (sum, next) => (Number(sum) + Number(next.total_price)).toFixed(2)

function getTotalEarned() {
    let totalEarned = 0

    var result = 
        getNumOrders()
            .then(doStuff)


    return result
}
getTotalEarned().then((value) => {
    console.log(value)
})
