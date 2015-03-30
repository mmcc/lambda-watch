# lambda-watch
Lambda watch folder for S3.

## Getting Started

This assumes you already have Lambda set up on your AWS account.

1. Clone the repository

```
$ git clone https://github.com/mmcc/lambda-watch && cd lambda-watch
```

2. Run `npm install`

```
$ npm install
```

3. Update the config file to match your own values

```
$ cp config.json.example config.json
$ vim config.json
```

4. Create a zip file to upload to Lambda

```
$ npm run zip
```

5. Upload `dist.zip` when creating a new Lambda and you're good to go!
