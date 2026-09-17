# My Portfolio - Rohan Murmu Portfolio

Welcome to my portfolio! This is a modern, responsive, and visually appealing portfolio built with **React**, **Vite**, and **GSAP** for animations. It also integrates **Firebase** for the contact form, making it easy for visitors to get in touch. The portfolio showcases my skills and projects, in a clean and interactive way.

---

## Live Demo

Check out the live version of my portfolio here:  
👉 [Here](https://rohan-murmu.vercel.app/)

---

## Technologies Used

- **Frontend**: React, Vite Bundler, GSAP (for animations).
- **Styling**: CSS (custom styles).
- **Backend Integration**: Firebase (for the contact form).

---

## How to Use and Customize

1. **Prerequisites**:
   - Ensure Node.js and npm are installed on your system.
   - Clone the repository:
     ```bash
     git clone https://github.com/scythrine05/rohan-murmu.git
     cd rohan-murmu
     ```

2. **Install Dependencies**:
   - Run the following command to install all dependencies:
     ```bash
     npm install
     ```

3. **Edit Your Data**:
   - Update the `skillData` and `cardsData` files to reflect your own skills and projects.

4. **Set Up Firebase**:
   - Create a Firebase project and enable the Firestore database.
   - Add your Firebase configuration to the `.env` file:
     ```env
     VITE_FIREBASE_API_KEY=your-firebase-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-firebase-app-id
     ```

5. **Start the Application**:
   - Run the development server:
     ```bash
     npm run dev
     ```
   - The portfolio will be available at `http://localhost:5173`.

---

## Contributing

Feel free to fork this repository and customize it for your own portfolio. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Happy coding!
