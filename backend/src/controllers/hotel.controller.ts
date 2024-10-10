import express from "express";
import { CREATED } from "../constants/http";
import { addHotel } from "../services/hotel.services";
import catchErrors from "../utils/catchErrors";
import { addHotelSchema } from "./hotel.schemas";
import cloudinary from "cloudinary";

export const getAddHotelHandler = catchErrors(async (req, res) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel = req.body;
    //upload images to cloudinary
    const imageUrls = await uploadImages(imageFiles);

    //if upload was successfull add the urls to the new hotel
    newHotel.imageUrls = imageUrls;
    newHotel.userId = req.userId;

    const { hotel } = await addHotel(newHotel);
    console.log(newHotel);
    return res.status(CREATED).json({ hotel });
  } catch (error) {
    console.log("Error creating hotel:", error);
    res.status(500).json({ message: "Something went wrong" });
  }

  // const request = addHotelSchema.parse({ ...req.body });
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI, {
      folder: "trasy",
    });

    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
