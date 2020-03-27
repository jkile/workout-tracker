const db = require("../models");

module.exports = function(app){
    app.get("/api/workouts", function(req, res){
        db.Workout.find({})        
        .sort({date: -1})
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    });

    app.put("/api/workouts/:id", function(req, res){
        
        db.Workout.findByIdAndUpdate(req.params.id, req.body, {new:true})
            .then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                res.status(400).json(err);
            })
        
    });

    app.post("/api/workouts/", function({body}, res){
        db.Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    });

    app.get("/api/workouts/range", function(req, res){
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                res.status(400).json(err);
            })
    });
}