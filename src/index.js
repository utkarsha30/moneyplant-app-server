require('dotenv/config');
const express = require('express');
const path = require('path');
const cors = require('cors');
// connecting to database
const { connect } = require('./db/init');

// create an application object
const app = express();
//to avoid cors policy error
app.use(cors({ origin: '*' }));
//for request body data
app.use(express.json());

const clientPath = path.join(__dirname, '../public');
app.use(express.static(clientPath));
console.log(clientPath);

app.get('/api', (req, res) => {
  res.send(
    '<div style="width:200px; margin: auto auto;"><img width="100%"  src="https://media.tenor.com/2jd3xi2WVt0AAAAC/recurring-settings.gif"></div><div style="width:220px; margin: 0 auto;"><h2>Server is Running...</h2></div>'
  );
});
//routes
app.use('/api/expert', require('./routes/expert.route'));
app.use('/api',function(req,res,next){
  const error = new Error("Unsupported API");
  error.status =404;
  next(error);
});
app.use('/api',function(error,req,res,next){
  res.status(error.status || 500);
  res.send({
    message:error.message
  });
});
app.use(function(req,res,next){
  res.sendFile(path.join(clientPath,'index.html'));
})
const PORT = process.env.PORT || 5001;
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1);
  });
