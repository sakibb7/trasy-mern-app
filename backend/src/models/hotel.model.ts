import mongoose from "mongoose";

export interface HotelDocument extends mongoose.Document {
  userId: string;
  name: string;
  location: string;
  imgUrls: string[];
}

const hotelSchema = new mongoose.Schema<HotelDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    imgUrls: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const HotelModel = mongoose.model<HotelDocument>("Hotel", hotelSchema);

export default HotelModel;
