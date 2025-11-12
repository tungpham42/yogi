import axios from "axios";
import { Pose } from "../types";

export async function fetchAllPoses(): Promise<Pose[]> {
  const res = await axios.get<Pose[]>("/data/all-poses-vi.json");
  return res.data;
}
