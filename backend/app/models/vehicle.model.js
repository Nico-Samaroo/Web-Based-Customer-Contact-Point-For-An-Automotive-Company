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
      user: {  //defines user object
        type: mongoose.Schema.Types.ObjectId,  //which has ObjectID property
        required: true,
        ref: "user"    //references "user" from the schema definition, to link a vehicle to a specific user
      },
      rental: {
        type: Boolean,
        required: false
      },
      rental_price: {
        type: Number,
        required: false
      }
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
