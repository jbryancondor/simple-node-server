const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const winston = require('winston')
const { v4: uuidv4 } = require('uuid');

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

app.use(cors());
app.use(bodyParser.json())

app.use((req, res, next) => {
    const httpVersion = req.httpVersion;
    const hostname = req.headers.host;
    const method = req.method;
    const path = req.url;
    const fullPath = `${method} ${hostname}${path} HTTP/${httpVersion}`;

    let originalSend = res.send;

    logger.info(fullPath, { type: 'REQUEST', headers: req.headers, body: req.body });

    res.send = function (data) {
        logger.info(fullPath, { type: 'RESPONSE', body: JSON.parse(data) });
        logger.warn(`----------------------------------------`);
        return originalSend.call(this, data);
    };

    next();
});


app.get('/', (req, res) => {
    logger.info(`hello word!, uuid: ${uuidv4()}`);
    res.status(200).end();
})

app.post('/', (req, res) => {
    res.status(200).end();
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

app.post('/', (req, res) => {
    res.status(200).end();
})


app.post('/api/pvt/orderForms/simulation', (req, res) => {
    res.status(200).end();
})

app.post('/api/pvt/orders', (req, res) => {
    res.status(200).end();
})


app.post('/pvt/orderForms/simulation', (req, res) => {
    const body = req.body;

    res.json({
        "country": "COL",
        "items": [
          {
            "id": body.items[0].id,
            "listPrice": 85000,
            "measurementUnit": "un",
            "merchantName": null,
            "offerings": [
              {
                "type": "Warranty",
                "id": "5",
                "name": "1 year warranty",
                "price": 10000
              }
            ],
            "price": 85000,
            "priceTags": [],
            "priceValidUntil": "2024-10-01T22:58:28.143",
            "quantity": body.items[0].quantity,
            "requestIndex": 0,
            "seller": body.items[0].seller,
            "unitMultiplier": 1
          }
        ],
        "logisticsInfo": [
          {
            "itemIndex": 0,
            "quantity": 6,
            "shipsTo": [
              "COL"
            ],
            "slas": [
              {
                "id": "Curbside pickup",
                "deliveryChannel": "pickup-in-point",
                "name": "Curbside pickup",
                "shippingEstimate": "0bd",
                "price": 0,
                "availableDeliveryWindows": [
                  {
                    "startDateUtc": "2024-02-08T08:00:00+00:00",
                    "endDateUtc": "2024-02-10T13:00:00+00:00",
                    "price": 0
                  }
                ],
                "pickupStoreInfo": {
                  "isPickupStore": true,
                  "friendlyName": "Santa Felicidade",
                  "address": {
                "addressType": "pickup",
                "receiverName": "Juliana",
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
              }
            ],
            "stockBalance": 199,
            "deliveryChannels": [
              {
                "id": "delivery",
                "stockBalance": 179
              },
              {
                "id": "pickup-in-point",
                "stockBalance": 20
              }
            ]
          }
        ],
        "postalCode": "80250000",
        "allowMultipleDeliveries": true
      }).status(200).end();
})

app.post('/pvt/orders', (req, res) => {

    const { marketplaceOrderId, clientProfileData: { email }, shippingData, items } = req.body[0];

    const result = {
        "isTest": true,
        "marketplaceOrderId": marketplaceOrderId,
        "orderId": uuidv4(),
        "followUpEmail": "srivas@addi.com",
        "items": [
            {
                "id": items[0].id,
                "quantity": items[0].quantity,
                "seller": items[0].seller,
                "commission": 1500,
                "freightCommission": 1000,
                "price": items[0].price,
                "bundleItems": [],
                "itemAttachment": {
                    "name": null,
                    "content": {}
                },
                "attachments": [],
                "priceTags": [],
                "measurementUnit": "un",
                "unitMultiplier": 1,
                "isGift": false
            }
        ],
        "clientProfileData": {
            "email": email,
            "firstName": "Sergio",
            "lastName": "Rivas",
            "documentType": "cedulaCOL",
            "document": "30012312",
            "phone": "+573001231234",
            "corporateName": null,
            "tradeName": null,
            "corporateDocument": null,
            "stateInscription": null,
            "corporatePhone": null,
            "isCorporate": false,
            "userProfileId": null
        },
        "shippingData": shippingData,
        "customData": null,
        "paymentData": null,
        "allowMultipleDeliveries": true
    };

    res.json([result]).status(200).end();
})

app.post('/pvt/orders/:orderId/cancel', (req, res) => {
    const orderId = req.params.orderId;
    console.log(`orderId: ${orderId}`)

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