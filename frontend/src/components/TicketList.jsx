import { useEffect, useState } from "react";
import { listTickets, deleteTicket } from "../api";

export default function TicketList({ refreshKey }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    listTickets().then(setTickets);
  }, [refreshKey]);

  async function handleDelete(code) {
    await deleteTicket(code);
    setTickets(await listTickets());
  }

  return (
    <div>
      <h2>4. Lista biljetter</h2>
      <table>
        <thead>
          <tr>
            <th>Kod</th>
            <th>Status</th>
            <th>Åtgärd</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.code}>
              <td>{t.code}</td>
              <td>{t.used ? "Använd" : "Oanvänd"}</td>
              <td>
                {!t.used && (
                  <button onClick={() => handleDelete(t.code)}>Radera</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
