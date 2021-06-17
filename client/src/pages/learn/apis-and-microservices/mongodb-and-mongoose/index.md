---
title: Introduction to the MongoDB and Mongoose Challenges
block: MongoDB and Mongoose
superBlock: APIs and Microservices
---

## Introduction to the MongoDB and Mongoose Challenges

MongoDB is a database that stores data records (documents) for use by an application. Mongo is a non-relational, "NoSQL" database. This means Mongo stores all associated data within one record, instead of storing it across many preset tables as in a SQL database. Some benefits of this storage model are:

- Scalability: by default, non-relational databases are split (or "shared") across many systems instead of only one. This makes it easier to improve performance at a lower cost.
- Flexibility: new datasets and properties can be added to a document without the need to make a new table for that data.
- Replication: copies of the database run in parallel so if one goes down, one of the copies becomes the new primary data source.

While there are many non-relational databases, Mongo's use of JSON as its document storage structure makes it a logical choice when learning backend JavaScript. Accessing documents and their properties is like accessing objects in JavaScript.

Mongoose.js is an npm module for Node.js that allows you to write objects for Mongo as you would in JavaScript. This can make it easier to construct documents for storage in Mongo.

Working on these challenges will involve you writing your code on Replit on our starter project. After completing each challenge you can copy your public Replit URL (to the homepage of your app) into the challenge screen to test it! Optionally you may choose to write your project on another platform but it must be publicly visible for our testing.

Start this project on Replit using [this link](https://replit.com/github/freeCodeCamp/boilerplate-mongomongoose) or clone [this repository](https://github.com/freeCodeCamp/boilerplate-mongomongoose/) on GitHub! If you use Replit, remember to save the link to your project somewhere safe!

## Use MongoDB Atlas to host a free mongodb instance for your projects

For the following challenges, we are going to start using MongoDB to store our data. To simplify the configuration, we are going to use MongoDB Atlas.

MongoDB Atlas is a MongoDB Database-as-a-Service platform, which basically means that they configure and host the database for you, making it so that the only responsibility you have is to populate your database with what matters: data!
We are going to show you how to:

- Create a MongoDB Atlas account.
- Create a new cluster.
- Create a new user on the database.
- Whitelist your IP address.
- Connect to your cluster.

### Create a MongoDB Atlas account

Let's start by <a href='https://www.mongodb.com/cloud/atlas' target='_blank' rel='no-follow'>going to MongoDB Atlas</a>.

Once you open the MongoDB Atlas page, you should sign up for a new account.

- Click the <a href='https://cloud.mongodb.com/user#/atlas/login' target='_blank' rel='no-follow'>Sign In</a> button in the top right corner to open the registration page.
- Click the <a href='https://cloud.mongodb.com/user#/atlas/register/accountProfile' target='_blank' rel='no-follow'>Register for a new account</a> link at the bottom of the sign in page.
- Fill the registration form with your information and press **continue**.
- You should now be logged into your new account and see a modal with a green **Build my first cluster** button, click on it.

### Create a new cluster

- Go through the steps of building your first cluster by following the instructions they provide and clicking next after each step.
  - **Choose your cloud provider and region**, you can leave this as the default provided (typically AWS).
  - **Customize your cluster's specs**, you can also leave this as the default provided, `M0 Sandbox (Shared RAM, 512 MB Storage) Encrypted`.
  - **Give your cluster a name**, you can also leave this as the default provided, `Cluster 0`.
- Now click the green **Create Cluster** button at the bottom of the screen and verify the image captions they provide.
- You should now see the message `Your cluster is being created - New clusters take between 7-10 minutes to provision.` Wait until the cluster is created before going to the next step.

### Create a new user on the database

- On the left side of your screen click the **Database Access** button under **Security** to start creating a new user.
- Click the **Add New Database User** button that is displayed in the next menu.
- Enter a new username and password. You can set the privileges to **Read and write to any database** if they are not already. Then click **Add User** to finish creating the user.

### Add your IP address

- If you now click on the green **Get Started** button in the bottom left of your screen, you should see the next step to take highlighted, **Add your IP address**, click on it.
  - Follow the instructions by clicking on the `IP Access List` tab under the `Security` tab.
  - Click on the green **ADD IP ADDRESS** button.
  - In the modal, click the **ALLOW ACCESS FROM ANYWHERE** button and you should see `0.0.0.0/0` pre-filled for the whitelist entry field, click the green **Confirm** button.

### Connect to your cluster

- Clicking on the green **Get Started** button in the bottom left of your screen should now show you the final step, **Connect to your cluster**, click on it.

  - Follow the instructions by clicking on the `Connect` button in the `Sandbox` section.
  - In the pop-up modal, click on **Connect Your Application**, a connection string will be displayed, you can copy that connection string by clicking on the `copy` button.
  - This will be the final URI that you will use to connect to your db and will look something like `mongodb+srv://<user>:<password>@<cluster#-dbname>.mongodb.net/test?retryWrites=true`. Notice that the `user` and `cluster#-dbname` fields are already filled out for you, so all you would need to replace is the `password` field with the one that you created in the previous step.

- That's it! You now have the URI you will add to your application to connect to your database. Keep this URI safe somewhere, so you can use it later!
- Feel free to create separate databases for different applications if they need a separate database. You just need to create a new project under your current MongoDB Atlas account, build a new cluster, add a new user, whitelist your IP addresses and finally connect to your cluster to obtain the new URI.
