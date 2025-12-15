"use server";

import type { IPutFollow } from "@/interfaces/actions/following.interface";
import { PUT } from "./controllers/following.controller";

/* =========================
          PUT 
========================= */

export const followUser = async (props: IPutFollow) => {
  await PUT.follow(props);
};
