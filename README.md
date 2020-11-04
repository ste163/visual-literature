![VISLIT Logo](https://github.com/ste163/visual-literature/blob/se-readme-content/readme-assets/readme_logo-title.svg)
# Visual Literature (VISLIT)
>Track, visualize, and analyze progress on writing projects. 

GIF demo showcasing project view, adding progress to the table, and the dashboard

## Table of Contents
- [About](#About)
- [Installation](#Installation)
- [Usage](#Usage)
- [Technology Used](#Technology-Used)
- [Roadmap](#Roadmap)
- [Entity Relationship Diagram](#Entity-Relationship-Diagram)
- [Wireframe & Mockups](#Wireframe-&-Mockups)
- [Credits & Acknowledgements](#Credits-&-Acknowledgements)
- [License](#License)

## About
VISLIT came from my inability to easily manipulate the years worth of writing data I had accumulated. Excel worked great for keeping track of words written but was too cumbersome when it came to having multiple writing projects with different goals. Attempting to analyze that data to learn about my writing habits was overly difficult. VISLIT aims to make handling writing progress data easy.

## Installation

### Prerequisites
[json-server](https://github.com/typicode/json-server) to interact with the included database.

### Installing
- clone repo and cd into it
```
cd visual-literature
```

- Get the NPM stuff
```
RUN THE NPM CMD
```

- cd into the api/ directory and start json-server on port 8088
```
cd /api
json-server -p 8088 -w database.json
```

- in a new terminal window, in the visual-literature directory, run
```
npm start
```
Starts the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage
1. Create writing projects and set daily, weekly, or monthly word count goals
GIF
2. Enter progress towards goals and specify whether you proofread, edited, or revised
GIF
3. View and sort progress with tables
GIF
4. Visualize progress with dashboards
GIF

## Technology Used
[React](https://reactjs.org/) v16.14.0 <br>
[chart.js](https://www.chartjs.org/) v2.9.4 <br>
[date-fns](https://date-fns.org/) v2.16.1 <br>

## Roadmap
- Convert into an offline desktop application, using local storage (possibly by using [Electronjs](https://www.electronjs.org/))
- Improve UI/UX
- More data visualizations
- More indicators on goal progression

## Entity Relationship Diagram

## Wireframe & Mockup

## Credits & Acknowledgements
Logo design and project name - Shannon Swenton <br>
Logo and icons designed with - [Inkscape](https://inkscape.org/) <br>
Received help on the stacked bar charts from [Jamie Calder's codepen](https://codepen.io/jamiecalder/pen/NrROeB?editors=0010)
Readme design - [Art of README](https://github.com/noffle/art-of-readme#readme) and [Standard Readme](https://github.com/RichardLitt/standard-readme)

## License

## OUTLINE
X-Name
    Project Logo
X-One-line description
X-TOC

Installation
    - getting it and all the pre-reqs
    - installing it
    - configuring it (cmd line stuff)
    - running it!

X-Usage
X-Roadmap

ERD
    - image

Wire-frame & Mockup
    - image of wire-frame
    - then progressions of mockups
    (maybe three/4 small, hi-res images total)

X-Tech used
X-Credits
License