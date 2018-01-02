## Project description

A React powered marketing dashboard adapted from the Gentelella bootstrap admin template by [colorlib](https://colorlib.com/polygon/gentelella/index.html).

This project integrates:

* [Plotly.js](https://plot.ly/javascript/) (charting library).
* A spinner with [react-spin](https://www.npmjs.com/package/react-spin).
* Ajax call (With the [xhr](https://www.npmjs.com/package/xhr)).
* Interactive tables (with [Griddle](https://griddlegriddle.github.io/Griddle/)).
* [Redux](https://redux.js.org) to centralize states.
## Live Demo

Click [here](https://lively-welder-190307.appspot.com/) to see The dashboard in action.

## Requirements
#### Client App
  - [node >= 8](https://nodejs.org/download/)
  - [create-react-app](https://github.com/facebookincubator/create-react-app)
    ```shell
    npm install -g create-react-app
     ```
#### Server side
  - This [Python Flask app](https://github.com/aminbouraiss/flask-dashboard) to refresh the data.

## Setup the project

1. **Install the Flask server.**
    1. Install the flask server from this [Git repo](https://github.com/aminbouraiss/flask-dashboard).
    2. Launch the dev server with the following commands:
    ```shell
    $export FLASK_APP=flask_app.py
    $export FLASK_DEBUG=1
    $flask run
    ```

2. **Install the project dependencies.**

```shell
$npm install
```

3. **Starts the client development server.**

To work on the project with live reloading, use the following command:

```shell
$npm start
```
The local server will be available at:

**Local:**            http://localhost:3000/

**On Your Network:**  http://192.168.0.5:3000/

## Build for production
 Bundle the app into static files for production with the following command:

```shell
$npm run build
```

 ## Testing
 Start the test runner with the following command:

```shell
$npm test
```

## XMLHttpRequest URL

This react app retrieves the url to update the dashboard from a window object property defined in the index.html file. The **xhrUrl** property is set to the flask local server's URL by default:

```html
<!-- XMLHttpRequest URL -->
<script>var xhrUrl ="http://127.0.0.1:5000";</script>
```

## Generating charts with plotly 

More information [here](https://plot.ly/javascript/)
In order to generate the charts, the followinf link must be present in the **index.html** file:

```html
<script src="https://cdn.plot.ly/plotly-1.8.0.min.js"></script>
```
Including this script gives React access to the Plotly global variable in the code. Using Plotly.newPlot, we can easily create graphs within the React components:
```javascript
let trace1 = {
            x: x,
            y: y,
            name: 'Clicks per website',
            type: 'bar',
            hoverinfo: 'text',
            text: y.map(value => formatNumber(value, metric[0])),
            marker:{color:this.props.color}
        };

        let traces = [trace1];
        let layout = {
            barmode: 'stack'
        };
        Plotly.newPlot(this.props.id, traces, layout, {displaylogo: false})
    }
```






