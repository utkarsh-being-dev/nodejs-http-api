Features:
Built using pure Node.js (no Express or frameworks).

Handles multiple API endpoints.

Serves a basic HTML page with buttons linking to endpoints.

Includes a data-fetching endpoint that aggregates API results.

Focus on learning core HTTP server and routing concepts.

Endpoints Overview:
/ : Root page with buttons navigating to APIs.

/users : Example API endpoint.

/products : Example API endpoint.

/jokes : Example API endpoint.

/all-data : Fetches combined data from all APIs.

How to Run:
Terminal Command -node server.js
Visit http://localhost:8000/ in your browser.

Learning Goals:
Understand Node.js HTTP module.
Route handling without Express.
Sending HTML responses.
Managing APIs with vanilla Node.js.


Update:

Added the ability to post data and save it in the specified json file,

/productspost  --> products.json
/jokespost --> jokes.json
/userspost --> users.json

the post is tested using Thunder Client and data is sent in the form of object

