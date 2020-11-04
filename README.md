![VISLIT Logo](/readme-assets/readme_logo-title.svg)
# Visual Literature (VISLIT)
>Track, visualize, and analyze progress on writing projects. 
### Readme is WIP
- incomplete installation instructions
- no GIF demos

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
VISLIT came from my inability to easily manipulate the years worth of writing data I had accumulated. Excel worked great for keeping track of words written but was too cumbersome when it came to having multiple writing projects with different goals. Attempting to analyze that data to learn about my writing habits became overly difficult. VISLIT aims to make handling writing data easy.

### Built with
[React](https://reactjs.org/)

## Installation

### Prerequisites
[json-server](https://github.com/typicode/json-server) to interact with included database.

### Installing
1. clone repo and cd into it
```
cd visual-literature
```

2. Get the NPM stuff
```
RUN THE NPM CMD
```

3. cd into the api/ directory and start json-server on port 8088, watching database.json
```
cd /api
json-server -p 8088 -w database.json
```

4. in a new terminal window, in the visual-literature directory, run
```
npm start
```
```npm start``` begins the app. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

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
![Entity Relationship Diagram](/readme-assets/readme_ERD.png)

## Wireframe & Mockup
### Initial wireframe
![Wireframe](/readme-assets/readme_wireframe.png) <br>
### Initial mockup
![Mockup](/readme-assets/readme_mockup.png)

## Credits & Acknowledgements
- Logo design and project name - Shannon Swenton <br>
- Wireframe, mockups, logo, and icons designed with - [Inkscape](https://inkscape.org/) <br>
- Entity Relationship Diagram created with [dbdiagram](https://dbdiagram.io/) <br>
- Readme design - [Art of README](https://github.com/noffle/art-of-readme#readme) and [Standard Readme](https://github.com/RichardLitt/standard-readme)
- Received help on the stacked bar charts from [Jamie Calder's codepen](https://codepen.io/jamiecalder/pen/NrROeB?editors=0010) <br>