# capstone-project


Over the years the manual attendance has been carried across most of educational institutions. To overcome the

problems of manual attendance, we have developed “Classify” which is a web app along with a mobile app that deals

with the management of student’s attendance in details. The focus of the mobile application is to track the classroom

attendance/absence of students through qr code scanning instead of paper-based methods. In this way, the instructor

saves a lot of time and insures no cheating relating to attendance happens. The website automates the whole process of

keeping track of attendance, from calculating the attendance percentage of students for every session to keeping track of

students who are missing class too often. On the student’s perspective, each student has a username and password that

is used to log into the mobile, which contains a specific QR Code scanner that he/she can mark their presence during a

lecture as well as information regarding said student’s attendance, grades, and any announcements the instructor sends.

The system facilitates the end users with interactive design and automated processing of attendance management.

**Requirements**

For the Application:

1. Classify shall provide an interface for the student to sign in and authenticate himself/herself.


2. After the user logs in, he/she shall see the main page of the application which includes Home, Grades,
    Announcements, Attendance, and Data.
3. If the user is present in class, he/she shall select the Attendance icon where the user scans the barcode
    from the instructor’s page (website) in order to mark his presence in a specific course class.
4. If the user selects Grades, he/she can see the grades in this specific class.
5. The Announcements icon shall provide the news given from the instructor’s side.
6. The user shall select the Data icon to show how many times he/she was absent and if he/she is still in the
    safe zone.

For the Website:

1. Classify shall provide an interface for the instructor to sign in and authenticate himself/herself.
2. After the instructor logs in, he/she shall see the main page of the application which includes managing
    class, managing students, announcements, and grades. Also, separate bar for Home, Classes, and View
    Students.
3. Managing class shall provide course name, number of students, schedule, and the option to view or delete
    the class.
4. Managing students shall provide the name of each student, email, and icon in order to view or delete the
    student. Moreover, the instructor shall create a student, add to class, and import students form excel
    sheets.
5. When the instructor creates student, a separate email is sent to his email account with his own username
    and password.
6. If the Admin logs in, he/she shall see the list of usernames, their roles, date of creation, and option to reset
    password or delete account.

**Application Architecture**


Our mobile application and website follow the Client-Server architecture.

1. Client:

The Client part is composed of the android/ios application as well as the website frontend. The mobile app
gives the user the following capabilities:

1. Log in to the system
2. View the student’s rades in specific course
3. View the announcements from the instructor
4. QR code scanner to mark the presence of the student in the class
5. View the attendance data in each course to indicate how many times the user was absent in the course
6. View and edit user profile
7. Assure that a process successfully was done by QR scanning of generated codes

```
 The mobile app was developed using React Native, since it is a native framework meaning one code will create
an IOS and android App and thus making the application consistent on the 2 operating systems while also
greatly reducing the development time.
```
```
 As for the web frontend, we used React Js for development which is a JavaScript library for building user
interfaces that insures the frontend is optimal for fetching rapidly changing data that needs to be recorded
which very necessary in our project.
```
2. Server:

In order to maintain robustness in our server, we used Node Js-Meteor.

**Why we chose Meteor?**

Meteor is a full stack JavaScript framework (JS) made up of a collection of libraries and packages. Meteor allows you
to build applications in a faster way and using only one language on the client side and server side, which is JavaScript,
thus reducing the amount of context-switching. Meteor is also known for its real time activity. Any change is updated
automatically in all application layers from the database to template, and the change in the application will also appear
directly to the client without needing to refresh the web page each time a variation has happened, it is real time. With
Meteor, you use mongoDB as your database. MongoDB is non-SQL and document based. Concerning the security, it has many methods to ensure the security of data on the server as well as methods to specify which data the client can
have access to and to which data he/she cannot have access to.

**Mobile Application Design:**

The application is split based on the role of the logged in user, the instructor and student have different views of the
mobile app:

1. Student View:

```
The main activities are:
```
- Login
- Home
- Grades
- Announcements
- Attendance
- Attendance Data

 **Login Activity**

