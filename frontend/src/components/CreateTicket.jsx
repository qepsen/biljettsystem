import { useState } from "react";
import { createTicket } from "../api";

export default function CreateTicket({ onCreated }) {
  const [code, setCode] = useState(null);

  async function handleClick() {
    const data = await createTicket();
    setCode(data.code);
    onCreated?.();
  }

  return (
    <div>
      <h2>1. Skapa ny biljett</h2>
      <button onClick={handleClick}>Skapa biljett</button>
      {code && (
        <p>
          Genererad kod: <span data-testid="ticket-code">{code}</span>
        </p>
      )}
    </div>
  );
}
