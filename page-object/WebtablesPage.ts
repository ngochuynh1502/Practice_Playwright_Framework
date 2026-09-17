import { Element } from "../core/elements/element";
import { BasePage } from "./BasePage";

export interface UserRecord {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export class WebtablesPage extends BasePage {
  addButton: Element;
  firstNameInput: Element;
  lastNameInput: Element;
  emailInput: Element;
  ageInput: Element;
  salaryInput: Element;
  departmentInput: Element;
  submitButton: Element;
  searchInput: Element;
  rowsPerPageSelect: Element;
  tableRows: Element;
  registrationDialog: Element;
  closeButton: Element;

  constructor(page: any) {
    super(page);
    this.addButton = new Element("#addNewRecordButton");
    this.firstNameInput = new Element("#firstName");
    this.lastNameInput = new Element("#lastName");
    this.emailInput = new Element("#userEmail");
    this.ageInput = new Element("#age");
    this.salaryInput = new Element("#salary");
    this.departmentInput = new Element("#department");
    this.submitButton = new Element("#submit");
    this.searchInput = new Element("#searchBox");
    this.rowsPerPageSelect = new Element("select.form-control");
    this.tableRows = new Element("tbody tr");
    this.registrationDialog = new Element("div[role='dialog']");
    this.closeButton = new Element(".btn-close")
  }

  async addUser(user: UserRecord): Promise<void> {
    await this.addButton.click();
    await this.firstNameInput.fillText(user.firstName);
    await this.lastNameInput.fillText(user.lastName);
    await this.emailInput.fillText(user.email);
    await this.ageInput.fillText(user.age);
    await this.salaryInput.fillText(user.salary);
    await this.departmentInput.fillText(user.department);
    await this.submitButton.click();
  }

  async addRandomUsers(count: number): Promise<UserRecord[]> {
    const users = Array.from({ length: count }, (_, index) =>
      this.createRandomUser(index),
    );
    for (const user of users) {
      await this.addUser(user);
    }
    return users;
  }

  async searchUser(email: string): Promise<void> {
    await this.searchInput.fillText(email);
  }

  async getVisibleRowCount(): Promise<number> {
    return await this.tableRows.getNumberOfElements();
  }

  async getVisibleUsers(): Promise<string[]> {
    await this.rowsPerPageSelect.selectOption("50");
    return await this.tableRows.allInnerTexts();
  }

  private createRandomUser(index: number): UserRecord {
    const suffix = `${Date.now()}${index}${Math.floor(Math.random() * 10)}`;

    return {
      firstName: `AutoFirst${suffix}`,
      lastName: `AutoLast${suffix}`,
      email: `auto${suffix}@example.com`,
      age: String(20 + Math.floor(Math.random() * 41)),
      salary: String(30000 + Math.floor(Math.random() * 20)),
      department: `QA-${Math.floor(Math.random() * 30)}`,
    };
  }

  async isRegistrationDialogVisible(): Promise<boolean> {
    return await this.registrationDialog.isVisible();
  }
  async closeRegistrationDialog(): Promise<void> {
    await this.closeButton.click();
}
}
