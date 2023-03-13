module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
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
    // object.price = object.price.toFixed(2)
    return object;
  });

  const Part = mongoose.model("part", schema);
  return Part;
};
