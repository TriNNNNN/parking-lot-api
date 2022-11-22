# **`Parking Lot`**  

## Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                   |
| ----------------------------- | ------------------------------------| ------------------------------------------------|
|CORS                           | Cors accepted values                | "*"                                             |
|PORT                           | Port No. of the server              | 9000                                            |
|MONGO_URI                      | Local Mongo Connection info.        | "mongodb://localhost:27017/parking_lot_dev"     |
|MONGO_CLOUD                    | Cloud Mongo Connection info.        |                                                 |

## Pre-requisites
* Install [Node.js](https://nodejs.org/en/)
* Git

## Getting started
- Clone the repository
```
git clone https://github.com/TriNNNNN/parking-lot-api.git
```
- Install dependencies
```
cd parking-lot-api
npm install
```
- Build and run the project
```
npm run dev
```


## Parking Lot Problem
The office basement has a parking lot of 120 car parking space capacity out of which 20% is reserved for differently-abled and pregnant women since its closest to the lift.
Reserving a parking space has become a tedious job and consumes a good amount of time, hence management has decided to automate it based on a first come first serve basis with the following features.

## Requirements
* Users can book a parking space 15 mins prior to arrival, in which he will get a parking number.
* If the user fails to reach in 30 mins then the allotted space again goes for rebooking (15 mins extra wait time).
* If Reserved space is occupied completely then the reserved users will be allotted general parking space.
* If 50% capacity is utilized, then 15 mins extra wait time will be eliminated (for both reserved and general).
* If there is a clash for the general use and reserved for a general parking spot than the reserved user will be a priority.

## Guidelines
* You can use any Framework for the NodeJS runtime environment.
* You must use a NoSQL database.
* UI is not required.
* 3 mandatory API is required for QA
    * Get all available parking slots 
    * Get all occupied parking slots 
    * Total registered users

## Evaluation
* Database design/ Data Structure.
* API structure with appropriate standards.
* Business Logic.
* The scope provided for further added features.
* API and code version support.
* Quality of code.


feature_main