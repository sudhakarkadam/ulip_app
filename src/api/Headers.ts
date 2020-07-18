function createHeader() {
  let authToken: string;
  return {
    setToken: (token: string) => {
      authToken = token;
    },
    getHeaders: () => {
      return { "X-AUTH_TOKEN": authToken };
    }
  };
}

export const HeaderProvider = createHeader();
