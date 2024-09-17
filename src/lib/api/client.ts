const api = {
  _request: async (path: string, method: string, body?: any) => {
    const url = new URL(path, process.env.NEXT_PUBLIC_SERVER_URL).toString();
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      ...(body && { body: JSON.stringify(body) }),
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

export const ClientAPIService = {
  Donation: {
    donate: (data: any) => api.post<any>("/donation/donate", data),
    getDonation: (id: string) => api.get<any>(`/donation/${id}`),
    getDonationEvents: (token: string, since: number) =>
      api.get(`/donation/events?token=${token}&since=${since}`),
  },

  Streamer: {
    getStreamer: (username: string) => api.get<any>(`/streamer/${username}`),
    onboard: (data: any) => api.post("/streamer/onboard", data),
    getStreamerDataByToken: (token: string) =>
      api.get(`/streamer/data?token=${token}`),
  },
};
