import { Settings } from "http2";

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
    donate: (data: any) =>
      api.post<{
        donation: Donation;
        address: { address: string; currency: string };
      }>("/donation/donate", data),
    getDonation: (id: string) =>
      api.get<{ donation: Donation }>(`/donation/${id}`),
    getDonationEvents: (token: string, since: number) =>
      api.get<Donation[]>(`/donation/events?token=${token}&since=${since}`),
  },

  Streamer: {
    getStreamer: (username: string) =>
      api.get<Streamer>(`/streamer/profile/${username}`),
    onboard: (data: any) =>
      api.post<Streamer & { streamerDomainName: string }>(
        "/streamer/onboard",
        data
      ),
    getStreamerDataByToken: (token: string) =>
      api.get<{ streamer: Streamer; settings: StreamerSettings }>(
        `/streamer/data?token=${token}`
      ),
    setSettings: (data: any) =>
      api.post<StreamerSettings>("/streamer/settings/set", data),
    withdraw: (data: any) =>
      api.post<StreamerWithdrawal>("/streamer/withdraw", data),
  },
};
