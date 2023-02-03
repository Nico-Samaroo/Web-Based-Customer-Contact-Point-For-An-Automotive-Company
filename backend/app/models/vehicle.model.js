module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      license_no: {
        type: String,
        required: true
      },
      chassis_no: {
        type: String,
        required: false
      },
      make: {
        type: String,
        required: true
      },
      model: {
        type: String,
        required: true
      },
      year: {
        type: Number,
        required: false
      },
      customer_id: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "customer"
      }],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Vehicle = mongoose.model("vehicle", schema);
  return Vehicle;
};
