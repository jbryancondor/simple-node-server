const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const winston = require('winston')
const { v4: uuid } = require('uuid');

const app = express()
const port = 3000

const logger = winston.createLogger({
    level: 'info',
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        // winston.format.prettyPrint()
    ),

    transports: [
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console()
    ],
});

app.get('/webhook-raw', bodyParser.raw({ type: 'application/json' }), (req, res) => {
    console.log('webhook-raw', req.body);
    res.status(200).end();
})


app.post('/webhook-raw', bodyParser.raw({ type: 'application/json' }), (req, res) => {
    console.log('webhook-raw', req.body);
    res.status(200).end();
})

app.use(cors());
app.use(bodyParser.json())

app.use((req, res, next) => {
    const httpVersion = req.httpVersion;
    const hostname = req.headers.host;
    const method = req.method;
    const path = req.url;
    const fullPath = `${method} ${hostname}${path} HTTP/${httpVersion}`;

    let originalSend = res.send;

    const { headers, body, params, statusCode, query } = req;
    logger.info(fullPath, { type: 'REQUEST', headers, body, params, query, statusCode });

    res.send = function (data) {
        logger.info(fullPath, { type: 'RESPONSE', body: JSON.parse(data) });
        logger.warn(`----------------------------------------`);
        return originalSend.call(this, data);
    };

    next();
});


app.get('/', (req, res) => {
    res.json({ status: "OK" }).status(200).end();
})

app.post('/', (req, res) => {
    res.status(200).end();
})

app.get('/webhook', (req, res) => {
    res.status(200).end();
})

app.post('/webhook', (req, res) => {
    res.status(200).end();
})

app.put('/webhook', (req, res) => {
    res.status(200).end();
})


app.post('/pvt/orderForms/simulation', (req, res) => {
    const body = req.body;

    const MARKETPLACE_RESPONSABLE_FOR_PROCESSING_PAYMENTS = null;

    res.json({
        "country": "COL",
        "items": [
            {
                "id": body.items[0].id,
                "listPrice": body.items[0].listPrice,
                "measurementUnit": "un",
                "merchantName": MARKETPLACE_RESPONSABLE_FOR_PROCESSING_PAYMENTS,
                // "offerings": [
                //     {
                //         "type": "Warranty",
                //         "id": "5",
                //         "name": "1 year warranty",
                //         "price": 10000
                //     }
                // ],
                "price": 85000,
                "priceTags": [],
                "priceValidUntil": "2024-12-01T22:58:28.143",
                "quantity": body.items[0].quantity,
                "requestIndex": 0,
                // "seller": body.items[0].seller,
                "seller": "bcdwoocommerceseller",
                "unitMultiplier": 1
            }
        ],
        "logisticsInfo": [
            {
                "itemIndex": 0,
                "quantity": 2,
                "shipsTo": [
                    "COL"
                ],
                "slas": [
                    {
                        "id": "bcd pickup",
                        "deliveryChannel": "pickup-in-point",
                        "name": "bcd pickup",
                        "shippingEstimate": "0bd",
                        "price": 0,
                        "availableDeliveryWindows": [
                            {
                                "startDateUtc": "2024-11-05T08:00:00+00:00",
                                "endDateUtc": "2024-11-25T13:00:00+00:00",
                                "price": 0
                            }
                        ],
                        "pickupStoreInfo": {
                            "isPickupStore": true,
                            "friendlyName": "bcd store friendly name",
                            "address": {
                                "addressType": "pickup",
                                "receiverName": "Raul Entregas",
                                "addressId": "548304ed-dd40-4416-b12b-4b32bfa7b1e0",
                                "postalCode": "110110",
                                "city": "Bogotá DC",
                                "state": "Bogotá",
                                "country": "COL",
                                "street": "Calle 93",
                                "number": "18",
                                "neighborhood": "El chicó",
                                "complement": "Loja 10",
                                "reference": "Next to the unicorn statue",
                                "geoCoordinates": [
                                    4.678248,
                                    -74.054796
                                ]
                            },
                            "additionalInfo": ""
                        }
                    },
                    {
                        "id": "bcd delivery",
                        "deliveryChannel": "delivery",
                        "name": "bcd delivery",
                        "shippingEstimate": "0bd",
                        "price": 0,
                        "availableDeliveryWindows": [
                            {
                                "startDateUtc": "2024-11-08T08:00:00+00:00",
                                "endDateUtc": "2024-11-10T13:00:00+00:00",
                                "price": 0
                            }
                        ],
                        "pickupStoreInfo": null
                    }
                ],
                "stockBalance": 250,
                "deliveryChannels": [
                    {
                        "id": "delivery",
                        "stockBalance": 120
                    },
                    {
                        "id": "pickup-in-point",
                        "stockBalance": 130
                    }
                ]
            }
        ],
        "postalCode": "110110",
        "allowMultipleDeliveries": true
    }).status(200).end();
})

app.post('/pvt/orders', (req, res) => {
    const MARKETPLACE_RESPONSABLE_FOR_PROCESSING_PAYMENTS = null;
    const { marketplaceOrderId, clientProfileData: { email }, shippingData, items, customData } = req.body[0];

    const result = {
        // "marketplaceOrderId": marketplaceOrderId,
        // "orderId": uuid(),
        // "followUpEmail": "srivas@addi.com",
        // "items": [
        //     {
        //         "id": items[0].id,
        //         "quantity": items[0].quantity,
        //         "seller": items[0].seller,
        //         "commission": items[0].commission,
        //         "freightCommission": items[0].freightCommission,
        //         "price": items[0].price,
        //         "bundleItems": [],
        //         "itemAttachment": {
        //             "name": null,
        //             "content": {}
        //         },
        //         "attachments": [],
        //         "priceTags": [],
        //         "measurementUnit": "un",
        //         "unitMultiplier": 1,
        //         "isGift": false
        //     }
        // ],
        // "clientProfileData": {
        //     "email": email,
        //     "firstName": "Sergio",
        //     "lastName": "Rivas",
        //     "documentType": "cedulaCOL",
        //     "document": "30012312",
        //     "phone": "+573001231234",
        //     "corporateName": null,
        //     "tradeName": null,
        //     "corporateDocument": null,
        //     "stateInscription": null,
        //     "corporatePhone": null,
        //     "isCorporate": false,
        //     "userProfileId": null
        // },
        "shippingData": shippingData,
        // "customData": customData,
        // "paymentData": MARKETPLACE_RESPONSABLE_FOR_PROCESSING_PAYMENTS,
        // "allowMultipleDeliveries": true
    };

    res.json([result]).status(200).end();
})

app.post('/pvt/orders/:orderId/cancel', (req, res) => {
    const orderId = req.params.orderId;
    const { marketplaceOrderId } = req.body;

    const result = {
        "orderId": orderId,
        "marketplaceOrderId": marketplaceOrderId
    };
    res.status(200).json(result).end();
})

app.listen(port, () => {
    logger.info(`Simple Server app listening on port ${port}`)
})