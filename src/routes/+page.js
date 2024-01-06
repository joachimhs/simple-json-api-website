export function load({ params }) {
    return {
        "sections": [
            {"id": "status", "title": "Status", "content": `
This page represents version 0.1 of the Simple JSON API specification. Until version 1.0, anything can change. There will be no breaking changes between point releases. Each major release (2.x, 3.x, etc) may introduce breaking changes.

If you see an error, would like to write an implementation, or contribute in other means, please let us know via the [GitHub repository](https://github.com/joachimhs/simple-json-api-website).
           `},
            {"id": "introduction", "title": "Introduction", "content": `
Simple JSON API attempts to provide a simplified, yet complete, API structure for your applications. It aims to be: 

- Easy to understand
- Easy to read - both by humans and machines
- Provide a clean and concise API adhering to the principles of REST
- Provide a consistent data-structure for each endpoint for all HTTP operations (GET, PUT, PATCH, etc)
- Support the most common operations needed in an API such as filtering, pagination and sideloading
- Allow the server to optimize for performance by sideloading related data

Simple JSON API uses as much of the standards of HTTP as possible, thus the content type for Simple JSON APIs are simply the standard "application/json".
           `},
            {"id": "why_a_new_spec", "title": "Why a new specification?", "content": `
While some good API specifications do exist, this project attempts to provide a common middle-ground being not too complex, while broad enough to not be too specific. 

While JSON:API is a thorough specification, Simple JSON API aims to provide a much simplified data-structure leaving the server-side specifics out of the specification. At the same time, while specifications such as JSON Web Key (JWK) is too narrow.
           `},
            {"id": "specification_parts", "title": "Mandatory and voluntary parts", "content": `
As with many specifications there is are mandatory parts and voluntary parts. In order to adhere to the specifications, all parts of the mandatory parts must be implemented, while the voluntary parts are added to the specifications to increase the feature set provided by Simple JSON API. 

The mandatory parts include:
- The URL structure used for the endpoints
- The HTTP operations used for each type of request (GET, PUT, DELETE, etc)
- The JSON payload for each endpoint

The list of mandatory parts is kept intentionally short in order to easily develop agains the specification. Only the most important parts of Simple JSON API is added here and specifies how the URL endpoints should be defined, which HTTP operations to use for each request type as well as how the JSON payload is structured

The voluntary parts include: 
- Server-side specified sideloading
- Pagination
- Filtering
- Client-side specified sideloading

The list of voluntary parts builds upong the mandatory parts and increase the functionality provided by the API. Sideloading is an important part of many APIs, in order to make the API performant without unnecessary HTTP request being made. Sideloading is thoroughly expllained in its own section below.   
           `},
            {"id": "rest", "title": "RESTful", "content": `
Simple JSON API adheres to the RESTful specification, in that the requests are: 

- **Stateless**
    - All requests has to provide all the information the server needs to process the request
- **Client-server**
    - A clear separation of concern between the client and the server
    - The client is responsible for providing the user experience
    - The server is responsible for providing the data
- **Uniform**
    - The API needs to be consistent between endpoints
- **URL-based**
    - Each endpoint has its own unique URL supporting the appropriate HTTP operations for each endpoint (GET, PUT, etc)
- **Cacheable**
    - Endpoints that have data that can be stale should be made cacheable

           `},
            {"id": "url_structure", "title": "URL Structure", "content": `
The URLs of the API are based on your applications data types/domain objects. The URL structure is predictable between domain objects for both the user and the programmer. 

The standard HTTP operations needs to be implemented for each endpoint. In the examples below, the client is interacting with the server with information related to the data for **buildings**.

- **HTTP GET /api/buildings**
    - Used for fetching a list of objects from the server
    - The server responds with a 200 OK
    - The URL endpoint is always in its plural form (if the API returns a list of users, then the URL is /api/buildings, etc.)
    - Always returns a JSON list of objects, even if there is only one object in the response
- **HTTP GET /api/buildings/{id}**
    - Used for fetching a single building object based on the buildings unique identifier
    - The server responds with a 200 OK
    - Always return a JSON object containing the single-object response
- **HTTP POST /api/buildings**
    - Used for sending a completely new building from the client to the server
    - The server responds with a 200 OK
    - The server includes the updated building in the payload
- **HTTP PUT /api/buildings/{id}**
    - Used for sending a complete update for an already existing building
    - The server responds with a 200 OK
    - With HTTP PUT all fields of the object needs to be present. The server will interpret missing fields as NULL
    - The server includes the updated building in the payload
- **HTTP PATCH /api/buildings/{id}**
    - Used for sending a partial update for an already existing building
    - The server responds with a 200 OK
    - Only the fields that have changed are included. The server will only update the included fields
    - The server includes the updated building in the payload
- **HTTP DELETE /api/buildings/{id}**
    - Used for deleting an already existing buildings
    - The server responds with a HTTP 200 OK 
           `},
            {"id": "data_structure", "title": "Data Structure", "content": `
Data sent between the client and the server in Simple JSON API is always encapsulated into its own top-level JSON property - a key. For the APIs that can return a list of records, this key is written i plural form and is of type JSON Array. For the APIs that can only return a single record, this key is written in singular form and is of type JSON Object.

Each returned JSON Object from the API is uniquely identified with a property labeled "id". 

## Requesting a list of records
When requesting a list of buildings available, the HTTP Request will be: 

<pre>
GET /api/buildnings HTTP/1.1
Accept: application/json
</pre> 

The server will then reply with a JSON Array of buildings, or an empty JSON array

<pre>
HTTP/1.1 200 OK
Content-Type: application/json

{
  "buildings": [
    {
      "id": "oslo_opera",
      "name": "Oslo Opera House",
      "buildingFirstOpenedDate": "2008-04-12"
    },
    {
      "id": "oslo_munch_museum",
      "name": "Oslo Munch Museum",
      "buildingFirstOpenedDate": "2021-10-22"
    }
  ]
}
</pre>  

Note that: 

- The data for the buildings are encapsulated into a JSON Array, with the "buildings" key (in plural).
- The content of the JSON Array is the JSON structure for the buildings
    - Each of the returned buildings have the required 'id'-property
    - The rest of the properties of the building follows. The property names are written in camelCase.
     
  
## Requesting a single record via its ID
When requesting a single building via the records ID, the HTTP request will look like

<pre>
GET /api/buildnings/oslo_munch_museum HTTP/1.1
Accept: application/json
</pre>

If the building can be retrieved by the server, the server will then reply with a JSON object with the building.

<pre>
HTTP1.1 200 OK
Content-Type: application/json

{
  "building": {
    "id": "oslo_munch_museum",
    "name": "Oslo Munch Museum",
    "buildingFirstOpenedDate": "2021-10-22"
  }
}
</pre> 

Note that: 

- The data for the building are encapsulated into a JSON Object, with the "building" key (in singular).
- The content of the JSON Object is the JSON structure for the building
    - The returned building have the required 'id'-property
    - The rest of the properties of the building follows. The property names are written in camelCase.
    
## Updating the record
The building can be updated either via a partial update (HTTP PATCH), or a full update (HTTP PUT). The server will handle these request differently: 

- For a partial update the server-side will assume that any missing properties are not updated, and the server will not update any of those properties
- For a full update the server-side will assume that any missing properties have been intentionally left out, and will update these properties with appropriate NULL values
- The ID-property of either the PATCH og PULL payload cannot be updated, and attempting to do this should cause a 500 Internal Server Error

The usage of HTTP PATCH and HTTP PUT is otherwise the same. 

To update a building, the client will send the following HTTP request. 

<pre>
PUT /api/buildings/oslo_munch_museum HTTP/1.1
Accept: application/json
Content-Type: application/json

{
  "building": {
    "id": "oslo_munch_museum",
    "name": "Oslo Munch Museum Bjørvika",
    "buildingFirstOpenedDate": "2021-10-22"
  }
}
</pre>

When receiving the above HTTP request, the server side will: 

- Verify that that ID in the HTTP header and the payload is the same. If not, return HTTP status code 500 Internal Server Error
- Fetch the building from its data storage
- Update the fields associated with the building and persist changes to the data storage

If the update is successful, the response will contain the updated record as the payload

<pre>
HTTP1.1 200 OK
Content-Type: application/json

{
  "building": {
    "id": "oslo_munch_museum",
    "name": "Oslo Munch Museum Bjørvika",
    "buildingFirstOpenedDate": "2021-10-22"
  }
}
</pre>

Note that: 

- The data for the building are encapsulated into a JSON Object, with the "building" key (in singular) both in the request and in the response.
- The content of the JSON Object is the JSON structure for the building
    - The returned building have the required 'id'-property
    - The rest of the properties of the building follows. The property names are written in camelCase.

## Deleting a record
A record can be deleted by sending a HTTP DELETE from the client. The HTTP request will be: 

<pre>
DELETE /api/buildings/oslo_munch_museum HTTP/1.1
</pre>

The server will then delete the building from its data storage. If the deletion is successful the server will respond with a HTTP status code 200 OK. 

<pre>
HTTP1.1 200 OK
</pre>

Note that: 

- There is no payload in either the request or response associated with the record being deleted. 
           `},
        ]};
}