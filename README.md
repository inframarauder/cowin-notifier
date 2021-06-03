# cowin-notifier

A Node.js AWS Lambda function to periodically check cowin for empty vaccination slots and send emails with slot details. It's currently configured to suit my needs. You can use my code, tweak it to suit your own needs and deploy to your own AWS account.

**Tech used :**

- Node.js
- serverless framework
- github actions

## PREREQUISITES

- AWS Account
- GitHub Account
- A gmail account with app password enabled to send automated emails. [https://support.google.com/accounts/answer/185833?hl=en]

## STEPS TO SETUP

1. Clone this repo into your local machine
2. Create a `.env.yml` file at the root of the directory
3. Open the `.sample.env.yml` file and copy-paste the contents into the `.env.yml` file.
4. Follow the comments to replace the values of the environment variables according to your setup inside the `.env.yml` file.
5. Go to `src/index.js` and set the value for the constants defined in lines 5-9 as per your own needs.
6. Commit the changes to your local git repository.
7. Create a new repo on GitHub and go to settings > secrets for the repo. This is where we store secrets for a GitHub action CI/CD pipeline.
8. To add a secret, click on `New repository secret`. Follow this step to add the following secrets:

- `AWS_ACCESS_KEY_ID` : access key id of the AWS account to which the lambda shall be deployed. The account must have relevant IAM permissions for Lambda and Cloudwatch.
- `AWS_SECRET_ACCESS_KEY` : secret access key of the above mentioned account
- `ENV` : copy paste the contents of your `.env.yml` file here

9. Add this repo as a remote origin to your local repo and push the code to `main` branch using `git push origin main`.
10. Visit the actions tab to check the deployment status. Once the deployment is successful, a Lambda function must be created in your AWS Account.
11. Open your AWS Lambda console and find your newly deployed lambda function
12. Open the function in your conosle and click on the configuration tab.
13. Click on Triggers > Add Trigger.
14. From the dropdown that appears, select `EventBridge(CloudWatch Events)`
15. Under the 'Rule' section, selecte 'Create New Rule'
16. Enter a Rule Name (eg: 'hourly' or 'everysixhours', etc...)
17. Under 'Rule Type' select 'Schedule Expression'
18. Enter the CRON or rate expression in 'Schedule Expression' text box (eg : rate(1 hour) means it would be triggered every one hour)
19. Click on 'Add' to finally add the trigger.
20. That's it, you're all set !

Feel free to open issues / submit pull requests to make improvements :)
