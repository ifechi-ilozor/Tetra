const express = require('express');
const mongoose = require('mongoose');
//const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3001;

//P69VSPIRVt2hVHaI
const MONGODB_URI = 'mongodb+srv://ifechi-ilo:P69VSPIRVt2hVHaI@tetra-orgtk.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('mongoose is connected');
});

// app.use(morgan('tiny'));
app.use(require('./api'));

app.listen(PORT, () =>
  console.log(`Express server is running on localhost:${PORT}`)
);
