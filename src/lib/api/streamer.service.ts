export default class StreamerService {
  static async getStreamer(username: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/streamer/profile/${username}`
    );
    return response.json().then((data) => data.data);
  }

  static async onboard(data: any) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/streamer/onboard`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    return response.json().then((data) => data.data);
  }

  static async getData(token: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/streamer/data?token=${token}`
    );
    return response.json().then((data) => data.data);
  }
}
