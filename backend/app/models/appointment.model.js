module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      date: {
        type: Date,
        required: true
      },
      appointment: {
        type: String,
        required: false
      },
      services: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
    return object;
  });

  const Appointment = mongoose.model("appointment", schema);
  return Appointment;
};
