amcisa.org
==================

Amcisa new web page, created with [Jade](http://jade-lang.com/), [Bootstrap](http://getbootstrap.com/), [Cosmo theme from Bootswatch](http://bootswatch.com/cosmo/) and [BootstrapCDN](http://www.bootstrapcdn.com/)

###Workflow

1. Activate sentinel.py.
2. Start editing your files.
3. Test out the new changes on the localhost:8000 page in your browser.
4. Once there have been no problems, open up Github, commit and push.

For new web developers:

###Prerequisite Knowledge

Some know-how of how HTML/CSS/JS works is needed to work on the project. 

1. Jade - A simple but powerful templating language that minimises the work needed to create a new web page.
2. Bootstrap - Provides plenty of ready-made Jquery plugins and beautiful CSS designs to start a page with.
2. Markdown - Easy text formatting for the web
3. Bootswatch - Beautiful bootstrap themes with different CSS customisations. 
4. BootstrapCDN - Content Delivery Network (CDN) for bootswatch theme packages.
5. Nodejs and npm - server-side javascript programming and package manager.
6. Google API - simple programming interface to Google drive items.

Optional: 
Python - quick scripts are written in it to automate some tasks such as server hosting, rendering the files and watching the folder.

###Quick Set Up

1. [Install nodejs](http://nodejs.org/) on your local computer to get [npm](https://www.npmjs.org/) up and running.
2. Install Jade by typing the following into your shell command line (not the nodejs command line). ```npm install -g jade```
3. Install watchdog for python with ```pip install watchdog```
4. Install a version of markdown for your work. ```npm install -g markdown```
3. Make sure that you have bootstrap.css or bootstrap.min.css, bootstrap.js or bootstrap.min.js linked to your main jade file.
4. Further customisation to the CSS themes is done in the custom.css. You can use the "inspect element" provided by the browser to do instant preview of the change.
5. Please read through the [language reference for Jade](http://jade-lang.com/reference/), [Bootstrap](http://getbootstrap.com/javascript/) [reference](http://getbootstrap.com/css/), and some of the [Google API](https://developers.google.com/drive/v2/reference/) before you start so you know how to do modifications to the layout.

###Python Scripts

Server.py is a simple HTTP server written in Python that enables you to host the source page on your computer. Just double click it to load the page on the local server.

Sentinel.py is a simple program that watches for file changes in the /posts directory and renders the pages again in the background. It also logs all events in the directory for reference. It is recommended to load this program up before starting development.

###Google API

The web site will be using [Google Forms](https://support.google.com/docs/answer/87809?hl=en) for all data gathering needs. However, instead of linking it externally, the form would be embedded into our web pages, and the data would be sent to our central Google Drive. 

For sending google form data into email, use the [sendFormByEmail](./js/Google Form/sendFormByEmail.js) script provided in the js/Google Form folder and copy paste it into your Google Form -> Tools -> Script Editor. Edit the email you want it to mail to, and change the id key of your form. As of 2014, the google doc url format is like so:

docs.google.com/forms/d/__this is your key here__/edit

