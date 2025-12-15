# Properties GraphQL API

Backend application for managing property records, built with **Node.js**, **TypeScript**, **NestJS**, **GraphQL** and **Prisma**.

The application exposes a GraphQL API that allows creating, querying, filtering, sorting and deleting property records.  
During property creation, the API integrates with the **Weatherstack API** to fetch current weather data for the property location.

---

## Tech Stack

- **Node.js**
- **TypeScript**
- **NestJS**
- **GraphQL (Apollo, code-first approach)**
- **Prisma ORM**
- **SQLite** (for simplicity and easy local setup)
- **Weatherstack API** (external weather data)

---

## Features / User Stories

- Query all properties
- Filter properties by:
  - city
  - state
  - zip code
- Sort properties by creation date
- Query property details by ID
- Create a new property
  - Calls Weatherstack API during creation
  - Stores latitude, longitude and current weather snapshot
- Delete a property

> Weather data is fetched **only during property creation** and stored as a snapshot, in line with the requirements.

---

## Setup & Running the Application

### Prerequisites
- Node.js (recommended: 18+ or 20 LTS)
- Weatherstack API key

### Installation
 - npm install

### Create .env file 

 - DATABASE_URL="file:./dev.db"
 - WEATHERSTACK_ACCESS_KEY=your_weatherstack_api_key () https://weatherstack.com/dashboard

### Run database migration

 - npx prisma migrate dev

### Start the app

 - npm run start:dev (http://localhost:3000)

## Example GraphQL Operations

### Create property

mutation {
  createProperty(input: {
    city: "Fountain Hills"
    street: "15528 E Golden Eagle Blvd"
    state: "AZ"
    zipCode: "85268"
  }) {
    id
  }
}

### Query all properties

query {
  properties {
    id
    city
    state
    zipCode
    createdAt
  }
}

### Filter & sort

query {
  properties(
    filter: { state: "AZ" }
    sort: { createdAt: desc }
  ) {
    id
    city
    createdAt
  }
}

### Query by ID

query {
  property(id: "PROPERTY_ID") {
    id
    city
    street
    state
    zipCode
    lat
    long
    weatherData
  }
}

### Delete property

mutation {
  deleteProperty(id: "PROPERTY_ID") {
    id
  }
}


