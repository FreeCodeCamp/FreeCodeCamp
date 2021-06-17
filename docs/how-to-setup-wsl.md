# Set up freeCodeCamp on Windows Subsystem for Linux (WSL)

> [!NOTE]
> Before you follow these instructions make sure your system meets the requirements
>
> **WSL 2**: Windows 10 64-bit (Version 2004, Build 19041 or higher) - available for all distributions including Windows 10 Home.
>
> **Docker Desktop for Windows**: See respective requirements for [Windows 10 Pro](https://docs.docker.com/docker-for-windows/install/#system-requirements) and [Windows 10 Home](https://docs.docker.com/docker-for-windows/install-windows-home/#system-requirements)

This guide covers some common steps with the setup of WSL2. Once some of the common issues with WSL2 are addressed, you should be able to follow [this local setup guide](https://contribute.freecodecamp.org/#/how-to-setup-freecodecamp-locally) to work with freeCodeCamp on Windows running a WSL distro like Ubuntu.

## Enable WSL

Follow the instructions on the [official documentation](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to install WSL1 and followed by upgrading to WSL2.

## Install Ubuntu

1. We recommended using Ubuntu-18.04 or above with WSL2.

   > [!NOTE]
   >
   > While you may use other non-debian based distros, they all come with their own gotchas and are beyond the scope of this guide.

2. Update the dependencies for the OS

   ```console
   sudo apt update
   sudo apt upgrade -y

   # cleanup
   sudo apt autoremove -y
   ```

## Set up Git

Git comes pre-installed with Ubuntu 18.04, verify your Git version with `git --version`.

```output
~
❯ git --version
git version 2.25.1
```

(Optional but recommended) You can now proceed to [setting up your ssh keys](https://help.github.com/articles/generating-an-ssh-key) with GitHub.

## Installing a Code Editor

We highly recommend installing [Visual Studio Code](https://code.visualstudio.com) on Windows 10. It has great support for WSL and automatically installs all the necessary extensions on your WSL distro.

Essentially, you will edit and store your code on Ubuntu-18.04 with VS Code installed on Windows.

If you use [IntelliJ Idea](https://www.jetbrains.com/idea/), you may need to update your Node interpreter and Npm package manager to what is installed on your WSL distro.

You can check these settings by going to Settings > Languages & Frameworks > Node.js and NPM.

## Installing Docker Desktop

**Docker Desktop for Windows** allows you to install and run databases like MongoDB and other services like NGINX and more. This is useful to avoid common pitfalls with installing MongoDB or other services directly on Windows or WSL2.

Follow the instructuction on the [official documentation](https://docs.docker.com/docker-for-windows/install) and install Docker Desktop for your Windows distribution.

There are some minimum hardware requirements for the best experience.

## Configure Docker Desktop for WSL

Once Docker Desktop is installed, [follow these instructions](https://docs.docker.com/docker-for-windows/wsl) and configure it to use the Ubuntu-18.04 installation as a backend.

This makes it so that the containers run on the WSL side instead of running on Windows. You will be able to access the services over `http://localhost` on both Windows and Ubuntu.

## Install MongoDB from Docker Hub

Once you have configured Docker Desktop to work with WSL2, follow these steps to start a MongoDB service:

1. Launch a new Ubuntu-18.04 terminal

2. Pull `MongoDB 4.0.x` from dockerhub

   ```console
   docker pull mongo:4.0
   ```

3. Start the MongoDB service at port `27017`, and configure it to run automatically on system restarts

   ```console
   docker run -it \
     -v mongodata:/data/db \
     -p 27017:27017 \
     --name mongodb \
     --restart unless-stopped \
     -d mongo:4.0
   ```

4. You can now access the service from both Windows or Ubuntu at `mongodb://localhost:27017`.

## Installing Node.js and npm

We recommend you install the LTS release for Node.js with a node version manager - [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

Once installed use these commands to install and use the Node.js version as needed

```console
nvm install --lts

# OR
# nvm install <version>

nvm install 14

# Usage
# nvm use <version>

nvm use 12
```

Node.js comes bundled with `npm`, you can update to the latest versions of `npm` with:

```console
npm install -g npm@latest
```

## Set up freeCodeCamp locally

Now that you have installed the pre-requisites, follow [our local setup guide](https://contribute.freecodecamp.org/#/how-to-setup-freecodecamp-locally) to clone, install and setup freeCodeCamp locally on your machine.

> [!WARNING]
>
> Please note, at this time the set up for Cypress tests (and related GUI needs) are a work in progress. You should still be able to work on most of the codebase.

## Useful Links

- [A WSL2 Dev Setup with Ubuntu 20.04, Node.js, MongoDB, VS Code and Docker](https://devlog.sh/wsl2-dev-setup-with-ubuntu-nodejs-mongodb-and-docker) - an article by Mrugesh Mohapatra (Staff Developer at freeCodeCamp.org)
- Frequently asked questions on:
  - [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/faq)
  - [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/faqs)
