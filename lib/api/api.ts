import axios from "axios";

// Для клиентского кода используем относительные пути к Next.js API routes
export const api = axios.create({
  baseURL: typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
