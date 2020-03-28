const db = require("../models");

module.exports = function (app) {
    app.get("/api/workouts", function (req, res) {
        db.Workout.find({})
            .sort({ date: -1 })
            .then(dbWorkouts => {
                res.json(dbWorkouts);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });

    app.put("/api/workouts/:id", async function (req, res) {
        let requestBody = req.body;
        let workout = new db.Workout(await db.Workout.findById(req.params.id));
        workout.setTotalDuration();
        workout.exercises.push(requestBody);
        try {
            const dbWorkout = await db.Workout.findByIdAndUpdate(req.params.id, workout, { new: true })
            res.json(dbWorkout);
        } catch{
            (err => {
                res.status(400).json(err);
            })
        }

    });

    app.post("/api/workouts/", function ({ body }, res) {
        db.Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    });

    app.get("/api/workouts/range", function (req, res) {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                res.status(400).json(err);
            })
    });
}