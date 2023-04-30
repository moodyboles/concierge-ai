
# Caterer Concierge AI

The software project aims to address the challenges that chefs face when planning menus for dinner parties. The platform is designed to simplify the process by leveraging artificial intelligence to generate personalized and curated menu suggestions based on the user's inputs. With this software, chefs can effortlessly create a menu that caters to guests' dietary restrictions and allergies, considers the cuisine, and is unique and relevant to the event type. The app provides API endpoints which enabled easy integration of this service into other businesses' systems. This innovative approach eliminates the need for manual menu planning, making it a time-saving and efficient tool for chefs and event planners alike.



## Demo

https://concierge.moodyboles.com


## Tech Stack

**Client:** React, TailwindCSS

**Server:** PHP ^8.1, Node 18.x, Laravel 10


## Run Locally

Clone the project

```bash
  git clone https://github.com/moodyboles/concierge-ai.git
```

Go to the project directory

```bash
  cd concierge-ai
```

Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Install frontend dependencies

```bash
  npm install
```

Build frontend

```bash
  npm run dev
```

Start the local development server

    php artisan serve

You can now access the server at http://localhost:8000


## Folders
- `app/Models` - Contains all the Eloquent models
- `app/Http/Controllers` - Contains all the app controllers
- `app/Http/Controllers/Api` - Contains all the api controllers
- `app/Http/Middleware` - Contains the middlewares
- `app/Classes/AI` - Contains AI Classes
- `app/Service` - Contains Service Classes
- `config` - Contains all the application configuration files
- `database/migrations` - Contains all the database migrations
- `routes` - Contains all the routes
## API Endpoints

#### Generate dishes menu from event details

```http
  GET /api/v1/generate-dishes
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | **Required**. e.g. "Dinner" |
| `occasion` | `string` | **Required**. e.g. "date_night" |
| `cuisines` | `array` | **Required**. e.g. "["Italian", "Indian"]" |
| `diets` | `array` | e.g. ["Vegan"] |

Headers:
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `bearer` | **Required**. your API token |



## Authors

- [@MoodyBoles](https://www.github.com/moodyboles)


## License

[MIT](https://choosealicense.com/licenses/mit/)

