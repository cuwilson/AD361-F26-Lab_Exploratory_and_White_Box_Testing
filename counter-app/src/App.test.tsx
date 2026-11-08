// @vitest-environment jsdom

import { describe, test, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";


afterEach(() => {
    cleanup();
});

describe("Counter App", () => {
    test("Displays the initial count and all buttons", () => {
        render(<App />);

        expect(screen.getByText("Count: 0")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Increment" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Decrement" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
    });


    test("Increment changes count from 0 to 1", () => {
        render(<App />);

        fireEvent.click(screen.getByRole("button", { name: "Increment" }));

        expect(screen.getByText("Count: 1")).toBeInTheDocument();
    });

    test("Decrement changes count from 0 to -1", () => {
        render(<App />);

        fireEvent.click(screen.getByRole("button", { name: "Decrement" }));

        expect(screen.getByText("Count: -1")).toBeInTheDocument();
    });

    test("Reset changes count back to 0", () => {
        render(<App />);

        fireEvent.click(screen.getByRole("button", { name: "Increment" }));
        expect(screen.getByText("Count: 1")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Reset" }));
        expect(screen.getByText("Count: 0")).toBeInTheDocument();
    });



    test("Handles multiple actions in sequence", () => {
        render(<App />);

        const increment = screen.getByRole("button", { name: "Increment" });
        const decrement = screen.getByRole("button", { name: "Decrement" });
        const reset = screen.getByRole("button", { name: "Reset" });

        // Increment three times
        fireEvent.click(increment);
        fireEvent.click(increment);
        fireEvent.click(increment);
        expect(screen.getByText("Count: 3")).toBeInTheDocument();

        // Decrement once
        fireEvent.click(decrement);
        expect(screen.getByText("Count: 2")).toBeInTheDocument();

        // Reset to zero
        fireEvent.click(reset);
        expect(screen.getByText("Count: 0")).toBeInTheDocument();

        // Decrement after resetting
        fireEvent.click(decrement);
        expect(screen.getByText("Count: -1")).toBeInTheDocument();
    });

});
