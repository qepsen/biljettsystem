import { useState } from "react";
import { deleteTicket } from "../api";

export default function DeleteTicket({ onDeleted }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);

  async function handleClick() {
    const data = await deleteTicket(code);
    setMessage(data.message || data.error);
    onDeleted?.();
  }

  return (
    <div>
      <h2>3. Radera biljett</h2>
      <input
        placeholder="Ange biljettkod (oanvänd)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleClick}>Radera biljett</button>
      <p>Endast oanvända biljetter kan raderas.</p>
      {message && <p>{message}</p>}
    </div>
  );
}
