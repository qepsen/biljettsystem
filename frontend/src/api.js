const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function createTicket() {
  const res = await fetch(`${API_URL}/api/tickets`, { method: "POST" });
  return res.json();
}

export async function listTickets() {
  const res = await fetch(`${API_URL}/api/tickets`);
  return res.json();
}

export async function useTicket(code) {
  const res = await fetch(`${API_URL}/api/tickets/${code}/use`, {
    method: "POST",
  });
  return res.json();
}

export async function deleteTicket(code) {
  const res = await fetch(`${API_URL}/api/tickets/${code}`, {
    method: "DELETE",
  });
  return res.json();
}
