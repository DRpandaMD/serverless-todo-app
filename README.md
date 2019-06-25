# serverless-todo-app
A serverless to do list app


## Technologies used
- ReactJS
- AWS Amplify React
- AWS S3
- AWS Route53
- AWS Cognito 




## Set up project locally
The create-react-app script, which can be installed via the command line with npm:
  - `npm install -g create-react-app`

  AWS Amplify:
  - `npm install -g aws-amplify aws-amplify-react`

Create React App
- `create-react-app todo-list`


## Yarn Commands

`yarn start` \
Starts the development server.

`yarn build` \
Bundles the app into static files for production.

`yarn test` \
Starts the test runner.

`yarn eject` \
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!



## AWS Amplify Framework

- install the framework \
`npm install -g @aws-amplify/cli`

- configure amplify \
`amplify configure`

- initialize amplify with react app \
`amplify init`

### After Configuring and Initialization

Your project has been successfully initialized and connected to the cloud!

#### Some next steps:
- "amplify status" will show you what you've added already and if it's locally configured or deployed
- "amplify <category> add" will allow you to add features like user login or a backend API
- "amplify push" will build all your local backend resources and provision it in the cloud
- "amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

#### Pro tip:
Try "amplify add api" to create a backend API and then "amplify publish" to deploy everything


## Common Amplify Commands

- add hosting \
`amplify hosting add`

- build app frontend and backend resources and provision them in the cloud \
`amplify publish`

- buid app backend resources and provision them in the cloud \
`amplify push`

- add authentication backend to app \
` amplify add auth`

#### Resolve easy problems
- encountered a issue when adding `amplify add auth` \
Fixed by adding aws amplify and aws amplify react packages in yarn `yarn add aws-amplify` `yarn add aws-amplify-react`
