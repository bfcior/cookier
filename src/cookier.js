(function (global) {

  var Cookier = function (language, position) {
    return new Cookier.init(language, position);
  }

  var description = {
    en: {
      div: 'This page is using cookies file. ',
      closeButton: 'Close'
    },
    pl: {
      div: 'Ta strona korzysta z ciasteczek aby świaczyć usługi na najwyższym poziomie. Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie. <a href="/polityka-cookies">Czytaj więcej</a>',
      closeButton: 'Zamknij'
    }
  };

  Cookier.prototype = {

    prepareStyles: function () {
      var style = 'position: sticky;left: 0px;right: 0px;text-align: center;height: 45px;font-size: 14px;background-color: rgb(32, 57, 81);color: white;bottom: 0px;padding: 10px;';

      if (this.position === 'bottom') {
        style += 'bottom: 0';
      } else {
        style += 'top: 0';
      }

      return style;
    },

    prepareDiv: function () {

      // new div html tag
      var div = document.createElement('div');

      div.id = 'pwa-cookier'
      div.style = this.prepareStyles();
      div.innerHTML = this.translate('div');

      // new button html tag
      var closeButton = document.createElement('button');
      closeButton.innerText = this.translate('closeButton');
      closeButton.style = "padding: 2px 10px;font-size: 12px;margin: 0 10px;"
      closeButton.className = 'btn btn-default'

      // on click remove plugin from the dom
      closeButton.addEventListener('click', function () {
        document.cookie = 'pwa-cookier=1;path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT';
        this.removeDivFromDom();
      }.bind(this));

      // append button to the div
      div.append(closeButton);

      return div;
    },

    removeDivFromDom: function () {
      var pwaCookier = document.querySelector('#pwa-cookier');
      if (pwaCookier) {
        pwaCookier.remove();
      }
    },

    appendToBody: function () {

      if (document.cookie.indexOf('pwa-cookier=1') === -1) {
        this.removeDivFromDom();
        var div = this.prepareDiv();
        document.querySelector('body').append(div);
      }
    },

    changeLang: function (language) {
      this.validate(language);

      this.language = language;
      this.removeDivFromDom();
      this.appendToBody();
    },

    validate: function (language) {
      if (!language in description) {
        throw language + ": language not supported";
      }
    },

    translate: function (source) {
      this.validate(this.language);

      return description[this.language][source];
    }
  }


  Cookier.init = function (language, position) {

    var self = this;
    self.language = language || 'pl';
    self.position = position || 'bottom';

    this.appendToBody();
  }

  Cookier.init.prototype = Cookier.prototype;

  global.Cookier = Cookier;


}(window));
