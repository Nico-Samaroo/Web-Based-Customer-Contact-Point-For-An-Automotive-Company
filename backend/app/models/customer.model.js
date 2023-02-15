module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      first_name: {
          type: String,
          required: [true, "Please include a first name"],
      },
      last_name: {
          type: String,
          required: [true, "Please include a last name"],
      },
      email: {
          type: String,
          required: [true, "Please include an email"],
      },
      contact_no: {
          type: String,
          required: [true, "Please include a contact number"],
      },
      city: {
          type: String,
          required: [true, "Please include a city"],
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Customer = mongoose.model("customer", schema);
  return Customer;
};
