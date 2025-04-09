const BASE_URL = "http://127.0.0.1:8000/api";

export const login = async (username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Falha no login");
  }

  return response.json(); // { access, refresh }
};

export const register = async (username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/registro/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Falha no registro");
  }

  return response.json(); // dados do usuário ou token
};

export const getEmpresas = async (token: string) => {
  const response = await fetch(`${BASE_URL}/empresas/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar empresas");
  }

  return response.json();
};
