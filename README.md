# Crime in United States 2014

See a demo [here](http://crimes.desurus.com/)

This is a simple javascript web app to visualize a crime rate in United States.
The data is obtained form the [FBI web site](https://www.fbi.gov/about-us/cjis/ucr/crime-in-the-u.s/2014/crime-in-the-u.s.-2014).

On the map user can see a rate of different types of crime per state and their change from the previous year. Higher rates are displayed in darker shade of the color.
User can also select different type of crimes form the menu on the right.

How it works
------
Data is parsed directly form the XLS file using [js-xlsx](https://github.com/SheetJS/js-xlsx) library and displayed by [datamaps](https://github.com/markmarkoh/datamaps) project which in turn is relying on [d3js](https://d3js.org/).