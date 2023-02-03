module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        license_no: String,
        make: String,
        model: String,
        year: String,
        cost: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Rental = mongoose.model("rental", schema);
    return Rental;
  };
  