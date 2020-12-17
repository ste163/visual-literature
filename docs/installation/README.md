# Installation

## Prerequisites
- [json-server](https://github.com/typicode/json-server) to use database.

## Install
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