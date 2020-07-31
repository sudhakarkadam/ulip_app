function createHeader() {
  let authToken: string;
  return {
    setToken: (token: string) => {
      authToken = token;
    },
    getHeaders: () => {
      return { Authorization: `Bearer ${authToken}` };
    }
  };
}

export const HeaderProvider = createHeader();
