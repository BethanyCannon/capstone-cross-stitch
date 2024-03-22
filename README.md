# Project Title

## Overview

X Stitch is a social cataloging website that would provide a centralized space for cross stitch enthusiasts to find new designs and share their work. For the sake and scope of this project I'm plannig to use antique and public domain patterns.

<!-- https://www2.cs.arizona.edu/patterns/weaving/topic_crossstitch.html -->
<!-- https://www.antiquepatternlibrary.org/html/warm/xstitch.htm -->
<!-- https://patternmakercharts.blogspot.com/2011/12/sajou-no-307.html -->

### Problem

I have been insterested in cross stitch for a while but have found it difficult to find designs that I like. Adding to this difficulty is the fact that individuals on sites like etsy will take advantage of new hobbiests to sell poorly made designs that may not even match their provided mock-ups. Ispired by websites like GoodReads, Letterboxd and Ravelry, a central social media site would have potential uses.

### User Profile

*Who will use your app? How will they use it?*
Cross Stitch enthusiasts could use it as a database to search through designs and find artists they like or art styles that fit their needs.

*Any special considerations that your app must take into account.*
Not that I can think of

### Features

- Icon should take the user back home
- A search bar to look up specific content
    - A search page that will pull up designs that match search terms
- Icon/avatar what will take their use to their account
- A Home page with a list of the 'newest' designs (20?) on display
- When clicking on a design it should go to a page 
    - that provides details on the design:
        - (fabric used, colours and brand used, size, difficulty,)
    - the ability to save a project (only for logged in users)
    - link to external site where design is being sold
- log-in and create accounts page
- User account that has a list of save projects

*List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.*

## Implementation

### Tech Stack

- React
- MySQL
- Express
- Client libraries: 
    - react
    - react-router-dom
    - axios
- Server libraries:
    - knex
    - express
    - cors/typescript
    - dotenv
    - nodemon
    - multer
    - mysql2
    - (possibly path or cloudinary)
    - react-modal
    - jsonwebtoken

### APIs

No external APIs for this project

### Sitemap

- User page
- Home page * (should share same page and pass data similar to brainfilx)
- Search page * (should share same page and pass data similar to brainfilx)
- Design detail page
- Sign in/Sign up page (might makes this this modal instead)

### Mockups

![](./mock_ups/HomePage.jpeg)
![](./mock_ups/ProfilePage.jpeg)
![](./mock_ups/DesignPage.jpeg)

### Data

![](./mock_ups/DataMap.png)

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.
- GET:
    - designs - sends list of designs
        - /designs
        - params: renders on homepage load
        - response (set limit to 10/15):

        {
            "id": 1,
            "design_name": "Cool Design",
            "creator_name": "Jane Doe"               (comes from foreign key "creator_id": "Jane Doe")
            "img_url": ["url", "url"]
        }

    - user data
        - /user/:id - sends user data 
        - params: token
        - response:
        {
            "id": 1,
            "avatar": "localhost-image1.jpg",
            "username": Idontknow,
            "favourites": [{obj}, {obj}, {obj}]
        }

    - get design details 
        - /designs/:id - 
        - params: design id, token
        - response:
        {
            "id": 1,
            "design_name": "Cool Design",
            "creator_id": "Jane Doe",               (comes from foreign key)
            "img_url": "localhost-image1.jpg",      (return first image only)
            "size": "16cm x 16cm"
            "thread_count": "4"
            "date_created": Jan 16 2024
            "favourites": "false"                   (logged in) 
        }

- POST
    - create user
        - /user/newuser
        - params: email, username, first_name, last_name, password, username, avatar
        - response:
        {
            "token": "token"
        }

    - log in user 
        - /user/:id 
        - params: email, password
        - response:
        {
            "token": "token"
        }

    - (login) add to favourites
       - /users/:id/favourites
       - params: user id, token

       {
        "id": 1
        "user_id": 1
        "design_id": 23
        "date_added": Jan 16 2024
       }

- DELETE
    - (login) delete from favourites
       - /user/:id/favourites/:id
       - params: user id, favourites id, token

       {
        remove item from favourite list, no response body
       }

### Auth

JWD token authentication for logging in and accessing favourites

## Roadmap

done - create client (score: 1)
    - routes & pages
        - pages: HomePage, DetailsPage, UserPage
        -cd routes: "/", "/:itemID", "/:userID"

done - create serve (score: 1)
    - routes, controllers

done - create migration (score: 2)

done - create seed (score: 2)
    - create 20 x stitch designs
    - create 1 user

done - feature-layout (score: 3)
    - front end:
        - set up sass: mixins, variables, typography, global styling
        - create header & nav bar
        - create footer
    
done - feature-homepage (4)
    - frontend: 
        - create page components (similar to mock up)
            - cross stitch card with data filled - .map
    - backend:
        - .get /designs
        - .get /design?limit=10 (or 15)

- features-signin-signup-page/modal (7)
    - frontend: 
        - create modals for signing in and signing up
        - include forms - sign up must be able to take an image in avatar
    - backend:
        - .post /user/:id & .post /user/newuser
        - JWT token auth
    sources to help with image uploading:
    <!-- https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data -->
    <!-- https://www.youtube.com/watch?v=dLXSJdTK9QI -->
    <!-- https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef -->

- feature-userpage (10)
    - frontend: 
        - create user page
            - include card displaying user information
            - favourites components - remove from favourites button
    - backend: 
        - .get /user/:id api
        - .delete /user/:id/favourite/:id

- feature-detailspage (5)
    - fronent:
        - create design details page (possibly find a way to make user page card component dynamic)
        - favourite:
            - if logged in should show if its favourited of not
            - button to remove from favourites (component?)
            - if not logged in should offer to login/create account
    - backend:
        - .get /design/:id

- feature-search-page (5)
    - frontend:
        - search bar should already be built - add functionality
    - backend:
        - /designs?="search-term" 
            - return items with title that matches part of of term



Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

## Nice-to-haves

- user details
    - edit user details
    - delete user (cascade to include favourites)
- projects components that can set a project as favourites, in-progess, or completed 
    - the ability to add notes to projects
    - bonus: (including photos)
- Filters so a user could refine their searches
- add creator value/authorization(?) - can edit & delete design pages
    - will also require (multiple) files uploads as opposited to avatars one