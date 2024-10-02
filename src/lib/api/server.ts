import { cookies } from "next/headers";

const api = {
  _request: async (path: string, method: string, body?: any) => {
    const url = new URL(path, process.env.NEXT_PUBLIC_SERVER_URL).toString();
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(body),
    });

    return res.json().then((data) => data.data);
  },
  get: async <T = any>(path: string): Promise<T> => {
    return api._request(path, "GET");
  },
  post: async <T = any>(path: string, body: any): Promise<T> => {
    return api._request(path, "POST", body);
  },
};

export const APIService = {
  Auth: {
    getUser: () => api.get<User | null>("/auth/user"),
  },
  Streamer: {
    getStreamer: (username: string) =>
      api.get<Streamer>(`/streamer/profile/${username}`),
    getDashboard: () => api.get("/streamer/dashboard"),

    getAddresses: () => api.get("/streamer/addresses"),
    getBalances: () => api.get("/streamer/balances"),
    getWithdrawals: () => api.get("/streamer/withdrawals"),

    getSettings: () => api.get("/streamer/settings"),
    getToken: () => api.get("/streamer/token"),
  },
};
