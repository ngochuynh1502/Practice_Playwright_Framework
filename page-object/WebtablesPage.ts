import { Element } from "../core/elements/element";
import { UserRecord } from "../models/UserRecord";

export class WebtablesPage {
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

  constructor() {
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
    this.closeButton = new Element(".btn-close");
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

  async searchUser(email: string): Promise<void> {
    await this.searchInput.fillText(email);
  }

  async getVisibleRowCount(): Promise<number> {
    return await this.tableRows.getNumberOfElements();
  }

  async showNumberOfRecord(numberOfRecords: number): Promise<string[]> {
    await this.rowsPerPageSelect.selectOption(numberOfRecords.toString());
    return await this.tableRows.allInnerTexts();
  }


  async isRegistrationDialogVisible(): Promise<boolean> {
    return await this.registrationDialog.isVisible();
  }

  async closeRegistrationDialog(): Promise<void> {
    await this.closeButton.click();
  }
}
