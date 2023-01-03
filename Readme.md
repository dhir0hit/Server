# Personal Server
<span>🔥Connect to your Server from Web and Mobile🔥</span>

<dl>
<dt>Storing all of the data, includes:</dt>
<dd>
	<li>Projects</li>
	<li>Passwords</li>
	<li>More comming soon!!!</li>
</dd>
</dl>
<br/>
<span>🔴Warning: No encryption included yet❗🔴</span>

<br/>
<br/>
<div>
<a href="https://reactjs.org/">
<img height="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/500px-React-icon.svg.png">
</a>	

<a href="https://vitejs.dev/">
<img height=50 src="https://vitejs.dev/logo-with-shadow.png"/>
</a>	

<a href="https://www.mongodb.com/">
<img height="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/250px-MongoDB_Logo.svg.png">
</a>	

<a href="https://github.com/expressjs/express">
<img height="50" src="https://camo.githubusercontent.com/0566752248b4b31b2c4bdc583404e41066bd0b6726f310b73e1140deefcc31ac/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67">
</a>	
	
<a href="https://ant.design/">
<img height="50" src="https://camo.githubusercontent.com/363242675617648bfbedd1610f89ac28df0f9e1bac8749d83109fafdf8524fff/68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f7a6f732f726d73706f7274616c2f4b4470677667754d704766716148506a6963524b2e737667">
</a>
</div>

<br/>
<br/>

## Find your way
<!-- TOC -->
* [What Server Contains](#what-server-contains)
  * [1. Frontend Server](#1-frontend-server)
  * [2. Backend Server](#2-backend-server)
  * [3. Database MongoDB](#3-database-mongodb-v603)
  * [4. VS code Server (v4.9.1)](#4-vs-code-server-v491)
  * [5. Includes Build for Android/IOS app](#5-includes-build-for-androidios-app)
<!-- TOC -->


## What Server Contains

### 1. Frontend Server
- For UI/UX
- using React on Vite.js

| Package                  | Version           |
|--------------------------|-------------------|
| @ant-design/icons        | v4.8.0            |
| @antd                    | v5.1.1            |
| @react-copy-to-clipboard | v5.1.0            |
| @react-router-dom        | v6.6.1            |
| @vite                    | v4.0.0            |
| @vitejs/plugin-react     | v3.0.0            |

<br/>

### 2. Backend Server 
- For API
- using Express on Node.js 

| Package                  | Version           |
|--------------------------|-------------------|
| @mongodb                 | v4.13.0           |
| @monk                    | v7.3.4            |
| @nodemon                 | v2.0.20           |
| @http-errors             | v1.6.3            |
| @express                 | v4.16.1           |

<br/>

### 3. Database MongoDB v6.0.3
  - For storing contents
  - Password

<br/>

### 4. VS code Server v4.9.1
 - For editing and creating projects from remote machine

<br/>

### 5. Includes Build for Android/IOS app
// to be included

<br/> 

## How to Setup Server

### Pre requirements
- Linux Kernel (Ubuntu v22.04)
  - <a href="https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview">How to Install Ubuntu</a>
  - 🔴Once you have Ubuntu installed on your device you'll be able to move to next step 🔴
	
- Git (Version Control)
  - Check if your version of Linux or Ubuntu comes with git
  ```bash
  git --version
  ```
  - ✅ If result is something like this then you can <strong>skip to next step</strong> ✅
  <pre>
  git version 2.34.1
  </pre>
  
  - Otherwise follow these steps
  ```bash
  sudo apt-get update
  ```
  ```bash
  sudo apt-get upgrade
  ```
  ```bash
  sudo apt-get install git
  ```
- Node.js
  - To install Node.js Follow these steps
  ```bash
  sudo apt-get update
  ```
  ```bash
  sudo apt-get install nodejs
  ```
- npm
  - To install npm Follow these steps
  ```bash
  sudo apt-get update
  ```
  ```bash
  sudo apt-get install npm
  ```
- MongoDB
  - To install MongoDB Database Follow this link<br/>
  <a href="https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/">Install MongoDb</a>

### Setting up project
- Clone the project
```bash
git clone https://github.com/dhir0hit/Server.git
```
- Go to Project Directory
```bash
cd Server/
```
- It will contain frontend and backend folder
- Open front end folder by using bash command
```bash
cd frontend/
```
- Install Dependencies 
```bash
npm install
```
- Go back to project root directory
```bash
cd ../
```
- **Now let's do same for backend**
```bash
cd backend/
```
- Install Dependencies
```bash
npm install
```
<br/>
<p><strong>There are couple of things needed to be changed before starting the server</strong></p>
<p>Our backend is configured to be running at <strong>port 5000</strong></p>
<p>We only need to change frontend setting</p>

### Setup frontend hostname
- Find our IP address
```bash
hostname -I
```
- You'll get output of ipaddress of your device, It usually looks like
```
xxx.xxx.xxx.xxx or 0.0.0.0
```
- Copy and paste it somewhere to remember

<br/>

- While in Root directory of project, Run this script.
```bash
nano frontend/Config.js
```
OR
```bash
cd frontend/
```
```bash
nano Config.js
```

- This file contains configuration of api/backend infomartion so it can connect with backend
- This is how file main struture will look like
```js
const ServerConfig =
{
    api: {
        protocol: "http", // http or https
        hostname: "0.0.0.0", // xxx.xxx.xxx.xxx or www.example.domain.com
        port    : "5000", // 80 || 5000

        passwordManager: {
            name    : "pwdmanager", // Controller for password manager
            routes: {
                getAll: "get-all", // Get All Accounts Page 
                getOne: "account", // Get One Accounts Page
                create: "create",  // Create  Account  Page
                update: "update",  // Update  Account  Page
                delete: "delete"   // Delete  Account  Page
            }
        }
    }
}

export default class Config {
...
}
```
- Replace hostname with **Your Ip Address**
```js
hostname: "99.99.99.99" // Here instead of 99.99.99.99 put your ip address
```
- if you want to use different port replace port here and in backend/www
```js
port: "5000" // Change port here
```

