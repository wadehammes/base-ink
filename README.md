#Base Ink
Grunt-driven email templating using Zurb Ink responsive email framework.

####Use
Make sure you have node.js installed.

Then run the following in the terminal/shell:
```
git clone git@github.com:wadehammes/base-ink.git
cd base-ink
npm install
grunt
```

To send with Mailgun, create an account at http://mailgun.com and get your API Key (key-XXXXXXXXXXX).

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

####Copyright
* Ink v1.0.5 - Copyright 2013 ZURB Inc
* Based heavily off of https://github.com/leemunroe/grunt-email-design
