import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CreateTicket from "../components/CreateTicket";

describe("CreateTicket", () => {
  it("visar en kod efter klick på Skapa biljett", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ code: "ABC12345" }),
      })
    );

    render(<CreateTicket />);
    fireEvent.click(screen.getByText("Skapa biljett"));

    const code = await screen.findByTestId("ticket-code");
    expect(code).toBeInTheDocument();
  });
});
