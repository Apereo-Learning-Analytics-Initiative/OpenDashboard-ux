# LAP/Dashboard Production Release Strategy (linux)

Production code in general should be run by a *boot* user. The *boot* user should have all the permissions to run and build code, but doesn't necessarily require any root level authorities.

Production code is released into the **/opt/[applicationname]** directory.	
 - /opt/od
 - /opt/od-ux
 - etc
Each production application environment is made up of the following:

#### config/
	Config has any files thare are required for the configuration of the application. This is only a convenience location, and they will be used by the build process when bundling with the src build.

#### lib/
	Lib is the actual location of the run time package. Lib can contain a jar, or a build directory. This is what is actually run in the production environment 

#### run/
	run is the directory that holds the process Id. This is a convenience for making sure that that a process is not illegally run twice

#### src/
	src contains the source code from the actual repository

#### build.sh
	build.sh checks out the latest code from the approved branch or tag, builds the source, bundles the artifact with any configuration paramters from the config directory and copies it's artifact to the lib directory for running. The build file is custom made for the build type that is being created, but in general, we expect the above mentioned directories

#### run.sh
	run.sh runs the process. It is a custom made for the build type that is being run, but in general, we expect the above mentioned directories.


## Sample Create Script
With root permissions, execute the following lines
    mkdir /opt/od-ux
    adduser boot
    mkdir /opt/od-ux/config
    mkdir /opt/od-ux/lib
    mkdir /opt/od-ux/run
    mkdir /opt/od-ux/src
    chown -r /opt/od-ux boot:boot



