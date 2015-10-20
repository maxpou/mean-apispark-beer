# Beer app

I really want to learn MEAN Stack. But I want to do this step by step.
So I've decided to proceed in 3 steps :

1. AngularJS with a json file
2. AngularJs + Web API (APISpark)
3. MEAN Stack (Mongodb, Express, AngularJs & Node.js)

I also decide do work with beer, because it's funniest than contact, products, todo-task, ...
Thanks to [@lostinbrittany](https://twitter.com/lostinbrittany) for his json file and images.

I also use twitter Bootstrap because I won't spend time to code css.

*If you found a typo/mistake, please fork and edit this post. Thank you :)*

## Step 1 : AngularJs - json file

Here, you can manage your beers with CRUD operations.
Note that all fields are mandatory (except description).

## Step 2 : AngularJs + Web API (APISpark)

![APISpark logo](http://i1.wp.com/restlet.dreamhosters.com/wp-content/uploads/2012/08/0111_apispark_logo.png?resize=352%2C120)

In a nutshell, [APISpark](http://restlet.com/products/apispark/) is a Platform-as-a-Service dedicated to web API. You can manage, host, consume API for [free (if you use less than "10 Concurrent Clients")](http://restlet.com/products/apispark/#pricing).

Here, my Web API is **public**. So you can access to my [dashboard](https://apispark.restlet.com/apis/14055/versions/1/overview).

If data are empty, or if you find errors, please reinitialize the database (**Reinitialize** button).

Note : I use [promise paradigm](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/ch3.md) here because it's a very powerful feature ;-)

## Step 3 : MEAN Stack (Mongodb, Express, AngularJs & Node.js)

Mongodb :
Import with : ```mongoimport --db simple --collection people --jsonArray db.json```

NodeJS :
* Install express dependencies : ```npm install express --no-bin-links```
* Install other dependencies : ```npm install ...```
* Launch server : ```node server.js```
