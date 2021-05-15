# cowin-notifier

A Node.js AWS Lambda function to periodically check cowin for empty vaccination slots and send emails with slot details.

**Tech used :**

- Node.js
- serverless framework
- github actions

## NOTE

- Refer to `.sample.env.yml` for a list of important environment variables and create your own `.env.yml` file
- Configure the following secrets in your github repo (action secrets) :
  - `AWS_ACCESS_KEY_ID` : access key ID of your AWS Account with relevant roles and permissions
  - `AWS_SECRET_ACCESS_KEY `: secret acces key of the above mentioned account
  - `ENV`: just copy paste the contents of your `.env.yml` file from local machine here
- Update the `STATE`, `DISTRICT` and `MIN_AGE` variables in `src/index.js` lines 5,6 and 7 as per your needs.
- Commit changes and push to main branch to trigger automated deploy to AWS Lambda
- In your AWS Account, go to the lambda function and add Cloudwatch Event Trigger to run at a frequency that suits you. It's two hours in my case.

That's it, you're all set !

Feel free to open issues / submit pull requests to make improvements :)
