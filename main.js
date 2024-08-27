const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('GET');
    res.status(200).end();
})

app.post('/', (req, res) => {
    console.log('POST body:', req.body);
    res.status(200).end();
})

app.post('/', (req, res) => {
    console.log('PUT');
    res.status(200).end();
})

app.get('/webhook', (req, res) => {
    console.log('GET webhook');
    res.status(200).end();
})

app.post('/webhook', (req, res) => {
    console.log('POST webhook');
    res.status(200).end();
})

app.put('/webhook', (req, res) => {
    console.log('POST webhook');
    res.status(200).end();
})

app.post('/', (req, res) => {
    console.log('POST body:', req.body);
    res.status(200).end();
})


app.post('/api/pvt/orderForms/simulation', (req, res) => {
    console.log('POST body:', req.body);
    res.status(200).end();
})

app.post('/api/pvt/orders', (req, res) => {
    console.log('POST body:', req.body);
    res.status(200).end();
})


app.post('/pvt/orderForms/simulation', (req, res) => {
    console.log('POST body:', req.body);
    res.json(
        {
            "country": "COL",
            "items": [
              {
                "id": "REFID002",
                "listPrice": 67203,
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
                "price": 67203,
                "priceTags": [],
                "priceValidUntil": "2024-10-01T22:58:28.143",
                "quantity": 1,
                "requestIndex": 0,
                "seller": "1",
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
          }
    ).status(200).end();
})

app.post('/pvt/orders', (req, res) => {
    console.log('POST /pvt/orders');
    console.log('POST body:', req.body);

    res.json({
        "isTest": true,
        "marketplaceOrderId": "1457570502001-01",
        "orderId": "7890",
        "followUpEmail": "srivas@addi.com",
        "items": [
            {
                "id": "REFID002",
                "quantity": 1,
                "seller": "1",
                "commission": 1500,
                "freightCommission": 1000,
                "price": 67200,
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
            "email": "293b18ed65644179ad712147b23a783a@ct.vtex.com.br",
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
        "shippingData": {
            "isFOB": false,
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
            "selectedAddresses": [
                {
                    "addressType": "pickup",
                    "receiverName": "Juliana",
                    "addressId": "548304ed-dd40-4416-b12b-4b32bfa7b1e0",
                    "postalCode": "19256",
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
                }
            ],
            "logisticsInfo": [
                {
                    "itemIndex": 0,
                    "selectedSla": "Curbside pickup",
                    "addressId": "548304ed-dd40-4416-b12b-4b32bfa7b1e0",
                    "selectedDeliveryChannel": "pickup-in-point",
                    "deliveryIds": [],
                    "lockTTL": "10d",
                    "shippingEstimate": "0bd",
                    "price": 0,
                    "deliveryWindow": {
                        "startDateUtc": "2024-02-08T08:00:00+00:00",
                        "endDateUtc": "2024-02-10T13:00:00+00:00",
                        "price": 0,
                        "listPrice": 0
                    }
                }
            ],
            "trackingHints": [],
            "contactInformation": []
        },
        "customData": null,
        "paymentData": null,
        "allowMultipleDeliveries": true
    }).status(200).end();
})

app.listen(port, () => {
    console.log(`Simple Server app listening on port ${port}`)
})