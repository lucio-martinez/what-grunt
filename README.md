# What grunt?
> Discover what grunt is and what you can do for it

## Project
The goal for this project is to give you tools to understand what is grunt and how does it works.

## Slides

You can see the slides [here](http://www.slideshare.net/lucio-martinez/what-grunt) made for the presentation.

## Under the hood
Details of what is inside this beast (it doesn't bite :P).

__Demo applications__

There are two applications, one is a desktop website and the other is a mobile one.
Both websites are *really* simple.

__Grunt__

Grunt is setup in such a delicated way to be able to handle both projects individually or together.

__Dependencies__

The dependencies for the apps are handled with bower. 
There are individual configuration files for the projects.

__Server__

To see the apps in action there has to be a server. 
To keep things simple, I wrote two nodejs scripts which 
can be used to get one app at a time available to be run.

## Using the stuff
Some details to help you introduce with this.

__NPM dependencies__

The first thing is to install the dependencies for grunt, which are called node modules.

    $ cd front-end-build
    $ npm install
  
Go and grab a coffe 'cause this will take long.

What is it going to get installed? Whatever is declared on ´package.json´.
This files is read by the npm command.

Who use this dependencies? The whole grunt configuration will use this dependencies to run the grunt tasks.

*This dependencies won't differ according of what app will grunt compile.*

__Bower dependencies__

Each of the projects will have their own fron end dependencies and they are installed using bower.

    $ cd front-end-build/
    $ cd desktop && bower install
    $ cd ../mobile && bower install
  
*This dependencies will differ for each app.*

__Executing a server__

You can choose to bring the source code into life running a static file server in node.

    $ cd server/
    $ npm install
    $ node run_desktop

This npm installation will be fastest since only three packages will get installed. **Attention**: leave this thread running on the background if you are going to be executing grunt at the same time.

__Running grunt for dev__

Front end devs are used to run a "watch" task. 
This task is supposed to observe the source code and refresh the browser as soon as it change.

    $ cd front-end-build/
    $ grunt watch-desktop # or watch-mobile

__Running grunt for prod__

The production version of an app must be fully optimized (whitespaces removed and such)
so it load fasters. This is commonly known as "assets compilation".

    $ cd front-end-build/
    $ grunt desktop # Compiles desktop app
    $ grunt mobile # mobile app only
    $ grunt # This compiles both desktop and mobile apps

__Recommended flow__

I would do something like this once everything is installed:

 1. Run the server
 2. Run the watch task for desktop
 3. Code..
 4. Stop everything
 5. Run the prod task for desktop
 6. Modify run_desktop.js and point it to production
 7. Run the server
 8. Test
 9. ???
 10. Profit!

## Contributing
Yasss! Fork it and make pull request, create issues, give starz, everything helps. 
At some point this will get deprecated, sad but is the true, so it would be great
if you can land a hand to keep it up-to-date.

## License
MIT Copyright 2015 Lucio Martínez. Full license in the [LICENSE](https://github.com/lucio-martinez/what-grunt/blob/master/LICENSE) file.
