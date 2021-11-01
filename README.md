Please read the PLEASE_READ_FIRST.md first.

Please document your code & design decisions here.

## Usage
```
npm i
npm run start:server
```

Open [Apollo Graphql sandbox](https://studio.apollographql.com/sandbox/explorer) to contect and explore.


## Run Test
```
npm test
```

## Debugging
```
npm run start:server:debug
```

## API

### getAllListings
Returns a collection of listings

| Variables | Type | Description|
|-----------|------|------------|
| limit     | Int  | Limit the amout or records returned in the request|
| lastId    | ID   | The mlsId of the last record from the previous query. This is useful for paginating results|

#### Example Request

```
query getAllListings($limit: Int) {
  listings(limit: $limit) {
    mlsId
    photos
    address {
      state
      postalCode
      streetName
      streetNumberText
      city
      country
    }
    listDate
    listPrice
  }
},
{
	"limit": 1
}
```

#### Example Response

```
{
  "data": {
    "listings": [
      {
        "mlsId": 1005192,
        "photos": [
          "https://s3-us-west-2.amazonaws.com/cdn.simplyrets.com/properties/trial/home9.jpg",
          "https://s3-us-west-2.amazonaws.com/cdn.simplyrets.com/properties/trial/home-inside-9.jpg"
        ],
        "address": {
          "state": "Texas",
          "postalCode": "77096",
          "streetName": "East Sweet Bottom Br",
          "streetNumberText": "74434",
          "city": "Houston",
          "country": "United States"
        },
        "listDate": "2011-05-23 11:50:30",
        "listPrice": "$20,714,261.00"
      }
    ]
  }
}
```

### getAllProperties
Returns a collection of properties

| Variables | Type | Description|
|-----------|------|------------|
| limit     | Int  | Limit the amout or records returned in the request|
| lastId    | ID   | The mlsId of the last record from the previous query. This is useful for paginating results|

#### Example Requst

```
query GetAllProperties($limit: Int) {
  properties(limit: $limit) {
    yearBuilt
    acres
    type
    lotSize
    bedrooms
    lotDescription
    stories
    bathrooms
    parking {
      spaces
    }
  }
},
{
	"limit": 1
}
```

#### Example Response

```
{
  "data": {
    "properties": [
      {
        "yearBuilt": 1998,
        "acres": null,
        "type": "RES",
        "lotSize": "127X146",
        "bedrooms": 2,
        "lotDescription": "Private Backyard",
        "stories": 3,
        "bathrooms": null,
        "parking": {
          "spaces": 6
        }
      }
    ]
  }
}
```

### getListingById
Returns the record specified with the specific mlsId

| Variables | Type | Description
|-----------|------|------------|
| mlsId     | ID!  | The requested record's mlsId value|

#### Example Request

```
query GetListingById($mlsId: ID!) {
  listing(mlsId: $mlsId) {
    mlsId
    photos
    address {
      state
      postalCode
      streetName
      streetNumberText
      city
      country
    }
    listDate
    listPrice
    geo {
      lat
      lng
    }
  }
},
{
	"mlsId": 1005192 
}
```

#### Example Response

```
{
  "data": {
    "listing": {
      "mlsId": 1005192,
      "photos": [
        "https://s3-us-west-2.amazonaws.com/cdn.simplyrets.com/properties/trial/home9.jpg",
        "https://s3-us-west-2.amazonaws.com/cdn.simplyrets.com/properties/trial/home-inside-9.jpg"
      ],
      "address": {
        "state": "Texas",
        "postalCode": "77096",
        "streetName": "East Sweet Bottom Br",
        "streetNumberText": "74434",
        "city": "Houston",
        "country": "United States"
      },
      "listDate": "2011-05-23 11:50:30",
      "listPrice": "$20,714,261.00",
      "geo": {
        "lat": 29.689418,
        "lng": -95.474464
      }
    }
  }
}
```

### getListingsByLocation

| Variables | Type     | Description|
|-----------|----------|------------|
| city      | String!  | The city you would like to search for available listings. Alternatively, you can use the following attributes if the city name is unknown: listingId, street number, street name, mls area (major), subdivision, postal code.|
| limit     | Int      | Limit the amout or records returned in the request|
| lastId    | ID       | The mlsId of the last record from the previous query. This is useful for paginating results|

#### Example Request

```
query GetListingsByLocation($city: String!, $limit: Int) {
  listingsByLocation(city: $city, limit: $limit) {
    mlsId
    listDate
    listPrice
    address {
      state
      country
      postalCode
      streetName
      streetNumberText
      city
    }
    agent {
      contact {
        email
      }
      lastName
    }
  }
},
{
	"city": "Houston",
	"limit": 10
}
```

#### Example Response


```
{
  "data": {
    "listingsByLocation": [
      {
        "mlsId": 1005192,
        "listDate": "2011-05-23 11:50:30",
        "listPrice": "$20,714,261.00",
        "address": {
          "state": "Texas",
          "country": "United States",
          "postalCode": "77096",
          "streetName": "East Sweet Bottom Br",
          "streetNumberText": "74434",
          "city": "Houston"
        },
        "agent": null
      },
      {
        "mlsId": 1005193,
        "listDate": "1991-12-12 16:45:2",
        "listPrice": "$7,857,291.00",
        "address": {
          "state": "Texas",
          "country": "United States",
          "postalCode": "77018",
          "streetName": "East GRANICUS Mews",
          "streetNumberText": "34149",
          "city": "Houston"
        },
        "agent": null
      },
      ...
    ]
  }
}
```

