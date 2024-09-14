# Simple Address Book Application

A lightweight, interactive address book application built using HTML, CSS, and JavaScript. The app allows users to manage contact information directly in the browser, using jQuery for dynamic DOM manipulation. This project demonstrates essential web development techniques without persistent data storage.

## Features

- **Create New Contacts**: Users can input contact details (name, phone, email, and address) and add new contacts to the list.
- **Edit Existing Contacts**: Modify any contact’s details using a built-in editing functionality.
- **Delete Contacts**: Remove contacts from the list.
- **Search Contacts**: Filter contacts based on name, email, phone number, or address.

## Technologies 

- **HTML5**: For structuring the content.
- **CSS3**: For styling the UI elements and ensuring responsive design.
- **JavaScript**: For application logic and dynamic interactions.
- **jQuery**: For DOM manipulation and event handling.

## Functionalities

### 1. **Create New Contact**
   - **Description**: Users can input a new contact’s details such as name, phone number, email, and address.
   - **How It Works**: Users fill out a form with contact information, and upon submission, the contact is dynamically added to the list after validation.

### 2. **Add New Contact**
   - **Description**: Add the newly created contact to the list.
   - **How It Works**: After the contact is created, it is displayed in the contact list on the page. This process is handled dynamically through jQuery without refreshing the page.

### 3. **Edit and Update Existing Contacts**
   - **Description**: Allows users to modify an existing contact’s details.
   - **How It Works**: Each contact has an "Edit" button. Upon clicking it, the existing details are loaded into the form for editing. Users can update the information, which will then be reflected in the contact list after submission.

### 4. **Delete Existing Contacts**
   - **Description**: Users can remove a contact from the address book.
   - **How It Works**: Each contact has a "Delete" button. When clicked, the contact is removed from the list dynamically without refreshing the page.

### 5. **Search Existing Contacts Based on Attributes**
   - **Description**: Users can search for contacts using attributes like name, email, phone number, or address.
   - **How It Works**: A search bar filters the list of contacts as the user types, showing only those that match the search criteria.

## Installation and Usage

1. Clone the repository:
    ```bash
    git clone https://github.com/20101301-Alina-Hasan/Simple-Address-Book-Application.git
    ```
2. Navigate to the project folder:
    ```bash
    cd Simple-Address-Book-Application
    ```
3. Open the `index.html` file in your browser to run the application.

## Deployment 

*Navigate to the [Address Book Demo Website](https://20101301-alina-hasan.github.io/Simple-Address-Book-Application/)*
