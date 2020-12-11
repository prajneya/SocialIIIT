# SocialIIIT

Repository for Algorithms and Analysis Design Course Project

# Rules for Contributing

### Pull Requests

* No pushes to master should be made directly, only merges shall be made.
* Always pull before you push.
* Try to make as small pull requests as you can so that it is easy to review your code (which is why it is advised to create branches for every little feature/fix/chore).
* Although each one of you has been given rights to merge to master, it is recommended that no one merges their own PRs. Please make sure to add reviewers to PR, and only after the approval from a minimium of three reviewers,  the PR will be merged to master.

### Branching

As mentioned earlier, it is advised to create as many branches as we can so as to keep the project modularized. Follow the following naming convention while creating your branch:

[You name initials (CAPS)] - [Feature/fix/chore you are working on]

For example, Prajneya Kumar's branches can be of the following names:

* PK-routing
* PK-cabsharing
* PK-login
* PK-registrationFix

Follow camel-case if the feature/fix/chore contains multiple words. 

Also, make branches only when you start working on them. No point in making branches you will not be working on.

### Commit Messages

Commit messages should follow the following nomenclature. 

* [Type] - [Subject]

Types can be the following:

* feat - a new feature
* fix - a bug fix
* docs - changes in documentation
* style - everything related to styling
* refactor - code changes that neither fixes a bug nor adds a feature
* test - everything related to testing
* chore - updating build tasks, package manager configs, etc

The Subject should not exceed 50 characters and should be written in imperative. Keep it short, simple and make sure to describe exactly what the commit does in minimal words.

If needed, add a description to the commit while sending PR, if the commit needs detailed explanation.

### Installation

The project requires

* Node.js

to run. Make sure you have installed all of the above.

To run the project, clone the repo to your local machine and go the the socialite/ directory. 

```sh
$ npm start
```
to start the frontend server.

Go to server/ directory and run

```sh
$ node server.js
```
to start the backend server.

Note that you might need to run 

```sh
$ npm install
```

the first time you run this project or when someone adds a new package to the client/server side.
