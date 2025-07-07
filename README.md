# Product Listing Application

This is a full-stack web application featuring a backend API to serve product information and a frontend interface to display and filter those products.

## Features

### Backend

- **RESTful API**: Built with Node.js and Express.
- **Product Data**: Serves product data from a JSON file.
- **Server-Side Filtering**: Filters products by price and popularity on the server before sending them to the client.

### Frontend

- **Modern UI**: Developed with React.js.
- **Product Carousel**: Browse products using navigation arrows or by swiping (on touch devices).
- **Color Selector**: Dynamically change product images by selecting a color variation (Yellow Gold, White Gold, Rose Gold).
- **Image Preloading**: Product images for all color variations are preloaded to prevent lag when switching colors.
- **Price Formatting**: Prices are cleanly formatted to two decimal places.
- **Responsive Design**: The layout adapts to different screen sizes for a seamless experience on any device.
- **Client-Side Filtering**: Interactive sliders to filter products by price range and minimum popularity score.

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React.js, CSS, React Slick Carousel
- **Data Source**: JSON file
- **Packages**:
  - **Backend**: `axios`, `cors`, `express`
  - **Frontend**: `axios`, `react`, `react-dom`, `react-scripts`, `react-slick`

## Project Structure

```
/
├── backend/           # Backend API
│   ├── server.js      # Main server file
│   ├── routes/        # API routes
│   ├── controllers/   # Business logic
│   └── data/          # JSON data files
│
└── frontend/          # React frontend
    ├── public/        # Static assets (HTML, favicon)
    └── src/           # Source code
        ├── components/# React components
        ├── services/  # API services
        ├── assets/    # Images, logos
        └── styles/    # CSS files
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will be running at `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will be running at `http://localhost:3000`.

## API Endpoints

- `GET /api/products`

  - Fetches all products. The response can be filtered using query parameters.
  - **Query Parameters**:

    - `minPrice` (number): Minimum price for the desired range.
    - `maxPrice` (number): Maximum price for the desired range.
    - `minPopularity` (number): Minimum popularity score (from 0 to 5).

  - **Example**: `GET /api/products?minPrice=1000&maxPrice=5000&minPopularity=4`
