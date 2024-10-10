import HotelModel from "../models/hotel.model";

type AddHotelParams = {
  userId: string;
  name: string;
  location: string;
  imageUrls: string[];
};

export const addHotel = async (data: AddHotelParams) => {
  const hotel = await HotelModel.create({
    name: data.name,
    location: data.location,
    userId: data.userId,
    imgUrls: data.imageUrls,
  });

  return { hotel };
};
