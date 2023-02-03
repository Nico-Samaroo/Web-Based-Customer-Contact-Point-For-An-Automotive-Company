module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        first_name: String,
        last_name: String,
        email: String,
        make: String,
        model: String,
        pickup_day: String,
        pickup_time: String,
        dropoff_day: String,
        dropoff_time: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Rental_appointments = mongoose.model("rental_appointments", schema);
    return Rental_appointments;
  };
  