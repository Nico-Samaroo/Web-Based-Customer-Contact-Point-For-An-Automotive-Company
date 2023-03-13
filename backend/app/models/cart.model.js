module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      number: {
        type: Number,
        required: true
      },
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
    object.total = object.total.toFixed(2)
    return object;
  });

  const Cart = mongoose.model("cart", schema);
  return Cart;
};
