module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      image: {
        type: String,
        required: true
      },
      code: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: false
      },
      amount: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Part = mongoose.model("part", schema);
  return Part;
};
