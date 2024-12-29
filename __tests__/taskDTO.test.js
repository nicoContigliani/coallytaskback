import { taskDTO } from "../src/apiservices/tasks/tasksDto.js";

describe("taskDTO", () => {
  it("should correctly transform a task object to a DTO", () => {
    const mockTask = {
      _id: "12345",
      title: "Test Task",
      description: "This is a test task",
      completed: false,
      createdAt: "2024-06-10T10:00:00.000Z",
      updatedAt: "2024-06-10T12:00:00.000Z",
    };

    const expectedDTO = {
      id: "12345",
      title: "Test Task",
      description: "This is a test task",
      completed: false,
      createdAt: "2024-06-10T10:00:00.000Z",
      updatedAt: "2024-06-10T12:00:00.000Z",
    };

    const result = taskDTO(mockTask);

    expect(result).toEqual(expectedDTO);
  });

  it("should handle missing fields gracefully", () => {
    const incompleteTask = {
      _id: "12345",
      title: "Incomplete Task",
      completed: true,
    };

    const expectedDTO = {
      id: "12345",
      title: "Incomplete Task",
      description: undefined, // Fields not present in the task should return undefined
      completed: true,
      createdAt: undefined,
      updatedAt: undefined,
    };

    const result = taskDTO(incompleteTask);

    expect(result).toEqual(expectedDTO);
  });
});
