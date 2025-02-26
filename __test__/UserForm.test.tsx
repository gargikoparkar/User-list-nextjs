import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { User } from "@/app/type/type";
import UserFormDialog from "@/app/components/UserForm";

describe("UserFormDialog Component", () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();
  const users: User[] = [
    { id: 1, first_name: "John", last_name: "Doe", email: "john@example.com" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with 'Add New User' title when no user is passed", () => {
    render(<UserFormDialog users={users} user={null} onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    expect(screen.getByText("Add New User")).toBeInTheDocument();
    expect(screen.getByTestId("user-form")).toBeInTheDocument();
  });

  test("renders correctly with 'Edit User' title when a user is passed", () => {
    render(<UserFormDialog users={users} user={users[0]} onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    expect(screen.getByText("Edit User")).toBeInTheDocument();
  });
});
