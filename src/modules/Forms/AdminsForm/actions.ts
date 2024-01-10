import axios from "../../../core/axios";
import { TypeRole } from "../../../store/Slices/userSlices/interface";

export const asyncFetchRoles = async (): Promise<TypeRole[]> => {
  const { data } = await axios.get("/get_roles");
  return data.data;
};
