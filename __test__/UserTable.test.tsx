import { render, screen } from "@testing-library/react";
import { describe, expect, it, test } from '@jest/globals';
import "@testing-library/jest-dom";
import UsersTable from "@/app/components/UserTable";


describe("UsersTable Component", () => {
    test("display the layout  in the page", () => {
        render(<UsersTable />);

    })
    test("renders component in the page", () => {
        render(<UsersTable />);
        expect(screen.getByTestId("user-table")).toBeInTheDocument();
    })
    test("renders table in the page", () => {
        render(<UsersTable />);
        expect(screen.getByTestId("table-container")).toBeInTheDocument();
    })
    test("renders pagination in the page", () => {
        render(<UsersTable />);
        expect(screen.getByTestId("table-pagination")).toBeInTheDocument();
    })
});
