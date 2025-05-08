const BASE_URL = "http://127.0.0.1:8000/api";

// Função para login
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

// Função para registro
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

// Função para obter empresas
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

// Interface para os dados da empresa
interface EmpresaData {
  nome: string;
  cnpj: string;
  email?: string;
  telefone?: string;
  site?: string;
  setor: string;
  localizacao: string;
}

// Função para criar uma nova empresa
export const criarEmpresa = async (data: EmpresaData, token: string | null) => {
  if (!token) {
    throw new Error("Token de autenticação não fornecido");
  }

  const response = await fetch(`${BASE_URL}/empresas/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Erro ao criar empresa: ${errorData.message || response.statusText}`);
  }

  return response.json(); // Retorna os dados da empresa criada
};