function CreateExperienceForm () {
  const [data, setData] = useState({
    name: "",
    description: "",
    location: "",
    pricePerNight: "",
    capacity: "",
    images: "",
  })

  const hadleChange = (e) => {
   setData({
    ...data,
    [e.target.name]: e.target.value
   })
  }


    return (
        <div>
            <form action="">

            </form>
        </div>
    )
}

export default CreateExperienceForm;

// {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     location: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Coordinates",
//       required: true,
//     },
//     pricePerNight: { type: Number, required: true },
//     capacity: { type: Number, required: true },
//     amenities: [String],
//     images:  { 
//       type: String, 
//       default: "data:image/png;base64,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" 
//     },
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },