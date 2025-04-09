// src/lib/api.ts
const BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchVagas() {
  const res = await fetch(`${BASE_URL}/vagas/`);
  return res.json();
}

export async function fetchVagaPorId(id: string) {
  const res = await fetch(`${BASE_URL}/vagas/${id}/`);
  return res.json();
}

export async function criarVaga(dados: any, token: string) {
  const res = await fetch(`${BASE_URL}/vagas/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  return res;
}
