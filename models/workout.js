const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Type is required",
        },
        name: {
            type: String,
            trim: true,
            required: "Name is required",
        },
        duration: {
            type: Number,
            required: "Duration is required",
        },
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
    }],
    totalDuration: {
        type: Number,
        default: function(){
            if(this.exercises.length = 1){
                return this.exercises[0].duration;
            } else {
                return 0;
            }
        }
    }
});

WorkoutSchema.methods.setTotalDuration = function () {
    if (this.exercises.length > 0) {
        // this.totalDuration = this.exercises.reduce((acc, item) => acc + item.duration, 0)
        // return this.totalDuration;
        let currentValue;
        let finalValue = 0;
        for(let i = 0; i < this.exercises.length; i++){
            currentValue = this.exercises[i].duration;
            finalValue += currentValue;
        }
        this.totalDuration = finalValue;
        return this.totalDuration;
    }
}

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;