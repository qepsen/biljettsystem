import { useState } from "react";
import CreateTicket from "./components/CreateTicket";
import UseTicket from "./components/UseTicket";
import DeleteTicket from "./components/DeleteTicket";
import TicketList from "./components/TicketList";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey((k) => k + 1);

  return (
    <div>
      <h1>Biljettsystem</h1>
      <CreateTicket onCreated={refresh} />
      <UseTicket onUsed={refresh} />
      <DeleteTicket onDeleted={refresh} />
      <TicketList refreshKey={refreshKey} />
    </div>
  );
}
