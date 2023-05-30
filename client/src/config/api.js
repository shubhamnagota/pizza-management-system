import axios from "axios";
import io from "socket.io-client";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default async function API({ url, method = "GET", body }) {
  try {
    const { data } = await instance({ url, method, data: body });
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

const socket = io("http://localhost:3000");
export { socket };
