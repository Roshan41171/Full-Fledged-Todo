const axios2 = require("axios");

const BACKEND_URL = "http://localhost:5000";
const TODO_API = "api/todo";

const axios = {
  post: async (...args) => {
    try {
      const res = await axios2.post(...args);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  get: async (...args) => {
    try {
      const res = await axios2.get(...args);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  patch: async (...args) => {
    try {
      const res = await axios2.patch(...args);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  delete: async (...args) => {
    try {
      const res = await axios2.delete(...args);
      return res;
    } catch (error) {
      return error.response;
    }
  },
};

class TodoTestData {
  constructor(title, body, isCompleted) {
    this.title = title;
    this.body = body;
    this.isCompleted = isCompleted;
  }
}

const TestTodo = new TodoTestData(
  "Test Todo",
  "Hello from the Test todo",
  false
);
const ErrorTestTodo = new TodoTestData("Error Test Todo", false, false);
const ErrorTestTodo2 = new TodoTestData("Error Todo Data", "Error Data", "bad");

describe("Todo CRUD Operations", () => {
  test("Insert Todo Successfully", async () => {
    const response = await axios.post(`${BACKEND_URL}/${TODO_API}`, TestTodo);
    expect(response.status).toBe(201);
  });

  test("Insert Todo Fail Due to Invalid Body Type", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/${TODO_API}`,
      ErrorTestTodo
    );
    expect(response.status).toBe(406);
  });

  test("Insert Todo Fail Due to Invalid isCompleted Type", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/${TODO_API}`,
      ErrorTestTodo2
    );
    expect(response.status).toBe(406);
  });
});
