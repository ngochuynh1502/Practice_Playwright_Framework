export const validUser = {
  AddUserData: {
    firstName: "Ngoc",
    lastName: "Tester",
    email: "ngoc.tester@example.com",
    age: "30",
    salary: "60000",
    department: "QA",
  },
};
export const invalidUserData = {
  invalidEmail: {
    baseUser: validUser,
    invalidEmails: ["john", "john@", "@test.com"],
  },
};
