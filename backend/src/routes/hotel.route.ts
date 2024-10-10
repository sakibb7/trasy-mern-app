import { Router } from "express";
import { getAddHotelHandler } from "../controllers/hotel.controller";
import multer from "multer";

const hotelRoutes = Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

//prefix: /api/hotel
hotelRoutes.post(
  "/add-hotel",
  upload.array("imageFiles", 6),
  getAddHotelHandler
);

export default hotelRoutes;
