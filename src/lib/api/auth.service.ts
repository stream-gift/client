import { cookies } from "next/headers";

export default class AuthService {
  static async getUser(): Promise<User> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user`,
      {
        headers: {
          Cookie: cookies().toString(),
        },
      }
    );
    return response.json().then((data) => data.data);
  }
}
