import { api } from ".";

type UserResponse = User;

export default class AuthService {
  static async getUser() {
    return api.get<UserResponse>("/auth/user");
  }
}
