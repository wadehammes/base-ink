#Base Ink
Grunt-driven email templating using Zurb Ink responsive email framework. Based largely off of Lee Munroe's grunt-email-design task, found here: https://github.com/leemunroe/grunt-email-design, with added features including HTML minification, S3 support, and <a href="http://zurb.com/ink">Zurb Ink</a> framework.

####Use
Make sure you have node.js installed.

Then run the following in the terminal/shell:
```
git clone git@github.com:wadehammes/base-ink.git
cd base-ink
npm install
grunt
```

####Placing images into an S3 Bucket
To use S3 for image management, first provide your credentials in the credentials.json file:

```
{
  "accessKeyId": "...",
  "secretAccessKey": "..."
}
```

and then also create a bucket in your S3 <b>with an img folder</b>, and provide that bucket name like so:

```
//- Put Images into an S3 Bucket
aws: grunt.file.readJSON("credentials.json"),
s3: {
  options: {
    accessKeyId: "<%= aws.accessKeyId %>",
    secretAccessKey: "<%= aws.secretAccessKey %>",
    bucket: "YOUR BUCKET NAME"
  },
  build: {
    cwd: "src/",
    src: "img/*"
  }
},
```

Then, in order to CDNify your templates, run:
```
grunt cdnify
```

####Testing with Mailgun
To send with Mailgun, create an account at http://mailgun.com and get your API Key:
```
key-XXXXXXXXXXXXXXXXXX
```

If you want to send and auto-create a Litmus email test (http://litmus.com), create an account and in your account settings copy your <b>Static Test Address</b> and add it like so:

```
//- Send email through Mailgun
mailgun: {
  mailer: {
    options: {
      key: 'Your API Key (key-XXXXXXXXXXXX)',
      sender: 'your@email.com',
      // To test with Litmus, add your Static Test Address
      // from Limus below, found in your Account Settings.
      recipient: 'Add Static Test Address Here',
      subject: 'TEST: This is a test email'
    },
    src: ['dist/*']
  }
},
```

Then to send a test email, run:
```
grunt send
'''

####Copyright
* Ink v1.0.5 - Copyright 2013 ZURB Inc
* Based heavily off of https://github.com/leemunroe/grunt-email-design
