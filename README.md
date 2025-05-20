## Overview  

This React application provides a complete user management interface where users, albums, and photos are managed with real-time API interactions using Redux Toolkit.

The app displays a table of all users, and allows the following operations:

✅ Create new users

❌ Delete existing users

📂 View albums associated with each user

➕ Create new albums per user

🖼️ View and add photos in each album

❌ Delete albums or photos

🔧 Technical Details
Redux Toolkit (RTK) is used for state management.

Async Thunks handle user-related actions such as fetching, adding, and deleting users.

RTK Query and Mutations (via createApi) are used for handling album and photo API requests.

Every interaction — like adding or deleting an album or photo — triggers an actual API call to the respective AlbumsAPI or PhotosAPI.

This setup demonstrates a modern, modular approach to building scalable React apps using Redux Toolkit's full capabilities.
