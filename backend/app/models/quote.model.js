module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      image: {
        type: String,
        required: true
      },
      vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "vehicle"
      },
      service: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "service"
      },
      description: {
        type: String,
        required: true
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Quote = mongoose.model("quote", schema);
  return Quote;
};
