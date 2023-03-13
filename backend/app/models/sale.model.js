module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"customer"
      },
      parts: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"part"
      }],
      total: {
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

  const Sale = mongoose.model("sale", schema);
  return Sale;
};