```
The Login Activity prompts the user to enter his/her login information,
which are the username and password that he/she has created an account
with. The user would enter the needed information and press on the
“Login” button. After the user logs in successfully, he/she will be taken to
the Main Application.
```

 **Home Activity**

This is the profile which includes the basic info

entered when the user sign in. Also, the user can edit

the profile.

- The user can see his/her grades.
- The user can see all the announcements
- The user can scan the QR code to mark the attendance
- The user can see in each course how much he/she is

absent.


 **Grades Activity**

- The user can see his/her grade in the specified
course.
- The user can see the Total Grade.

 **Attendance Activity**

This is where the user scans the QR code to
mark his/her presence in the class.


 **Attendance Data Activity**

- The user enters a specific course
- The user can see how much he/she were absent in the class.
- In accordance with the number of absence, the user can know if he/she is in the safe or danger

zone.


2. Instructor View:

```
The main activities are:
```
- Login
- Home
- Qr Code Generator

 **Login Activity**

```
The Login Activity prompts the user to enter his/her login
information, which are the username and password that
he/she has created an account with. The user would enter the
needed information and press on the “Login” button. After
the user logs in successfully, he/she will be taken to the
home page.
```

 **Home Page**

```
The homepage shows the instructor all the students in the
red zone, which similar to the website, are all the students that
have skipped more than half of the sessions. This works as a
quick launch feature from the website.
```
 **Qr Code Generator**

```
This page prompts the use to select a class, after which it
displays the last generated QR code for attendance for that
class, it also allows the user to generate a new one for a new
session using the button on the upper part of the page.
```

 Website Design:

**1. Login Page**

```
The Login Activity prompts the user to enter his/her login information, which are the
username and password that he/she has created an account with. The user would enter
the needed information and press on the “Login” button. After the user logs in
successfully, he/she will be taken to the Homepage.
```
**2. Home Page**


This is the home page when the instructor logs in

- The user can manage class
- The user can manage students
- The user can see all the announcements
- The user can see the grades of the students
- The user can see the daily attendance calendar


**3. Classes Page**

In the managing class, the user can:

- See the name of all the available courses
- See the number of students in each class
- See the schedule of each course
- view/delete class


```
This is the Class Profile which includes:
```
- How many students attended in the
specified date.

- How many students were absent in the
specified
date.
- The ratio of the attendance in each day.

The QRCODE for the attendance.

From the class profile, the instructor can use
the generate QR Code button to generate a QR
code specific for the session and class he
chooses, which then can be scanned by the
students in order to mark their attendance.


Manual Attendance which shows the
name of students, emails, and action.

When marking attendance, instead of
the QR code, the user can manually
mark the manually attendance of the
student.

The following form appears:


**4. Student Profile**

This shows the students information, attendance info (whether present or absent), and any grades
that the instructor has added for said student.


**5. Class Management**

This is the basic information of the Attendance Ratios, Class Description (Name, number of
allowed absences, and the Meeting Days), Manage Students (list of usernames and their
corresponding emails) which can be used to add or remove students from a class.


When Managing Students, the user can either add to class, create students, or import students.

6. Add to Class:


Create Student: Import Students:

The instructor can add a student either by using a form to create one student, or by using the
import students feature which prompts the instructor to upload an excel sheet containing multiple
students in a specific format which the server processes and automatically generates accounts for
the students.


Upon the creation of a student, an account is created for said student and an email is
automatically generated and sent to the chosen email, the email contains a randomly generated
password that the student can then use to login into the mobile app.

Creating Class:


 Admin Web View

The Admin can:

- See the list of username
- The role of each username
- Date of creation of the user
- The Admin can Reset password/Delete account.


Conclusion

Classify is significant to all organizations such as educational institutions. It can manage and
control the success of any organization by keeping track of people within the organization such
as students to maximize their performance. This application offers the process of monitoring
attend students, it aims to help the instructor in the classroom to manage and
record student’s presence electronically and directly without the need to list on paper so it will
save time and effort. This application can analyze the data and displays statistics about the
percentages and students’ warnings for the specified period. It is easy to use and friendly that has an attractive and simple design where insertions,
deletions, and changes of data can be done easily.
Further enhancement can be done to improve and update the website/application.


