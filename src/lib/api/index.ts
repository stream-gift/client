import { cookies } from "next/headers";

export const api = {
  _request: async (path: string, method: string, body?: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(body),
    });

    return res.json().then((data) => data.data);
  },
  get: async <T>(path: string): Promise<T> => {
    return api._request(path, "GET");
  },
  post: async <T>(path: string, body: any): Promise<T> => {
    return api._request(path, "POST", body);
  },
};
