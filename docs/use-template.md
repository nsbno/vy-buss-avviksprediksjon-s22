# Using the template

These are the steps needed to build something new from this baseline:

- First, fork the repository by clicking the big green "Use this template" button in GitHub.

    Remember to set the appropriate permissions on the new repo for your team, protections on the `main` branch, Slack integrations, and such.

- You'll need to set up a deploy pipeline separately, as that's not handled by this repo. Here is a [description of how to do it within Traffic GUI's AWS accounts](https://github.com/nsbno/trafficgui-aws/blob/master/docs/frontend-pipeline.md). 
	
    If you set up outside Traffic GUI, remember to adjust the `s3_prefix` and `s3_bucket_name` variables in the CircleCI configuration.

- Adjust the [CODEOWNERS file](https://github.com/nsbno/trafficgui-frontend-baseline/blob/master/docs/CODEOWNERS). (This is only needed if you set up outside team Traffic GUI context.)

- You'll need to update some configuration variables with once specific for your app. These _should_ be the affected files, but make sure you didn't miss any by searching for `trafficgui` or `baseline`.

    ```
    appConfig.json  (all variables)
    package.json  (name) 
    index.html  (title + description)
    manifest.json  (names)
  
    .circleci/config.yml
    terraform/prod/main.tf
    terraform/stage/main.tf
    terraform/template/main.tf
    terraform/test/main.tf
    ```

- Set up CircleCI for the new project:

    - Create a [CircleCI project for your GitHub repository](https://app.circleci.com/projects/project-dashboard/github/nsbno/).
    - Press "Use Existing Config" when prompted for a config, then "Start Building".
    - Sign in to your service account on the command line, and fetch the value of the following parameters from the Parameter Store:
		
        ```
        aws ssm get-parameter --name trafficgui-ci-machine-user-id --with-decryption
        aws ssm get-parameter --name trafficgui-ci-machine-user-key --with-decryption
        ```

    - Open `Project Settings -> Environment Variables` in CircleCI, and add the above as the environment variables `AWS_ACCESS_KEY_ID` and `AWS_ACCESS_KEY_KEY`. (Make sure you only add their values, not the entire JSON object.)

- If you haven't already ; update the environment variables in appConfig for where the new app will be running.

- Run `npm install` to make sure everything is working, and you're good to go :tada:
