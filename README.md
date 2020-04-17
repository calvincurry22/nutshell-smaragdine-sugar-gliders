# Nutshell: The Information Dashboard

## Setup: Follow these steps exactly

## Pulling from gitHub
1. Clone this repository on to your local machine
1. `cd` into the directory it creates
1. Make a `database.json` file in the `api` directory
1. Open VS code and copy and paste the json template below into `database.json`
``{
  "users": [],
  "articles": [],
  "events": [],
  "tasks": [],
  "friends": [],
  "messages": []
}
``
1. Delete the `.ignore` file in the `api` directory

## Running the App
1. Open terminal
1. First be sure you cd into the `src` directory of the app in your terminal
1. Serve the data onto a local server port of your choice
1. Open another terminal tab and `cd` to the api directory
1. Serve json database using `json-server -p 8088 -w database.json`
1. Open your browser and visit the server site used in Step 3

## Navigating the App
1. First click on the `register` button to register your first account
1. Enter your information then save - this will log you into Nutshell
1. Explore our features:
  - Add tasks to the `To-Do list` to organize your own personal to-do list
  - Add events to the `Events` section to track upcoming events near you!
  - Add other users as `friends`!
    - Requires atleast one other user to be created
    - Feel free to logout and register another account to explore that functionality
  - Add articles to the `News` section to share news articles that interest you
  - Chat with other users by entering a message in the `Chat History` section
    - you can also add friends by clicking on a user's name in the chat history


