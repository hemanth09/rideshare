# Designing and best practices to build RESTful services with NodeJS, Express, Mongoose and MongoDB

# Description

A rideshare app, backend implementation on finding a nearby driver based on geo location. This App is built to implement best practices on using the popular MongooseJS library to interface with the Mongo

- Write tests around Mongo queries to ensure code is working. You can reuse these tests on any projects!
- Architecting and separating logics for Route handling, Models and controllers

### Set Up

Clone and install:

```bash
git clone https://github.com/hemanth09/rideshare.git
cd rideshare/
npm/yarn install
```

These packages will be installed

- [Mongoose](https://mongoosejs.com/) is a library which helps to modify the database.
- [Mocha](https://mochajs.org/) testing framework is popular for testing Nodejs and we are going to test create, read, update and delete operations on our MongoDB database.

### Running the Application

Commands:

```bash
yarn run start
yarn run test
```

Before that you have to start MongoDb and connect to it.
I am assuming you have MongoDB already installed on your computer. We will start the daemon specifying the location of the database.

```bash
mongod --dbpath=/User/username/data/db
```

If not installed follow the below link to install mongodb

- [Installing Mongo](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
- [Robo 3T](https://robomongo.org/download) You can install Robo 3T which gives a good user interface to manage your MongoDB database.
