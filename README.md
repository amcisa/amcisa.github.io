amcisa.org
==================

Amcisa new web page, created with [Jade](http://jade-lang.com/), [Bootstrap](http://getbootstrap.com/), [Cosmo theme from Bootswatch](http://bootswatch.com/cosmo/) and [BootstrapCDN](http://www.bootstrapcdn.com/)

Quick Setup for new Web Resource Managers (WRM)
------------------

1. Get all the server and service credentials from the previous WRM.
2. Open a new [Github](https://github.com/) account and have yourself added as a collaborator into the [master github repo](https://github.com/amcisa/amcisa.github.io).
3. Download the github client for [Windows](https://windows.github.com/) or [Mac](https://mac.github.com/).
4. Clone the master github repo on your desktop through the github client.
5. Log in to [FTPloy](https://ftploy.com) with your github account and create a new project with the server credentials from (1). (Note: the server path is **/public_html/gh**)
1. [Install nodejs](http://nodejs.org/) on your local computer to get [npm](https://www.npmjs.org/) up and running.
2. Install Jade by typing the following into your shell command line (not the nodejs command line). ```npm install -g jade-cli```
3. Install watchdog for python with ```pip install watchdog```
4. Install a version of markdown for your work. ```npm install -g markdown```

Workflow
---------------------

1. Activate sentinel.py in the root folder.
2. Edit and save.
3. Test out the changes in your local browser at localhost:8000. (The actual port might change depending on your need.)
3. Open the github client and sync before you commit.
4. Sync again.

Prerequisite knowledge
-----------------------

1. Jade - Simple but powerful templating language that minimises the work needed to create a new web page.
2. Bootstrap - Provides plenty of ready-made Jquery plugins and beautiful CSS designs to start a page with.
2. Markdown - Easy text formatting for the web
3. Bootswatch - Beautiful bootstrap themes with different CSS customisations. 
4. BootstrapCDN - Content Delivery Network (CDN) for bootswatch theme packages.
5. Nodejs and npm - server-side javascript programming and package manager.
7. Git - Version control.
6. Google API - simple programming interface to Google drive items.

It is best that you know at least one C-like language for Javascript/PHP/Python scripting.

###Google API

The site uses [Google Forms](https://support.google.com/docs/answer/87809?hl=en) for gathering data. The form would be embedded into our web pages, and the data would be sent to our central Google Drive. 

For sending google form data into email, use the [sendFormByEmail](./js/Google Form/sendFormByEmail.js) script provided in the js/Google Form folder and copy paste it into your Google Form -> Tools -> Script Editor. Edit the email you want it to mail to, and change the id key of your form. As of 2014, the google doc url format is like so:

docs.google.com/forms/d/__this is your key here__/edit

###Stylus
The site uses [Stylus](https://learnboost.github.io/stylus/) for generating CSS. The .styl files, can be processed through the sublime text stylus plugin or simply by installing it yourself through npm, `npm install stylus -g`.

The purpose of using stylus is to created more object oriented CSS to reduce repeated code (though some may still occur) and also to create modular CSS so that developer will know what goes where in the CSS. A example can be seem in [color.styl](./css/color.styl) where the developer will only need to change the value of the variables instead of going through the entire CSS sheet.

The entire site will move towards mixing and matching require stylus sheets instead of sending the whole sheet so that the page size will be reduced.