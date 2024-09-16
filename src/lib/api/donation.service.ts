const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default class DonationService {
  static donate(data: any) {
    return fetch(`${BASE_URL}/donation/donate`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => data.data);
  }

  static getDonation(id: string) {
    return fetch(`${BASE_URL}/donation/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => data.data)
      .then((data) => data.donation);
  }

  static getDonationEvents(token: string, since: number) {
    return fetch(`${BASE_URL}/donation/events?token=${token}&since=${since}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data.data);
  }
}
