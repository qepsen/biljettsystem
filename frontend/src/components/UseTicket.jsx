import { useState } from "react";
import { useTicket } from "../api";

export default function UseTicket({ onUsed }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);

  async function handleClick() {
    const data = await useTicket(code);
    setMessage(data.message || data.error);
    onUsed?.();
  }

  return (
    <div>
      <h2>2. Använd biljett</h2>
      <input
        placeholder="Ange biljettkod"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleClick}>Använd biljett</button>
      <p>En biljett kan endast användas en gång.</p>
      {message && <p>{message}</p>}
    </div>
  );
}
