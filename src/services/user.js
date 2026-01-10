import { protectedApi, publicApi } from "@/lib/axios";

export const UserService = {
  /**
   * Cria um novo user
   * @param {Object} input - Dados do user
   * @param {string} input.firstName - Primeiro nome do user
   * @param {string} input.lastName - Ultimo nome do user
   * @param {string} input.email - Email do user
   * @param {string} input.password - Password do user
   * @returns {Object} Dados do user criado junto com os tokens
   */
  signup: async (input) => {
    const response = await publicApi.post("/users", {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    };
  },
  login: async (input) => {
    /**
     * Faz login do user
     * @param {Object} input - Dados do user
     * @param {string} input.email - Email do user
     * @param {string} input.password - Password do user
     * @returns {Object} Dados do user logado junto com os tokens
     */
    const response = await publicApi.post("/users/login", {
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    };
  },
  me: async () => {
    const response = await protectedApi.get("/users/me");
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
    };
  },
  getBalance: async (input) => {
    const queryParams = new URLSearchParams();
    queryParams.set("from", input.from);
    queryParams.set("to", input.to);
    const response = await protectedApi.get(
      `/users/me/balance?${queryParams.toString()}`
    );
    return response.data;
  },
};
