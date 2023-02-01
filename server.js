const app = require('./app');
const connectionFn = require('./configs/database');
const PORT = process.env.PORT || 8080;



// Uncaught Error Handler
process.on('uncaughtException', (err) => {
  console.log({ error: err.message, message: "Server Shutdown due to Uncaught error" });
  process.exit(1);
})


connectionFn();



app.listen(PORT, () => {
  try {
    console.log('listening on port 8080');
  } catch (error) {
    console.log('not listening');
  }  
})



// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
  console.log("Error: " + err.message);
  console.log("Closing the server due to unhandledPromiseRejection");

  server.close(() => {
      process.exit(1);
  })
})