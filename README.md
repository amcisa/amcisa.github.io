amcisa.org
==================

Stack
-------------

Front End: 

- [Jade](http://jade-lang.com/)
- [JQuery](https://jquery.com/)
- [Bootstrap](http://getbootstrap.com/)
- [Stylus](http://stylus-lang.com/)
- [Cosmo theme from Bootswatch](http://bootswatch.com/cosmo/) 
- [BootstrapCDN](http://www.bootstrapcdn.com/)

Back End: 
- Windows+Apache+MySQL+PHP ([WAMP](http://www.wampserver.com/))
- [Node.js](https://nodejs.org/en/)

Development tools:

- Github for [Windows](https://windows.github.com/) or [Mac](https://mac.github.com/)
- [FTPloy](https://ftploy.com)

Quick Setup for new Web Resource Managers (WRM)
-----------------------------------------------

1. Get all the server and service credentials from the previous WRM.
2. Open a new [Github](https://github.com/) account and have yourself added as a collaborator into the [master github repo](https://github.com/amcisa/amcisa.github.io).
3. Download the github client for [Windows](https://windows.github.com/) or [Mac](https://mac.github.com/).
4. Install [WAMPmanager](http://www.wampserver.com/).
5. Clone the master github repo into **C:\wamp\www** through the github client.
6. Log in to [FTPloy](https://ftploy.com) with your github account and create a new project with the server credentials from (1). (Note: the server path is **/public_html/gh**)
7. [Install nodejs](http://nodejs.org/) on your local computer to get [npm](https://www.npmjs.org/) up and running.
8. You can manually install the npm modules needed by console cd-ing into the folder / shift-right click in the folder to get 'open command window here' and then typing `npm install`. You can also just double click `setup.md`.

Workflow
------------------------

1. Start Wampmanager. You can use the `startwamp.cmd` to start it. It needs admin-level access to start, and the script will prompt you to give it access, so just double click it.
2. Double-click sentinel.cmd to start. A detailed introduction is included in the appendix.
3. Edit and save. 
4. Go to http://localhost/amcisa.github.io to view your current state.
5. When you have completed your changes, open the github client and sync before you commit.

Appendix
-----------------------

### package.json

All modules and scripts used are contained within package.json. It is recommended that you go through it after you've completed the basic setup.

### index.js

You can use node to run index.js like so : `node index.js`. There are command line arguments you can use.

1. `-a` : This forces a refresh of jade and styl templates before the main monitor loop.
2. `-e` : Placing this after `-a` forces it to stop before the main monitor loop.

### local npm commands

Commands are run by typing `npm run {command}` where command is specified by you. An example would be `npm run watch`.

The following commands can be found in package.json.

1. `watch` : This prompts the main monitoring loop only.
2. `refresh` : This prompts refreshing templates only.
3. `main` : This refreshes the templates and then runs the main loop.
4. `stylus`: This watches the css folder for any changes in the stylus files. Use this if you're only doing changes to the css files.
5. `start`: This runs a local server. However, this server cannot execute any php files so it's only suitable for front-end work.

### Google API 

The site uses [Google Forms](https://support.google.com/docs/answer/87809?hl=en) for gathering data. The form would be embedded into our web pages, and the data would be sent to our central Google Drive. 

For sending google form data into email, use the [sendFormByEmail](./js/Google Form/sendFormByEmail.js) script provided in the js/Google Form folder and copy paste it into your Google Form -> Tools -> Script Editor. Edit the email you want it to mail to, and change the id key of your form. As of 2014, the google doc url format is like so:

docs.google.com/forms/d/__this is your key here__/edit

### Editors

Sublime text is the editor of choice, but it is highly personal and you're welcome to use any other editor that you find suitable.

There are many modules you can install into sublime text once you've installed [package manager](https://packagecontrol.io/installation).