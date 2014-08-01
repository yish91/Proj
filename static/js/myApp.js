angular.module('myApp', ['mailgun', 'user'])

.config(['mailgunProvider', function (mailgunProvider) {
  
        var mailgunOptions = {
          api_key: 'key-799e44668605edb34a76d9467ed2ca37',
          in_progress: null,
          success: null,
          error: null,
        };
        
        mailgunProvider.configure(mailgunOptions);
    }]);