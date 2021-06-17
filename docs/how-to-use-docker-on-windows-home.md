# How to use Docker on Windows Home

There are a few pitfalls to be avoided when setting up Docker on Windows Home. First of all, you have to use [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/) as Administrator. Unfortunately Windows Home does not support Docker for Windows Desktop, so Toolbox must be used instead. It has to be run as Administrator as the installation uses symlinks, which cannot be created otherwise.

Once you've installed the toolbox, run Docker Quickstart Terminal as Administrator. This will create a `default` virtual machine if it does not already exist. Once that has happened, close the terminal and open VirtualBox (again as Administrator). You should be able to see the `default` machine. The site is quite resource-intensive, so stop the virtual machine and raise the settings as much as you can - memory in particular. It has been confirmed to work with 4GB of ram.

Once you're happy that Docker is working, clone the freeCodeCamp repository to a directory inside `C:\Users`. These directories are shared giving Docker access to the local directories, which it needs during installation.

If you see messages like

```shell
bash: change_volumes_owner.sh: No such file or directory
```

when you `npm run docker:init` this is likely the culprit.
