import { render, screen } from "@testing-library/react";
import App from "../App.js";

test("renders the landing page", () => {
  render(<App />);

  expect(screen.getByRole("link")).toHaveTextContent("Login to Spotify");
  expect(screen.getByRole("heading")).toHaveTextContent(/Hello Beyond MD!/);
});
