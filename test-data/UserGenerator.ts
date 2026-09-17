import { UserRecord } from "../models/user-record";

export function createRandomUser(index: number)
: UserRecord {
    const suffix = `${Date.now()}${index}${Math.floor(Math.random() * 10)}`;
    const sequence = (index + 1).toString().padStart(2, "0");

    return {
      firstName: `AutoFirst${sequence}`,
      lastName: `AutoLast${sequence}`,
      email: `auto${sequence}_${suffix}@example.com`,
      age: String(20 + Math.floor(Math.random() * 41)),
      salary: String(30000 + Math.floor(Math.random() * 20)),
      department: `QA-${Math.floor(Math.random() * 30)}`,
    };
  }
