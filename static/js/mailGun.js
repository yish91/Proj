/**
 * @ngdoc provider
 * @name ng.provider:mailgunProvider
 *
 * @description
 * configure the mailgun api and directive
 * adding to the scope so the attempt flag can be referenced in markup.
 *
 */
var mailgunProvider = { 'mailgun': function () {
    
	var configuredOptions = {};
    
      this.configure = function(options) {
        configuredOptions = options;
      };
      
      this.$get = function () {
			return {
				getOptions: function() {
					return configuredOptions;	
				},
        		mailgunStatus: ''
			};
		};
	}
};

/**
 * @ngdoc directive
 * @name ng.directive:mailgunValid
 *
 * @description
 * Used to track submit attempts on forms. It mimics the ngFormController by
 * adding to the scope so the attempt flag can be referenced in markup.
 *
 */
var mailgunValidDirective = {
    'mailgunValid': ['mailgun', function (mailgun) {
        return {
          restrict: 'A',
          require: 'ngModel',
          link: function (scope, element, attributes, modelController) {
            
          if (!jQuery().mailgun_validator) {
            console.log('jQuery mailgun_validator plugin required')
          }
          
          options = mailgun.getOptions();
          
          options = options || {};
          
          var baseSuccessCallback = options.success;
          var baseErrorCallback = options.error;
          var baseInProgressCallback = options.in_progress;
          
          var successWrapper = function(data) {
            modelController.$setValidity('mailgunInProgress', true); 
            modelController.$setValidity('mailgunFinished', true);						
            modelController.$setValidity('mailgunEmailValid', (data && data.is_valid));
            
            // clear mailgun status (used for errors)
            mailgun.mailgunStatus = '';
            
            if (!scope.$$phase) scope.$apply();
            
            if (baseSuccessCallback)
              baseSuccessCallback(data);
          }
          
          var errorWrapper = function(error_message) {
            modelController.$setValidity('mailgunInProgress', true); 
            modelController.$setValidity('mailgunFinished', true);				
            modelController.$setValidity('mailgunEmailValid', false);
            
            // set mailgun status (used for errors)
            mailgun.mailgunStatus = error_message;
            if (!scope.$$phase) scope.$apply();
            
            if (baseErrorCallback)
              baseErrorCallback(error_message);
          }
          
          var inProgressWrapper = function() {
            // clear when checking
            modelController.$setValidity('mailgunEmailValid', true);
            modelController.$setValidity('mailgunInProgress', false); 
            if (!scope.$$phase) scope.$apply();
            
            if (baseInProgressCallback)
              baseInProgressCallback(error_message);
          }
          
          
          // wrap all callbacks so the validator can respond, but user can still use the callbacks if needed
          options.success = successWrapper;
          options.error = errorWrapper;
          options.in_progress = inProgressWrapper;
          
          jQuery(element).mailgun_validator(options);
          
          var clearWhenBlankValidator = function (value) {
              if (!value) {
                modelController.$setValidity('mailgunEmailValid', true);
                
                // clear mailgun status (used for errors)
                mailgun.mailgunStatus = '';
              }

              return value;
          };

          modelController.$formatters.push(clearWhenBlankValidator);
          modelController.$parsers.unshift(clearWhenBlankValidator);
          
          // if element is initialized with a value, force validation
          if (element.val()) {
            element.focusout();	
          }
        }
      }
    }]
};

var mailgunModule = angular.module('mailgun', []);

if (mailgunProvider) mailgunModule.provider(mailgunProvider);
if (mailgunValidDirective) mailgunModule.directive(mailgunValidDirective);