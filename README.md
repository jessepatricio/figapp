# figapp
Simple solution for consuming web api and displaying contacts with search, pagination, and filtering capabilities.

The application was developed and built using Microsoft .NET 8.0 web api and React 18.2.0 with Vite as the build tool and development server.

## Technology Stack

**Backend:**
- Microsoft .NET 8.0 Web API
- Entity Framework Core with SQLite
- AutoMapper for object mapping
- Newtonsoft.Json for JSON serialization

**Frontend:**
- React 18.2.0 with modern hooks (useState, useEffect, useCallback)
- Vite 5.0.0 for fast development and optimized builds
- Native Fetch API for HTTP client
- Semantic UI for styling
- rc-pagination for pagination component

**Additional Tools:**
- [csvjson converter] sample data csv is converted to json file using csvjson.com for data seeding in web api
- Vite's built-in development server with hot module replacement (HMR)

preparation: 2 hrs
coding: 6 hrs
styling: 30 minutes
building and testing: 1 hr

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- .NET 8.0 SDK
- npm or yarn package manager

### Running the Application

**Frontend Development (Vite):**
```bash
cd figApp
npm install
npm run dev
```
The Vite development server will start on `http://localhost:3000` with hot module replacement enabled.

**Backend Development:**
```bash
cd figAPI
dotnet watch run
```
The API will be available at `https://localhost:5001`

### Production Deployment

1. **Build the React application:**
   ```bash
   cd figApp
   npm install
   npm run build
   ```
   This creates an optimized production build in the `dist` folder.

2. **Copy the built files to the API project:**
   ```bash
   # Copy the dist folder contents to figAPI/wwwroot
   cp -r figApp/dist/* figAPI/wwwroot/
   ```

3. **Run the .NET API:**
   ```bash
   cd figAPI
   dotnet run
   ```

4. **Access the application:**
   Browse to `http://localhost:5000` or `https://localhost:5001/` to launch the web API that also hosts the client app.

### Available Scripts

**Frontend (figApp):**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

**Backend (figAPI):**
- `dotnet watch run` - Run with hot reload
- `dotnet run` - Run the application
- `dotnet build` - Build the application

## Vite Configuration

The project uses Vite with the following key configurations:

- **Development Server**: Runs on port 3000 with auto-open browser
- **Build Output**: Optimized production builds in `dist` folder
- **JSX Support**: Configured to handle both `.js` and `.jsx` files
- **Hot Module Replacement**: Enabled for fast development experience
- **ESBuild**: Used for fast bundling and transpilation

The Vite configuration is located in `figApp/vite.config.js` and includes:
- React plugin with JSX support
- Custom server settings
- Build optimization settings
- ESBuild loader configuration for JSX files

## Key Dependencies

**Frontend Dependencies:**
- `react` (^18.2.0) - React library
- `react-dom` (^18.2.0) - React DOM rendering
- `rc-pagination` (^3.2.0) - Pagination component

**HTTP Client:**
- Native Fetch API - Built-in browser API for HTTP requests

**Development Dependencies:**
- `vite` (^5.0.0) - Build tool and development server
- `@vitejs/plugin-react` (^4.2.0) - Vite plugin for React
- `@types/react` (^18.2.0) - TypeScript definitions for React
- `@types/react-dom` (^18.2.0) - TypeScript definitions for React DOM

**Backend Dependencies:**
- `Microsoft.EntityFrameworkCore.Sqlite` (8.0.0) - SQLite database provider
- `AutoMapper.Extensions.Microsoft.DependencyInjection` (12.0.1) - Object mapping
- `Pomelo.EntityFrameworkCore.MySql` (8.0.2) - MySQL database provider
- `Newtonsoft.Json` (13.0.3) - JSON serialization

## Migration Benefits

The migration to Vite provides several advantages:

- **Faster Development**: Vite's development server starts instantly and provides lightning-fast HMR
- **Modern Build Tool**: Uses ESBuild for fast bundling and native ES modules
- **Better Performance**: Optimized production builds with tree-shaking
- **Modern React**: Updated to React 18 with modern hooks and improved performance
- **Simplified Configuration**: Less configuration needed compared to Create React App
- **Better Developer Experience**: Faster builds and more intuitive development workflow

Remarks:
  the solution can be enhance by adding the following features:
   - Security (Authentication/ Role permission)
   - CRUD operation to create and modify contacts
   - Form validations for preserving data integrity
   - User activity logger
   - Use robust and scalable production server such as Postgrest, MSSQL Server, etc.
   - Deploy to a Cloud or onPremise infrastructure.
   - Enhance search capabilities by adding more fields in filtering methods.

<p align="center">
  <img alt="figapp" src="https://github.com/jessepatricio/content/blob/master/figapp.png">
</p>


