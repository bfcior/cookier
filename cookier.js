(function(global){

    var Cookier = function(language, position) {
        return new Cookier.init(language, position);
    }

    var description = {
        en: {
            div: 'This page is using cookies files',
            closeButton: 'Close'
        },
        pl: {
            div: 'Ta strona używa plików cookies.',
            closeButton: 'Zamknij'
        }
    };

    Cookier.prototype = {
        
        prepareStyles: function() {
            var style = 'position:absolute;left:0;right:0;text-align:center;height:30px;font-size:12px;';
            
            if(this.position === 'bottom') {
                style += 'bottom: 0';
            } else {
                style += 'top: 0';
            }
            
            return style;
        },

        prepareDiv: function() {

            // new div html tag
            var div = document.createElement('div');
        
            div.id = 'pwa-cookier'
            div.style = this.prepareStyles();
            div.innerText = this.translate('div');

            // new button html tag
            var closeButton = document.createElement('button');
            closeButton.innerText = this.translate('closeButton');
            closeButton.style = "padding: 2px 10px;font-size: 12px;margin: 0 10px;"

            // on click remove plugin from the dom
            closeButton.addEventListener('click', function() {
                document.cookie = 'pwa-cookier=1;path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT';
                this.removeDivFromDom();
            }.bind(this));

            // append button to the div
            div.append(closeButton);

            return div;
        },

        removeDivFromDom: function() {
            var pwaCookier = document.querySelector('#pwa-cookier');
            if(pwaCookier) {
                pwaCookier.remove();
            }
        },

        appendToBody: function() {

            if(document.cookie.indexOf('pwa-cookier=1') === -1) {
                this.removeDivFromDom();
                var div = this.prepareDiv();
                document.querySelector('body').append(div);
            }
        },

        changeLang: function(language) {
            this.validate(language);

            this.language = language;
            this.removeDivFromDom();
            this.appendToBody();
        },

        validate: function(language) {
            if( ! language in description) {
                throw language + ": language not supported";
            }
        },

        translate: function(source) {
            this.validate(this.language);
            
            return description[this.language][source];
        }
    }


    Cookier.init = function(language, position) {

        var self = this;
        self.language = language || 'pl';
        self.position = position || 'bottom';

        this.appendToBody();
    }

    Cookier.init.prototype = Cookier.prototype;

    global.Cookier = Cookier;


}(window));
