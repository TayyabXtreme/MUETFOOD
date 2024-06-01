# MUET Food Website

This is a fully responsive food website for MUET (Mehran University of Engineering and Technology) built with HTML, CSS, JavaScript, and Firebase. The site features user authentication and a real-time database to manage food orders.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Panel](#admin-panel)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive Design:** The website is fully responsive and works on all devices.
- **User Authentication:** Users can sign up, log in, and log out securely.
- **Real-Time Database:** Food orders and other data are stored and managed in real-time using Firebase.
- **Toasts for Notifications:** Uses Tostify for notifications to enhance user experience.

## Technologies Used

- **HTML:** Structure of the website.
- **CSS:** Styling of the website.
- **JavaScript:** Functionality of the website.
- **Firebase:** Backend services including authentication and real-time database.
- **Tostify:** For toast notifications.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/TayyabXtreme/MUETFOOD.git
    ```

2. Navigate to the project directory:

    ```bash
    cd muet-food-website
    ```

3. Open the `index.html` file in your browser to view the website.

4. Set up Firebase:
    - Go to [Firebase Console](https://console.firebase.google.com/)
    - Create a new project
    - Enable Authentication (Email/Password)
    - Create a Firestore database
    - Replace the Firebase configuration in `firebase-config.js` with your project details

## Usage

1. Open the website in your browser.
2. Sign up or log in using your email and password.
3. Browse the food menu and place your order.
4. Receive real-time updates and notifications.

## Admin Panel

The admin panel allows administrators to perform CRUD (Create, Read, Update, Delete) operations on dishes and categories. Additionally, administrators can manage orders by accepting or rejecting them and view payment details.

## Screenshots Home page annd Category Page

![Homepage](main.png)
*Description: Screenshot of the homepage.*

![Menu](main-2.png)
*Description: Screenshot of the food menu.*

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. Make your changes.
4. Commit your changes:

    ```bash
    git commit -m 'Add some feature'
    ```

5. Push to the branch:

    ```bash
    git push origin feature/your-feature-name
    ```

6. Open a pull request.
