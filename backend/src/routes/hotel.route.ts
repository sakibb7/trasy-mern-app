import { Router } from "express";
import { getAddHotelHandler } from "../controllers/hotel.controller";

const hotelRoutes = Router();

//prefix: /api/hotel
hotelRoutes.post("/add-hotel", getAddHotelHandler);

export default hotelRoutes;
