module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      image: {
        type: String,
        required: true
      },
      vehicle: {
        type: String,
        required: true
      },
      service: {
        type: String,
        required: false
      },
      description: {
        type: Number,
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
