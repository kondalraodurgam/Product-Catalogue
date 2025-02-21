# Product List Pagination - README

## Overview

This project implements a **React-based Product List** with pagination, fetching data from an API while ensuring smooth navigation and state management.
![image](https://github.com/user-attachments/assets/1f53e1cd-df5d-4f5e-85c4-773f0d8f5333)
![image](https://github.com/user-attachments/assets/177bd85f-33b8-4daa-b0c6-61fab07d7a8e)
![image](https://github.com/user-attachments/assets/260782e7-14b1-4774-a07b-9f9e64849cb0)


## Features

- Fetches product data from an API with pagination support.
- Displays **loading indicators** while fetching new data.
- Handles pagination by dynamically updating the API request.
- Disables pagination buttons when data is loading.
- Shows product details, including **image, price, category, and rating**.

## Tech Stack

- **React** (Functional Components, Hooks)
- **TypeScript** (For type safety)
- **Tailwind CSS** (For styling)
- **React Router** (For navigation)
- **Lucide React Icons** (For UI icons)
- **React Hot Toast** (For error handling and notifications)

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```sh
npm install  # or yarn install
```

### 3. Run the Application

```sh
npm run dev  # or yarn dev
```

### 4. Open in Browser

Visit `http://localhost:5173/`

## API Used

We use the **FakeStore API** for fetching product data:

```
GET https://fakestoreapi.com/products
```

## File Structure

```
/src
  ├── components
  │   ├── ProductList.tsx  # Main Product List Component
  │   ├── Navbar.tsx       # Navbar with Logout Button
  │   └── Pagination.tsx   # Handles pagination UI
  ├── context
  │   ├── AuthContext.tsx  # Authentication Context
  ├── services
  │   ├── api.ts           # API request functions
  ├── App.tsx              # Main Application
  ├── main.tsx             # React DOM Rendering
```

 **Check State Updates**

   - Log `page` changes in `useEffect`:

   ```tsx
   useEffect(() => {
     console.log("Page updated to:", page);
     fetchProducts(page);
   }, [page]);
   ```

