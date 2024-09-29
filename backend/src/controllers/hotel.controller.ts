import { CREATED } from "../constants/http";
import { addHotel } from "../services/hotel.services";
import catchErrors from "../utils/catchErrors";
import { addHotelSchema } from "./hotel.schemas";

export const getAddHotelHandler = catchErrors(async (req, res) => {
  const request = addHotelSchema.parse({ ...req.body });

  const userId = req.userId;

  const { hotel } = await addHotel({
    name: request.name,
    location: request.location,
    userId: req.userId.toString(),
  });

  return res.status(CREATED).json({ hotel });
});
