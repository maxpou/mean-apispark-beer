# :beer: Beer app :beer:

I really want to learn MEAN Stack. But I want to do this step by step.
So I've decided to proceed in 3 steps:

1. AngularJS with a json file
2. AngularJs + Web API (by using APISpark)
3. MEAN Stack (Mongodb, Express, AngularJs & Node.js)

I also decide do work with beer, because it's funniest than contact, products, todo-task, ...
Thanks to [@lostinbrittany](https://twitter.com/lostinbrittany) for his json file and images.

I also use twitter Bootstrap because I won't spend time to code css.

*If you found a typo or a mistake somewhere, please fork and edit this post. Thank you :)*

## Installation

1. Download the code
2. Install the npm modules: ```npm install```  
Use the ```--no-bin-links``` argument if it fails.

## Step 1: AngularJs - json file

Here, you can manage your beers with CRUD operations.  
Note that all fields are mandatory (except description).

## Step 2: AngularJs + Web API (APISpark)

![APISpark logo](http://i1.wp.com/restlet.dreamhosters.com/wp-content/uploads/2012/08/0111_apispark_logo.png?resize=352%2C120)

In a nutshell, [APISpark](http://restlet.com/products/apispark/) is a Platform-as-a-Service dedicated to web API. You can manage, host, consume API for [free (if you use less than "10 Concurrent Clients")](http://restlet.com/products/apispark/#pricing).

Here, my Web API is **public**. So you can access to my [dashboard](https://apispark.restlet.com/apis/14055/versions/1/overview).

If data are empty, or if you find errors, please reinitialize the database (**Reinitialize** button).

Note: [Further reading about JS Promise](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/ch3.md) (because it's a so powerful feature ;-))

## Step 3: MEAN Stack (Mongodb, Express, AngularJs & Node.js)

1. Initialize database (2 ways):
  * Import data with json file: ```mongoimport --db beers --collection beers --jsonArray step1/beer-list.json```
  * Or : Use the *reinitialize button* 
2. In the server/server.js file, change the endpoint according to your configuration (replace *scotch.local:3000* to something like *localhost:3000*).  
3. Start the server: ```npm start```.  
You will need nodemon : ```npm install -g nodemon```
4. Visit the application in your browser at http://localhost:3000/ (you will see "Hello beer!")
5. Enjoy beer :beer:

**Tests:**  

1. Install mocha: `npm install -g mocha`
2. Run tests: npm test
