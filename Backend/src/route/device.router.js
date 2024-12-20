import express from "express";
import { Device } from "../models/device.model.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { Expo } from "expo-server-sdk";
const deviceRouter = express.Router();

deviceRouter.post("/register",authenticateUser, async (req, res) => {
    const {userId} = req.user
  const { token } = req.body;

  if (!Expo.isExpoPushToken(token)) {
    return res.status(400).json({ message: "Invalid Expo push token" });
  }

  try {
    let device = await Device.findOne({ userId, token });

    if (!device) {
      device = new Device({ userId, token });
      await device.save();
    }

    res.status(200).json({ message: "Token registered successfully" ,device});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { deviceRouter };
