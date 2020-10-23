# To-Do-App
A basic to do application using the MERN stack

## After cloning:
for the app to run propably you have to add your own mongodb configurations

 add config directory, and inside create a file named "keys.js" and add the following code

<code>
module.exports = {
  mongoURI:
    process.env.mongoURI ||
    'mongodb+srv://nasr:<password>@todo-app-cluster.vu1ym.mongodb.net/todos?retryWrites=true&w=majority'
};

</code>

this requires you to create a database on Mongo Atlas. You can add any databse configration you like

or you can add local configration
