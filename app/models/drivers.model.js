module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            full_name: String,
            email: String,
            password: String,
            phone_number: String,
            address: String,
            no_ktp: String,
            file: String,
        },
        {timestamps: true}
    )

    schema.method("toJson", function() {
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const Driver = mongoose.model("drivers", schema)
    return Driver
}