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
  let TodoID = "";
  test("Insert Todo Successfully", async () => {
    const response = await axios.post(`${BACKEND_URL}/${TODO_API}`, TestTodo);
    TodoID = response.data.todo.id;
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

  test("Fetching Todo by ID", async () => {
    const response = await axios.get(`${BACKEND_URL}/${TODO_API}/${TodoID}`);
    expect(response.data.todo.id).toBe(TodoID);
  });

  test("Fetching Todo by ID with wrong InputType", async () => {
    const response = await axios.get(`${BACKEND_URL}/${TODO_API}/abc`);
    expect(response.status).toBe(406);
  });

  test("Fetching Todo by ID with non-existing ID", async () => {
    const response = await axios.get(`${BACKEND_URL}/${TODO_API}/1000000`);
    expect(response.status).toBe(404);
  });

  test("Update Todo with single field ( todo body )", async () => {
    const response = await axios.patch(`${BACKEND_URL}/${TODO_API}/${TodoID}`, {
      body: "Aggressive Learning",
    });
    expect(response.data.updatedTodo.body).toBe("Aggressive Learning");
  });

  test("Update Todo with multiple fields", async () => {
    const newTodo = {
      title: "My New Title",
      body: "My Amazing Body",
      isCompleted: true,
    };
    const response = await axios.patch(
      `${BACKEND_URL}/${TODO_API}/${TodoID}`,
      newTodo
    );
    const { id, ...todoWithOutID } = response.data.updatedTodo;
    console.log(todoWithOutID);
    expect(todoWithOutID).toStrictEqual(newTodo);
  });

  test("Update Todo with Invalid isCompleted type", async () => {
    const response = await axios.patch(`${BACKEND_URL}/${TODO_API}/${TodoID}`, {
      isCompleted: "hello world",
    });
    expect(response.status).toBe(406);
  });

  test("Update Todo with non-existing ID", async () => {
    const response = await axios.patch(`${BACKEND_URL}/${TODO_API}/450000`, {
      isCompleted: true,
    });
    expect(response.status).toBe(404);
  });

  test("Delete Todo with non-existing ID", async () => {
    const response = await axios.delete(`${BACKEND_URL}/${TODO_API}/4500000`);
    expect(response.status).toBe(404);
  });

  test("Delete Todo with existing ID", async () => {
    const preResponse = await axios.get(`${BACKEND_URL}/${TODO_API}/${TodoID}`);
    expect(preResponse.data.todo.id).toBe(TodoID);
    expect(preResponse.status).toBe(200);
    const response = await axios.delete(`${BACKEND_URL}/${TODO_API}/${TodoID}`);
    const postResponse = await axios.get(
      `${BACKEND_URL}/${TODO_API}/${TodoID}`
    );
    expect(postResponse.status).toBe(404);
    expect(response.status).toBe(200);
  });

  test("Delete Todo with Invalid Input Type", async () => {
    const response = await axios.delete(
      `${BACKEND_URL}/${TODO_API}/helloWorld`
    );
    expect(response.status).toBe(406);
  });
});
