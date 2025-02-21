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

Visit `http://localhost:5173/` (or the port specified in Vite).

## How Pagination Works

- The API is queried with the following parameters:
  - **`limit`** (Number of products per page)
  - **`skip`** (Offset calculated as `(page - 1) * limit`)
- Clicking **Next Page** increases the `page` state and updates the API request.
- Clicking **Previous Page** decreases the `page` state.
- The **loading spinner** appears when fetching new data.
- The **pagination buttons** are disabled while data is loading.

## API Used

We use the **FakeStore API** for fetching product data:

```
GET https://fakestoreapi.com/products?limit=10&skip={skip}
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

## Enhancements & Future Improvements

- **Search & Filters**: Allow filtering by category, price range, etc.
- **Sorting**: Enable sorting by price, rating, or name.
- **Better UI/UX**: Improve responsiveness and accessibility.
- **Backend Integration**: Replace FakeStore API with a real backend.

## Troubleshooting

### Pagination Not Working?

1. **Check API Response**

   - Open the console (`F12 > Network Tab` in Chrome).
   - Ensure API requests are returning different data for different pages.

2. **Verify `skip` Calculation**

   - Ensure `skip = (page - 1) * limit` is correctly calculated in `fetchProducts()`.

3. **Check State Updates**

   - Log `page` changes in `useEffect`:

   ```tsx
   useEffect(() => {
     console.log("Page updated to:", page);
     fetchProducts(page);
   }, [page]);
   ```

