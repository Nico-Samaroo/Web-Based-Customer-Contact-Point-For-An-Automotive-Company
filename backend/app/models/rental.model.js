module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      begin: {
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
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object.start = object.begin.toISOString().split('T')[0];
    object.end = object.end.toISOString().split('T')[0];
    return object;
  });

  const Rental = mongoose.model("rental", schema);
  return Rental;
};
