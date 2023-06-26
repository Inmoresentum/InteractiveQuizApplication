<h1 align="center">
   <p align="center">
      <img src="FrontEnd/interactive-quiz-app/public/quiz-app-logo.png"
      alt="whatever" height="250" width="250" style="border-radius:35px" >
   </p>
   An Interactive Quiz Application
</h1> 

<p align ="center"> 
   <img src="https://badgen.net/npm/node/next" alt="whatever">
   <img src="https://img.shields.io/badge/springboot-3.1.1-green" alt="whatever">
   <img src="https://img.shields.io/badge/MariaDB-10.11.2-blue" alt="whatever">
   <img src="https://img.shields.io/badge/MINIO-8.4.3-orange" alt="whatever">
   <img src="https://img.shields.io/badge/vanilla-css-lightgrey" alt="whatever">
   <img src="https://badgen.net/badge/icon/docker 20.11?icon=docker&label" alt="whatever">
   <img src="https://badgen.net/badge/Icon/NextJS 13.4/red?icon=vercel&label" alt="https://img.shields.io/badge/Next 13-black?style=for-the-badge&logo=next.js&logoColor=red">
</p>

<p align="center">
   <img src="https://img.shields.io/badge/tailwindcss 3-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="whatever">
   <a href="https://www.jetbrains.com/idea/">
      <img src="https://img.shields.io/badge/IntelliJIDEA 23.1.3-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=pink" alt="whatever">
   </a>
   <img src="https://img.shields.io/badge/spring 6-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" alt="whatever">
   <img src="https://img.shields.io/badge/Framer Motion 10.12 -black?style=for-the-badge&logo=framer&logoColor=blue" alt="whatever">
   <a href="https://maildev.github.io/maildev/">
      <img src="https://img.shields.io/badge/MailDev 2.0-8B89CC?style=for-the-badge&logo=protonmail&logoColor=blue" alt="whatever">
   </a>
   <a href="https://daisyui.com/">
      <img src="https://img.shields.io/badge/daisyui 3-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=orange" alt="whatever">
   </a>
</p>


This repository contains **CSE470** Lab Group No `9` PROJECT, `Summer 2023` Section `02`.

<h2 align="center"> Group Information </h2>

#### Group Name: _Enigma Enchanters_

* [**_Athar Noor Mohammad Rafee_** \[20101396\]](https://github.com/Inmoresentum)
* [**_Abu Darda_** \[23141038\]](https://abuudarda.github.io/)
* [**_Nuraiya Rahman Khan_** \[18301174\]](https://github.com/Nuraiya)
* [**_Sumaiya Haque_** \[23141039\]](https://github.com/Sumaiyahaque05)

## System Requirements

To test and run the application, or if you want to modify
things according to your needs

you will have to install the following things.

1. java

   `jdk` version **17**
   Download [jdk](https://www.oracle.com/java/technologies/downloads/)
   if you don't have it already.

   If you're on unix like system, you can use [SDK MAN](https://sdkman.io/)
   which has certain advantages over other methods.

   To check your version of java, run:

   ```shell
    java --version
   ```
   or
   ```shell
   javac --version
   ```

2. node

   `node` version **18** or higher. Download [node](https://nodejs.org/en/download/) if you don't have it already.

   To check your version of node, run:

   ```shell
   node --version
   ```

3. npm

   `npm` version **8.5** or higher. You will have it after you install node.

   To check your version of `npm`, run:

   ```shell
   npm --version
   ```

## Setup

to set up, please follow these steps:

<details>
<summary>Back-End</summary>

1. Clone the repo if you haven't already

   make sure that you have [git](https://git-scm.com/downloads) installed.
   To check run `git --version` in your
   terminal.

   ```shell
   git clone https://github.com/Inmoresentum/InteractiveQuizApplication.git
   ```

2. Change directory to the project directory

    ```shell
    cd  InteractiveQuizApplication
    ```
   or open this directory with your favourite `code editor` or `IDE`
   which will download all the dependencies for [maven](https://maven.apache.org/guides/).
   We used [IntelliJ IDEA](https://www.jetbrains.com/idea/) but other code
   `editors` or `IDES` will also do the job.

3. Wait for Maven to download all the dependencies.
4. Now You have to Set up MariaDB and to do that you can either [download MariaDB](https://mariadb.org/) for your
   operating system or use [docker to spin up a MariaDB container](https://hub.docker.com/_/mariadb).
   By default, the backend server is expecting MariaDB to run on `port: 3306`, so you will have
   make sure that your instance of mariadb is also running on that port.
   However, if you want to overrider the default configuration, then you can do in two ways.
    1. Taking advantage of the environment that is used in the
       [application.properties](/src/main/resources/application.properties) file
    2. Or Changing the provided default `spring.datasource.url`

   Furthermore, you have to create a database called `quiz_application_database` else you can
   override the configuration mentioned in the previous steps.
5. For email sending and testing purpose while developing the application, we used
   [MailDev](https://maildev.github.io/maildev/) which you can easily set up through docker
   using their [latest image](https://hub.docker.com/r/maildev/maildev).
   If you are planning on overriding or changing the default configuration
   and then please consult with
   [application.properties](src/main/resources/application.properties) file.
6. And then finally Click the `play` icon which will start the spring boot application
   Alternatively, from the terminal use the included `maven` wrapper to build and
   run using
    ```shell
    ./mvnw clean install
    ``` 
7. By default, the backed server should start at **http://localhost:8080**
8. To check the OpenAPI documentation for created APIs,
   please visit **https://localhost:8080/swagger-ui.html**

</details>


<details>
<summary>Front-End</summary>

1. Clone the repo if you haven't already

   make sure that you have [git](https://git-scm.com/downloads) installed.
   To check run `git --version` in your
   terminal.

   ```shell
   git clone https://github.com/Inmoresentum/InteractiveQuizApplication.git
   ```

2. Change directory to the project directory

    ```shell
    cd  /FrontEnd/interactive-quiz-app   
    ```
   Now you have to download all the frontend dependencies using `npm`.
   To do so run the following command
   ```shell
   npm install
   ```
   This will download all `npm` dependencies.

3. Now run the local development server by using
   ```shell
   npm run dev
   ```
   By default, the Front-End server should start at **http://localhost:3000**

</details>

## Issues

you've found a bug in the source code, a mistake in the documentation?
you can help
by [submitting an issue on GitHub](https://github.com/Inmoresentum/InteractiveQuizApplication/issues).
before you create an issue, make sure to search for the issue archive -- your issue may have already been addressed!

please try to create bug reports that are:

- _reproducible._ include steps to reproduce the problem.
- _specific._ include as much detail as possible: which version, what environment, etc.
- _unique._ do not duplicate existing opened issues.
- _scoped to a **single bug**._ one bug per report.

&nbsp;

<p align="center">Copyright &copy; 2023-present 
   <a href="https://github.com/Inmoresentum" target="_blank">Inmoresentum</a>
</p>
<p align="center">
   <a href="LICENSE.md">
      <img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&colorA=FFA500&colorB=FF69B4"
         alt="whatever"/>
   </a>
</p>
