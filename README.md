# Tiger Analytics AdminJS Template

A comprehensive administrative panel built with AdminJS, Express, and Sequelize to help you quickly set up administrative interfaces for your projects.

![Tiger Analytics AdminJS Template](https://www.tigeranalytics.com/wp-content/uploads/2023/07/hero-image-1.jpg)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Customizing Database Models](#customizing-database-models)
- [Registering Resources in AdminJS](#registering-resources-in-adminjs)
- [Customizing the UI](#customizing-the-ui)
- [Running the Application](#running-the-application)
- [Authentication](#authentication)
- [Advanced Customization](#advanced-customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Ready-to-use Admin Panel**: Built using AdminJS, providing a React-based interface for your data
- **Database Integration**: Sequelize ORM for easy database operations
- **Express Backend**: Robust Express.js server
- **Authentication**: Built-in authentication system
- **Customizable UI**: Branding and UI customization options with Tiger Analytics styling
- **Responsive Design**: Works on desktop and mobile
- **Development Ready**: Includes npm scripts for both development and production environments

## Installation

1. Clone the repository:

```bash
git clone https://github.com/tigeranalytics/adminjs-template.git
cd adminjs-template
```

2. Install dependencies:

```bash
npm install
```

3. Initialize your database models (described in detail in the [Customizing Database Models](#customizing-database-models) section).

4. Set up your environment variables by creating a `.env` file (see [Environment Setup](#environment-setup) section).

5. Start the application:

```bash
# For development with auto-reload
npm run dev

# OR for production
npm start
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_DIALECT=postgres  # postgres, mysql, mariadb, sqlite, mssql

# Admin Configuration
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password

# JWT Secret for Authentication
JWT_SECRET=your_secure_jwt_secret

# Cookie Settings
COOKIE_SECRET=your_secure_cookie_secret
COOKIE_NAME=adminjs
```

Adjust the values according to your project requirements.

## Customizing Database Models

The template uses Sequelize ORM for database operations. To customize database models for your project:

1. Navigate to the `models` directory:

```bash
cd models
```

2. Edit existing model files or create new ones following this structure:

```javascript
// models/example.js
module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define("Example", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  });

  Example.associate = (models) => {
    // Define associations here
    // Example.belongsTo(models.User);
    // Example.hasMany(models.Item);
  };

  return Example;
};
```

3. Make sure to define any associations between models in the `associate` function.

4. After creating your models, register them in the `models/index.js` file:

```javascript
// This should happen automatically if you follow the Sequelize pattern
// The models/index.js file scans the directory and loads all models
```

## Registering Resources in AdminJS

After defining your models, you need to register them as resources in AdminJS.

1. Open `index.js` in the root directory.

2. Find the resources section in the AdminJS configuration:

```javascript
const adminJs = new AdminJS({
  resources: [
    // Your resources will go here
  ],
  rootPath: "/admin",
  // Other configurations...
});
```

3. Add your models as resources:

```javascript
const adminJs = new AdminJS({
  resources: [
    {
      resource: db.User,
      options: {
        // Customize how this resource appears and behaves
        navigation: {
          name: 'User Management',
          icon: 'User',
        },
        properties: {
          password: {
            isVisible: {
              list: false, 
              filter: false,
              show: false,
              edit: true,
            },
            type: 'password'
          },
          // Customize other properties...
        }
      }
    },
    {
      resource: db.Example,
      options: {
        navigation: {
          name: 'Examples',
          icon: 'Settings',
        },
        // Other options...
      }
    },
    // Add more resources...
  ],
  rootPath: "/admin",
  // Other configurations...
});
```

4. Customize the options for each resource according to your needs.

## Customizing the UI

The template comes with a pre-configured UI, but you can customize it to match your brand.

### Basic Branding

Modify the branding configuration in `index.js`:

```javascript
const adminJs = new AdminJS({
  // resources configuration...
  branding: {
    companyName: "Your Company Name",
    logo: "/assets/your-logo.png",
    favicon: "/assets/favicon.ico",
    theme: {
      colors: {
        primary100: "#YOUR_PRIMARY_COLOR",
        accent: "#YOUR_ACCENT_COLOR",
        // Add more color overrides...
      }
    },
    loginPage: {
      backgroundImage: "/assets/your-login-background.jpg",
      welcomeMessage: "Welcome to Your Admin Panel",
    }
  },
  // Other configurations...
});
```

### Custom CSS

Add custom CSS to further style the admin panel:

1. Create a CSS file in the `public` directory (e.g., `public/adminjs-custom.css`).
2. Add your custom styles.
3. Include the CSS file in the AdminJS configuration:

```javascript
const adminJs = new AdminJS({
  // Other configurations...
  assets: {
    styles: ['/adminjs-custom.css'],
  },
});
```

### Custom Components

For advanced UI customization, you can create custom React components:

1. Create your components in the `.adminjs/components` directory.
2. For example, to customize the login page, create `.adminjs/components/Login.jsx`:

```jsx
import React from 'react';
import { Box, H2, Text, Input, Button, FormGroup } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';

// Your custom styled components here

const Login = (props) => {
  const { action, error } = props;

  return (
    <Box
      flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      // Your custom styling
    >
      {/* Your custom login form */}
      <form method="POST" action={action}>
        {/* Form fields */}
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
```

3. Register the component in the AdminJS configuration:

```javascript
const adminJs = new AdminJS({
  // Other configurations...
  componentLoader: {
    components: {
      Login: {
        path: '.adminjs/components/Login.jsx',
      },
      // Other custom components...
    },
  },
});
```

## Running the Application

We've added convenient npm scripts to package.json to make running the application easier:

### Development Mode

Run the application with nodemon for automatic reloading during development:

```bash
npm run dev
```

This will start the server using nodemon, which automatically restarts the server when you make changes to your code.

### Production Mode

For production deployment:

```bash
npm start
```

This will start the server in production mode using Node.js directly.

The admin panel will be available at `http://localhost:3000/admin` (or the port you configured in your .env file).

### Accessing the Admin Panel

After starting the server:
1. Navigate to `http://localhost:3000/admin` in your browser
2. Log in using the credentials specified in your `.env` file
3. You'll be directed to the dashboard with your customized Tiger Analytics branding

## Authentication

The template comes with built-in authentication. The default login credentials are set in your `.env` file:

```
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password
```

To customize authentication:

1. You can modify the authentication options in the `buildAuthenticatedRouter` function in `index.js`.
2. For custom authentication logic, modify how the user is authenticated and retrieved from the database.

## Advanced Customization

### Custom Actions

You can add custom actions to resources:

```javascript
{
  resource: db.Example,
  options: {
    actions: {
      customAction: {
        actionType: 'record',
        icon: 'View',
        handler: async (request, response, context) => {
          const { record, currentAdmin } = context;
          // Custom logic here
          return {
            record: record.toJSON(currentAdmin),
            msg: 'Action completed successfully',
          };
        },
      },
    },
  },
}
```

### Hooks

Use hooks to perform actions before or after CRUD operations:

```javascript
{
  resource: db.Example,
  options: {
    properties: {
      // Property configurations...
    },
    actions: {
      new: {
        before: async (request, context) => {
          // Logic to execute before creating a new record
          return request;
        },
        after: async (response, context) => {
          // Logic to execute after creating a new record
          return response;
        },
      },
      // Configure other actions...
    },
  },
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Developed with ❤️ by [Tiger Analytics](https://www.tigeranalytics.com)

