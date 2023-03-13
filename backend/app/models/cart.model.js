module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user"
      },
      parts: [{
        partId: String,
        quantity: Number,
        name: String,
        price: Number
      }]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cart = mongoose.model("cart", schema);
  return Cart;
};
