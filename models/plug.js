const mongoose = require("mongoose");

const PlugSchema = new mongoose.Schema(
  { 
    StationId: {
         type: String,
         required: true
    },
    Plugs: [
      {
        Plug: {
          type: String,
          required: true
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plugs", PlugSchema);