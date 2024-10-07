# TypeScript Interfaces for OceanCapp University Management System

This document outlines the TypeScript interfaces used in the OceanCapp University Management System to define the structure of the data handled within the system.

## MenuItem Interface

```typescript
interface MenuItem {
    key: string;
    icon?: React.ReactNode;
    label: React.ReactNode | string;
    children?: MenuItem[];
}
```

### MenuItem Interface Description

- The `MenuItem` interface defines the structure for items in the navigation menu:
  - `key`: Unique identifier for the menu item.
  - `icon`: Optional icon to be displayed alongside the label.
  - `label`: The text or React node for the menu label.
  - `children`: Optional nested sub-menu items.

---

## Course Interface

```typescript
interface Course {
    courseId: string;
    courseName: string;
    professorName: string;
    professorEmail: string;
    credits: number;
    duration: string;
    grade?: string;
    semester?: string;
    department?: string;
    capacity?: number;
    enrolled?: number;
}
```

### Course Interface Description

- The `Course` interface defines the structure for course-related data:
  - `courseId`: Unique identifier for the course.
  - `courseName`: Name of the course.
  - `professorName`: Name of the professor teaching the course.
  - `professorEmail`: Contact email of the professor.
  - `credits`: Number of credits for the course.
  - `duration`: Duration of the course.
  - `grade`: Optional field for the grade obtained.
  - `semester`: Optional field for the semester in which the course is taken.
  - `department`: Optional field for the department offering the course.
  - `capacity`: Optional field representing the total capacity of the course.
  - `enrolled`: Optional field for the number of students currently enrolled.

---

## Event Interface

```typescript
interface Event {
    eventId: string;
    title: string;
    date: Date;
    description: string;
}
```

### Event Interface Description

- The `Event` interface defines the structure for university event-related data:
  - `eventId`: Unique identifier for the event.
  - `title`: Title of the event.
  - `date`: Date of the event.
  - `description`: Brief description of the event.

---

## StudentData Interface

```typescript
interface StudentData {
    studentName: string;
    studentId: string;
    studentEmail: string;
    studentImage: string;
    admissionDate: Date;
    currentSemester: string;
    expectedGraduationDate: Date;
    currentCourses: Course[];
    finishedCourses: Course[];
    upcomingEvents: Event[];
}
```

### StudentData Interface Description

- The `StudentData` interface captures all essential data related to a student:
  - `studentName`: Full name of the student.
  - `studentId`: Unique identifier for the student.
  - `studentEmail`: Email address of the student.
  - `studentImage`: URL of the student's profile picture.
  - `admissionDate`: Date when the student was admitted.
  - `currentSemester`: Current semester the student is enrolled in.
  - `expectedGraduationDate`: Expected date of graduation for the student.
  - `currentCourses`: Array of currently enrolled courses.
  - `finishedCourses`: Array of courses the student has completed.
  - `upcomingEvents`: Array of upcoming events for the student.

---

## Faculty Interface

```typescript
interface Faculty {
    facultyId: string;
    facultyName: string;
    designation: string;
    subjects: string[];
    officeHours: string;
    contactEmail: string;
    gender: "men" | "women";
}
```

### Faculty Interface Description

- The `Faculty` interface defines the structure for data about faculty members:
  - `facultyId`: Unique identifier for the faculty member.
  - `facultyName`: Full name of the faculty member.
  - `designation`: Designation or position of the faculty member.
  - `subjects`: Array of subjects the faculty member teaches.
  - `officeHours`: Office hours of the faculty member.
  - `contactEmail`: Email address for contacting the faculty member.
  - `gender`: Gender of the faculty member (restricted to "men" or "women"). It is used for getting dummy images for profile pictures from [random-user](https://randomuser.me/) based on gender.

---

## RegistrationInfo Interface

```typescript
interface RegistrationInfo {
    studentName: string;
    email: string;
    courseIds: string[];
}
```

### RegistrationInfo Interface Description

- The `RegistrationInfo` interface is used for handling course registration
  - `studentName`: Name of the student registering for courses.
  - `email`: Email address of the student.
  - `courseIds`: Array of course IDs the student is registering for.
