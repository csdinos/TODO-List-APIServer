var appRouter = function(app) {

    app.get("/", function(req, res) {
      res.send("Hello World");
    });

    app.post("/register",function(req,res){
      require("../controllers/register.js")(req,res);
    });

}

module.exports = appRouter;
