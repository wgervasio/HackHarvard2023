import { Request, Response } from "express";

import { dataRepository } from "../imports";

export const displayData = async (req: Request, res: Response) => {
  try {
    const data = await dataRepository.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data" });
  }
};

export const updateData = async (req: Request, res: Response) => {
    try {
      const data = await dataRepository.findOneBy({
        id: 2,
      });
  
      data!.cardboard = parseInt(req.body.cardboard);
      data!.paper = parseInt(req.body.paper);
      data!.metal = parseInt(req.body.metal);
      data!.plastic = parseInt(req.body.plastic);
      data!.trash = parseInt(req.body.trash);
      await dataRepository.save(data!);
      res.send("Data updated sucessfully");
    } catch {
      res.status(500).json({ error: "Failed to update data." });
    }
};