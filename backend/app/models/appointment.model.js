module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      start: {
        type: Date,
        required: true
      },
      end: {
        type: Date,
        required: true
      },
      vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "vehicle"
      },
      services: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "service"
      }],
      parts: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "part"
      }],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    // object.label = object.vehicle.license_no;
    // object.start = object.start;
    return object;
  });

  const Appointment = mongoose.model("appointment", schema);
  return Appointment;
};
