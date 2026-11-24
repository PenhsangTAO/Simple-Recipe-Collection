
<h1>Simple Recipe Collection. </h1>
Users post a recipe, browse/search the collection, and edit or delete their own recipes. Ratings and reviews, comments, and automatic ingredient matching are outside the required scope.

<h2>Features</h2>

- post an item → post a recipe (the create action)
- browse/search the board → browse/search the collection (the read/search action)
- mark their own item resolved → edit or delete their own recipes (the ownership-scoped action — users can only manage content they posted)
- claim verification / private messaging / automatic matching → ratings and reviews (trust/quality signals), comments (communication between users), automatic ingredient matching (smart suggestions)

<h2>Project Structure</h2>

├─ client-side
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.svg
│  │  └─ icons.svg
│  ├─ src
│  │  ├─ api
│  │  │  └─ client.js
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  ├─ hero.png
│  │  │  ├─ react.svg
│  │  │  └─ vite.svg
│  │  ├─ components
│  │  │  └─ Nav.jsx
│  │  ├─ context
│  │  │  └─ authContext.jsx
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  └─ pages
│  │     ├─ browseRecipes.jsx
│  │     ├─ createRecipe.jsx
│  │     ├─ Login.jsx
│  │     ├─ RecipeDetail.jsx
│  │     └─ Register.jsx
│  └─ vite.config.js
├─ package-lock.json
├─ README.md
└─ server-side
   ├─ package-lock.json
   ├─ package.json
   └─ src
      ├─ app.js
      ├─ config
      │  ├─ constants.js
      │  └─ database.js
      ├─ controller
      │  ├─ recipe.controller.js
      │  └─ user.controller.js
      ├─ middleware
      │  ├─ auth.js
      │  ├─ errorHandle.js
      │  ├─ ownership.js
      │  └─ upload.js
      ├─ model
      │  ├─ recipe.js
      │  └─ user.model.js
      └─ server.js

<h2>Prerequisites</h2>

**Node.js** (v24.20.0)
**npm** (v11.19.0)
**MongoDB** (Atlas)
**Git**

<h2>Environment Setup</h2>

For the client side:
- Open terminal
  - cd client-side
  - npm install
For the server side:
- Open terminal
  - cd server-side
  - npm install 

<h2>Testing</h2>

## Testing

The following test cases are used to verify the main functionalities, API operations, and system behavior of the application.

### Functional Testing

| Test Case           | Action / Input                    | Expected Result                        |
| ------------------- | --------------------------------- | -------------------------------------- |
| User Registration   | Submit valid registration details | New user account is created            |
| User Login          | Enter valid email and password    | User is authenticated and redirected   |
| Invalid Login       | Enter incorrect credentials       | Displays an authentication error       |
| View Recipes        | Open the recipe listing page      | Displays available recipes             |
| View Recipe Details | Select an existing recipe         | Displays the selected recipe's details |
| Create Recipe       | Submit valid recipe information   | Recipe is saved and displayed          |
| Edit Recipe         | Modify an existing recipe         | Recipe information is updated          |
| Delete Recipe       | Confirm recipe deletion           | Recipe is removed from the database    |
| Logout              | Select the logout option          | User session is terminated             |

### API Testing

| Test Case               | Method | Endpoint               | Expected Result                  |
| ----------------------- | ------ | ---------------------- | -------------------------------- |
| Get All Recipes         | GET    | `/api/recipes`         | Returns a list of recipes        |
| Get Recipe by ID        | GET    | `/api/recipes/:id`     | Returns the requested recipe     |
| Create Recipe           | POST   | `/api/recipes`         | Returns the newly created recipe |
| Update Recipe           | PUT    | `/api/recipes/:id`     | Updates the specified recipe     |
| Delete Recipe           | DELETE | `/api/recipes/:id`     | Deletes the specified recipe     |
| Invalid Recipe ID       | GET    | `/api/recipes/invalid` | Returns an appropriate error     |
| Missing Required Fields | POST   | `/api/recipes`         | Returns a validation error       |
| Unauthorized Request    | POST   | `/api/recipes`         | Returns an authentication error  |

### Database Testing

| Test Case           | Action / Input           | Expected Result                  |
| ------------------- | ------------------------ | -------------------------------- |
| Database Connection | Start the backend server | Successfully connects to MongoDB |
| Save Data           | Create a new recipe      | Recipe is stored in MongoDB      |
| Retrieve Data       | Request existing recipes | Correct records are returned     |
| Update Data         | Modify a recipe          | Changes are reflected in MongoDB |
| Delete Data         | Delete a recipe          | Record is removed from MongoDB   |

```
Simple-Recipe-Collection
├─ client-side
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.svg
│  │  └─ icons.svg
│  ├─ src
│  │  ├─ api
│  │  │  └─ client.js
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  ├─ hero.png
│  │  │  ├─ react.svg
│  │  │  └─ vite.svg
│  │  ├─ components
│  │  │  └─ Nav.jsx
│  │  ├─ context
│  │  │  └─ authContext.jsx
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  └─ pages
│  │     ├─ browseRecipes.jsx
│  │     ├─ createRecipe.jsx
│  │     ├─ Login.jsx
│  │     ├─ RecipeDetail.jsx
│  │     └─ Register.jsx
│  └─ vite.config.js
├─ package-lock.json
├─ README.md
└─ server-side
   ├─ package-lock.json
   ├─ package.json
   └─ src
      ├─ app.js
      ├─ config
      │  ├─ constants.js
      │  └─ database.js
      ├─ controller
      │  ├─ recipe.controller.js
      │  └─ user.controller.js
      ├─ middleware
      │  ├─ auth.js
      │  ├─ errorHandle.js
      │  ├─ ownership.js
      │  └─ upload.js
      ├─ model
      │  ├─ recipe.js
      │  └─ user.model.js
      └─ server.js

```