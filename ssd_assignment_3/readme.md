# Assignment 2: HTML/CSS/JS

**Name:** Bhanuj
**Roll no.:** 2022201068

---

## Question 1

**Description:** Created a Kaoaa board game using 3D libraries. I have used two 3D libraries **three.js** and **tilt.js**.

**Assumption:**

1. It is assumed that game would be played in the full screen mode only. As the board has to move and there are more than 2 dimensions, to handle the responsiveness scroll has been implemented.
2. All the moves are decided by users only to make the game fair. It is assumed that if vulture can kill, it may or may not kill depending on the player's move.
3. Crow has a blue color whereas vulture has a red color.
4. For better user experience, sounds and animations are added to the game.
5. All the rules of the game are followed, player can only move to adjacents whereas vulture can jump the crows if opportunity arrives.

**Steps to Execute**

```sh
$ cd Q1
$ npm install
$ npm run dev
```

Follow the local host port mentioned in the terminal to run the application.

---

## Question 2

**Description:** Add a feature of logging events in a file. I have added buttons to download text files.

**Assumption:**

1. Mouse logs button will create file mentioning all the mouse events.
   Format of the file would be:
   \<element-id>: \<mouse-event-1>, \<mouse-event-2>, \<mouse-event-2>,
   Each line will have continuous mouse event related to particular id.
2. Game logs button will create a file mentioning the game events.
   eg: _Crow 1 moved from Circle 1 to Circle 2_

**Steps to Execute**

```sh
$ cd Q2
$ npm install
$ npm run dev
```

Follow the local host port mentioned in the terminal to run the application.

---

## Question 3

**Description:** Create a news website that would fetch the data from external JSON file and display it in the web page.

**Assumption:**

1. 5 external JSON files have been put in the public directory, in order to serve the data for the application.
2. **/** page will show multiple tabs with each tab has number of news for specific category.
3. By clicking each news card, it will take you to **/:category/:id** of the news which is a dedicated page for a specific news.
4. Advertisements are fetched from **Unsplash Image API**, which is present at the bottom of each page. The news automatically updates using carousel.

**Steps to Execute**

```sh
$ cd Q3
$ npm install
$ npm run dev
```

Follow the local host port mentioned in the terminal to run the application.
