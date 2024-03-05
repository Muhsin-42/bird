"use server";

import { PUT } from "./controllers/following.controller";
import { IPutFollow } from "@/interfaces/actions/following.interface";

/* =========================
          PUT 
========================= */

export const followUser = async (props: IPutFollow) => {
  await PUT.follow(props);
};
