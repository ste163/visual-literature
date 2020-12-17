![VISLIT Logo](/readme-assets/readme_logo-title.svg)
# Visual Literature (VISLIT)
>Track, visualize, and analyze progress on writing projects. 

![VISLIT Overview GIF](/readme-assets/readme_overview.gif)

## Table of Contents
- [About](#About)
- [Installation](#Installation)
- [Technologies Used](#Technologies-Used)
- [Entity Relationship Diagram, Wireframe, and Mockup](#Entity-Relationship-Diagram-ERD-Wireframe-and-Mockup)
- [Credits and Acknowledgements](#Credits-and-Acknowledgements)

## About
>For in-depth application use, visit [Visual Literature's website](https://ste163.github.io/visual-literature/){:target="_blank"}.

VISLIT came from my inability to easily manipulate the years worth of writing data I had accumulated. Excel worked great for keeping track of words written but was too cumbersome when I had multiple writing projects with different goals. VISLIT aims to make tracking, visualizing, and analyzing writing data easy.

### Built with
[React](https://reactjs.org/){:target="_blank"}

## Installation

### Prerequisites
- [json-server](https://github.com/typicode/json-server){:target="_blank"} to use database.

### Install
1. ```git clone``` repo and ```cd``` into it.
    ```
    git clone git@github.com:ste163/visual-literature.git
    cd visual-literature
    ```

2. Run ```npm install``` to install all required dependencies.
    ```
    npm install
    ```

3. ```cd``` into the api directory and start ```json-server``` on port 8088, watching database.json<br>
```json-server``` must be running to use VISLIT.
    ```
    cd api/
    json-server -p 8088 -w database.json
    ```

4. In a new terminal window, in the visual-literature directory, run ```npm start```.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    ```
    npm start
    ```


5. Once VISLIT has started, you may login as ```Author123``` to view demo data or create a new account.


## Technologies Used
- [React](https://reactjs.org/){:target="_blank"} v16.14.0 <br>
- [chart.js](https://www.chartjs.org/){:target="_blank"} v2.9.4 <br>
- [date-fns](https://date-fns.org/){:target="_blank"} v2.16.1 <br>
- [docsify.js](https://docsify.js.org/){:target="_blank"} v4.11.6 <br>


## Entity Relationship Diagram (ERD), Wireframe, and Mockup
|ERD |Wireframe |Mockup |
| ------ | ------ | ------ |
| ![Entity Relationship Diagram](/readme-assets/readme_ERD.png) | ![Wireframe](/readme-assets/readme_wireframe.png) | ![Mockup](/readme-assets/readme_mockup.png)

## Credits and Acknowledgements
- Logo design and project name - [Shannon Swenton](https://www.etsy.com/uk/shop/theshanconnection){:target="_blank"} <br>
- Wireframe, mockups, logo, and icons designed with - [Inkscape](https://inkscape.org/){:target="_blank"} <br>
- Entity Relationship Diagram created with [dbdiagram](https://dbdiagram.io/){:target="_blank"} <br>
- GIF screen recording - [screentogif](https://www.screentogif.com/){:target="_blank"} <br>
- Readme design - [Art of README](https://github.com/noffle/art-of-readme#readme){:target="_blank"} and [Standard Readme](https://github.com/RichardLitt/standard-readme){:target="_blank"} <br>
- Received help on the stacked bar charts from [Jamie Calder's codepen](https://codepen.io/jamiecalder/pen/NrROeB?editors=0010){:target="_blank"} <br>