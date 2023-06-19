const userRoutes = require("./userRoute.js");
const categoryRoutes = require("./categoryRoute.js");
const plateformRoutes = require("./plateformRoute.js");

var router = require("express")
var app = router()



app.use('/admin', userRoutes);
app.use('/category', categoryRoutes);
app.use('/platform', plateformRoutes);



module.exports = app;

