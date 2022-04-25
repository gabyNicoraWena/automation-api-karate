# karate

## Karate DSL - Cucumber

KarateDSL-cucumber : Automation API Test

Karate is the only open-source tool to combine API test-automation, mocks, performance-testing and even UI automation into a single, unified framework. 
The BDD syntax popularized by Cucumber is language-neutral, and easy for even non-programmers. Powerful JSON & XML assertions are built-in, and you can run tests in parallel for speed.


## Getting Started
If you are a Java developer - Karate requires Java 8 (at least version 1.8.0_112 or greater) and then either Maven, Gradle, Eclipse or IntelliJ to be installed. Note that Karate works fine on OpenJDK. Any Java version from 8-12 is supported.

If you are new to programming or test-automation, refer to this video for getting started with just the (free) IntelliJ Community Edition. Other options are the quickstart or the standalone executable.

If you don't want to use Java, you have the option of just downloading and extracting the ZIP release. Try this especially if you don't have much experience with programming or test-automation. We recommend that you use the Karate extension for Visual Studio Code - and with that, JavaScript, .NET and Python programmers will feel right at home.

Visual Studio Code can be used for Java (or Maven) projects as well. One reason to use it is the excellent debug support that we have for Karate.

## Project Architecture
```
    Project-Name
        └──src
            └──main
            └──test
                └──java
                    └──karate
                          └──microservices
                              └──{{name-microservice}}
                                   example.feature  
                          KarateRunner.java
                    env_data.json
                    karate-config.js
                    logback-test.xml   
```

**test/_java/_runner** - Here we define the runner thats execute all features in parallel and generate report
**resources/karate/microservices/{{name-microservice}}/feature/example.feature** - A feature would describe the current test unitary script which has to be executed. (files .feature of the endpoint ext) goes here
**resources/karate/_support** - Here is the file where the environment variables are read
**karate-config.js** - here we define all the environment variables to be used throughout the project

## How to execute features or scenarios

If you want to run a scenario, go to the scenario -> Right click -> Run, or on the arrow on the left side of the scenario

If you want to run a single feature, go to feature -> Right click -> Run

If you want to run a set of features, go to test / java - KarateRunner, right click -> Run
This run returns a Cucumber report and runs the tests in parallel

## How to execute features or scenarios from command line Terminal

If you want to run the KarateRunner and test that the @tag works before the send pull request and go up to the pipeline, execute this command: mvn clean test -DKarate.options="@example" -Dtest=KarateRunner

If you want to run the KarateRunner and test that works at the different environment then execute the follow command: mvn clean test -Dkarate.env={{env}} -Dtest=KarateRunner