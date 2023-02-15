module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      begin: {
        type: Date,
        required: true
      },
      finish: {
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
    object.start = object.begin.toISOString().split('T')[0];
    object.end = object.finish.toISOString().split('T')[0];
    object.title = object.vehicle.license_no;
    return object;
  });

  const Appointment = mongoose.model("appointment", schema);
  return Appointment;
};
