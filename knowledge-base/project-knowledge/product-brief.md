# Product Brief

## Overview

A simple User Management web application that allows administrators to view, search, and add employee records. The application is based on the DemoQA Web Tables module and serves as a learning platform for requirement analysis, test design, test automation, and AI-powered QA workflows.

---

## Target Users

- System Administrators
- QA Engineers
- Test Automation Engineers
- Software Testers

---

## Core Features

### 1. View User List

Allow administrators to view employee records in a tabular format.

Displayed information:

- First Name
- Last Name
- Age
- Email
- Salary
- Department

### 2. Search User

Allow administrators to search employee records using keywords.

Searchable fields:

- First Name
- Last Name
- Email
- Department

### 3. Add User

Allow administrators to create a new employee record.

Required fields:

- First Name
- Last Name
- Email
- Age
- Salary
- Department

Validation rules:

- Email must be valid.
- Email must be unique.
- Age must be between 18 and 65.
- Salary must be greater than 0.

---

## Out of Scope

- User authentication and authorization
- User role management
- Edit User
- Delete User
- Import/Export users
- Audit logging
- Notifications
- Reporting

---

## Tech Stack

### Frontend

- React
- TypeScript
- DemoQA UI Components

### Backend

- Mock API / In-Memory Data Service

### Data / Storage

- Browser Memory (DemoQA)
- Mock Test Data
``