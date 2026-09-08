import { userData } from '../test-data/UserData';

export type TestDataFixtures = {
  userData: typeof userData;
  bookTitle: string;
  searchKeywords: string[];
};

export const testDataFixtures: TestDataFixtures = {
  userData,
  bookTitle: 'Learning JavaScript Design Patterns',
  searchKeywords: ['Design', 'design', 'test'],
};
