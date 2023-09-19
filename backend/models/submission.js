const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    audioFile: { type: String, required: true }, // You can store the file path or URL
    genre: { type: String }, // Genre of the music
    artist: { type: String }, // Artist name
    description: { type: String }, // Description of the submission
    releaseDate: { type: Date }, // Release date of the music
    duration: { type: Number }, // Duration of the audio in seconds
    userId:{type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    private: {type: Boolean, required: true, default: false},
    // Add more fields as needed
  });

module.exports=mongoose.model("Submission",submissionSchema);