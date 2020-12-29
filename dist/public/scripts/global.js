(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _scripts = require("../../components/carousel/scripts");

/**
 *@name Global Scripts
 *@file This brings all the scripts together, to be used.
 *@copyright ChrisPond.com
 *@author Chris Pond
 *@version 1.0.0
 */
// COMPONENT SCRIPTS
// GLOBAL OBJECTS
window.CpCarousel = _scripts.CpCarousel; //Carousel Initialization

var cpCarousels = document.querySelectorAll('.cp-carousel');
var cpCarouselsLength = cpCarousels.length;

var cpCarouselOptionsHandler = function cpCarouselOptionsHandler(carouselWidth) {
  if (carouselWidth <= 480) {
    return {
      slidesInView: 2.5,
      isInfinit: false
    };
  } else if (carouselWidth > 480 && carouselWidth <= 960) {
    return {
      slidesInView: 3.5,
      isInfinit: false
    };
  }

  return {
    slidesInView: 5.5,
    isInfinit: false
  };
};

var updateControls = function updateControls(nextButton, prevButton, total, index) {
  if (index <= 1) {
    disableButton(prevButton);
  } else if (index >= total) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
    enableButton(prevButton);
  }
};

var disableButton = function disableButton(button) {
  button.classList.add('disabled');
  button.setAttribute('aria-disabled', true);
};

var enableButton = function enableButton(button) {
  button.classList.remove('disabled');
  button.removeAttribute('aria-disabled');
};

if (cpCarouselsLength > 0) {
  var _loop = function _loop(i) {
    var carouselElement = cpCarousels[i];
    var a11yLive = carouselElement.querySelector('.cp-carousel-a11y-live');
    var nextButton = carouselElement.querySelector('.cp-carousel-next');
    var prevButton = carouselElement.querySelector('.cp-carousel-prev');
    var carouselElementWidth = carouselElement.clientWidth;
    var initialCarouselOptions = cpCarouselOptionsHandler(carouselElementWidth);
    var carousel = new _scripts.CpCarousel(carouselElement, initialCarouselOptions); // Add Next/Previous toggle controls

    prevButton.addEventListener('click', function () {
      carousel.onPrevious();
    });
    nextButton.addEventListener('click', function () {
      carousel.onNext();
    });

    if (!initialCarouselOptions.isInfinit) {
      updateControls(nextButton, prevButton, carouselElement.querySelectorAll('.cp-carousel-slider-slide').length, 1);
    } // Handle carousel callback functions


    carousel.onSlideStop(function (slide) {
      var options = slide.options,
          slideElement = slide.slideElement,
          slideIndex = slide.slideIndex;
      console.log('*****', slide, slideElement);

      if (!options.isInfinit) {
        updateControls(nextButton, prevButton, carouselElement.querySelectorAll('.cp-carousel-slider-slide').length - options.slidesInView, slideIndex);
      } else {
        enableButton(nextButton);
        enableButton(prevButton);
      } // i18n: Announce slide update


      var slideLabel = slideElement.getAttribute('aria-label');
      a11yLive.textContent = slideLabel;
    }); // Update carousel options onResize

    var updateCarousel = void 0;
    window.addEventListener('resize', function () {
      clearTimeout(updateCarousel);
      updateCarousel = setTimeout(function () {
        var itemWidth = carouselElement.clientWidth;
        carousel.updateOptions(cpCarouselOptionsHandler(itemWidth));
      }, 1000);
    });
  };

  for (var i = 0; i < cpCarouselsLength; i++) {
    _loop(i);
  }
}

},{"../../components/carousel/scripts":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CpCarousel = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *@file All scripts responsible for the CpCarousel component
 *@copyright ChrisPond.com
 *@author Chris Pond
 */

/**
 * @name CpCarousel
 * @class CpCarousel
 * @description Builds an interactive carousel.
 * @param {element} element - Required: DOM element
 * @param {object} options - Optional: {isInfinit: true, slidesInView: 1, firstSlideIndex: 1}
 * @example
 * const myCarousel = new CpCarousel(document.querySelector('.cp-carousel', {isInfinit: false, slidesInView: 1.5}));
 **/
var defaultOptions = {
  isInfinit: false,
  firstSlideIndex: 1,
  slidesInView: 1
};

var CpCarousel = /*#__PURE__*/function () {
  function CpCarousel(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;

    _classCallCheck(this, CpCarousel);

    this.options = {
      isInfinit: options.isInfinit || defaultOptions.isInfinit,
      firstSlideIndex: options.firstSlideIndex || defaultOptions.firstSlideIndex,
      slidesInView: options.slidesInView || defaultOptions.slidesInView
    }; //DOM Elements

    this.animateTransition = false;
    this.element = element;
    this.wrapper = this.element.querySelector('.cp-carousel-wrapper');
    this.slider = this.wrapper.querySelector('.cp-carousel-slider');
    this.slides = this.slider.querySelectorAll('.cp-carousel-slider-slide');
    this.hasEnoughSlides = this.slides.length > this.options.slidesInView;

    if (this.options.isInfinit && this.hasEnoughSlides) {
      this._cloneChildren(Math.ceil(this.options.slidesInView));
    } //Properties


    this.carouselDisabled = !this.hasEnoughSlides;
    this.carouselPosition = 0;
    this.carouselStartPosition = this.carouselPosition;
    this.currentSlide = this.options.firstSlideIndex - 1;
    this.isAnimating = false;
    this.maxSliderPosition = 0;
    this.mouseDown = false;
    this.mouseMove = {
      x: 0,
      y: 0
    };
    this.mousePosition = {
      x: 0,
      y: 0
    };
    this.showSlides = 0;
    this.swipeNext = false;
    this.totalSlides = this.slides.length;
    this.wrapperWidth = 0;
    this.slideQuotient = this.options.slidesInView / this.totalSlides;
    this.sliderWidth = this.wrapperWidth * this.totalSlides;
    this.slideWidth = 100 / this.showSlides;
    this.carouselResizeTimeout; //Bind Event Methods

    this._onClick = this._onClick.bind(this);
    this._onDown = this._onDown.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onTouch = this._onTouch.bind(this);
    this._onTransitionEnd = this._onTransitionEnd.bind(this);
    this._onUp = this._onUp.bind(this);

    this._setProperties();

    if (!this.carouselDisabled) {
      this._addEvents();
    }
  }
  /**
  @name _addEvents
  @description Handles iniating event listeners
  @memberof CpCarousel
  @method
  @private
  */


  _createClass(CpCarousel, [{
    key: "_addEvents",
    value: function _addEvents() {
      this.slider.addEventListener('click', this._onClick);
      this.slider.addEventListener('mousedown', this._onDown);
      this.slider.addEventListener('touchstart', this._onDown);
      this.slider.addEventListener('touchstart', this._onTouch);
      this.slider.addEventListener('mousemove', this._onMove);
      this.slider.addEventListener('touchmove', this._onMove);
      this.slider.addEventListener('mouseleave', this._onUp);
      this.slider.addEventListener('mouseup', this._onUp);
      this.slider.addEventListener('touchend', this._onUp);
      this.slider.addEventListener('transitionend', this._onTransitionEnd);
      window.addEventListener('resize', this._onResize);
    }
  }, {
    key: "_removeEvents",
    value: function _removeEvents() {
      this.slider.removeEventListener('click', this._onClick);
      this.slider.removeEventListener('mousedown', this._onDown);
      this.slider.removeEventListener('touchstart', this._onDown);
      this.slider.removeEventListener('touchstart', this._onTouch);
      this.slider.removeEventListener('mousemove', this._onMove);
      this.slider.removeEventListener('touchmove', this._onMove);
      this.slider.removeEventListener('mouseleave', this._onUp);
      this.slider.removeEventListener('mouseup', this._onUp);
      this.slider.removeEventListener('touchend', this._onUp);
      this.slider.removeEventListener('transitionend', this._onTransitionEnd);
      window.removeEventListener('resize', this._onResize);
    } // _onSlideFocus(event) {
    //   if (!this.mouseDown && !touchstart) {
    //     this.currentSlide = [...this.slides].indexOf(event.target);
    //     const targetSlidePosition = -(this.currentSlide * this.slideWidth);
    //     const safeSlidePosition =
    //       targetSlidePosition < this.maxSliderPosition
    //         ? this.maxSliderPosition
    //         : targetSlidePosition;
    //     this.animateTransition = true;
    //     this.onSlideStart(this.currentSlide);
    //     this._updateSliderPosition(safeSlidePosition);
    //   } else {
    //     event.preventDefault();
    //   }
    // }

    /**
     * @name _calcMaxPos
     * @description Calculates the maximum position of the slider
     * @method
     * @private
     * @memberof CpCarousel
     * @param {number} parentWidth -
     * @param {number} childWidth -
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_calcMaxPos",
    value: function _calcMaxPos(parentWidth, childWidth) {
      return -((childWidth - parentWidth) / parentWidth) * 100;
    }
    /**
     * @name _calcDragPos
     * @description Calculates the position of the slider while it is being dragged.
     * @method
     * @private
     * @memberof CpCarousel
     * @param {number} position -
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_calcDragPos",
    value: function _calcDragPos(position) {
      var newPosition = this.carouselStartPosition + position;
      var throttle = 0.1; // Throttle drag speed/distance if the carousel is being dragged out of bounds

      if (newPosition > 0) {
        newPosition = (this.carouselStartPosition + position) * throttle;
      } else if (newPosition < this.maxSliderPosition) {
        newPosition = this.maxSliderPosition + position * throttle;
      }

      return newPosition;
    }
    /**
     * @name _cloneChildren
     * @description Clones first and last slides and appends them to the carousel, so slides appear infinit. This is used when
     * the carousel option 'isInfinit' is set to true.
     * @method
     * @private
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_cloneChildren",
    value: function _cloneChildren(numberOfClones) {
      var _this = this;

      var numberOfSlides = this.slides.length;

      var clonedSlideElement = function clonedSlideElement(element) {
        var clonedElement = element.cloneNode(true);
        clonedElement.classList.add('clone');
        clonedElement.setAttribute('aria-hidden', 'true');
        clonedElement.setAttribute('tabindex', '-1');
        return clonedElement;
      }; // Clone first visible slides and add them to the end of the carousel


      Object.keys(this.slides).slice(numberOfSlides - numberOfClones, numberOfSlides).forEach(function (slide) {
        _this.slider.insertBefore(clonedSlideElement(_this.slides[slide]), _this.slides[0]);
      }); // Clone the last visible slides and add them to the start of the carousel

      Object.keys(this.slides).slice(0, numberOfClones).forEach(function (slide) {
        _this.slider.appendChild(clonedSlideElement(_this.slides[slide]));
      });
      this.slides = this.slider.querySelectorAll('.cp-carousel-slider-slide');
      this.totalSlides = this.slides.length;
    }
    /**
     * @name _currentIndexBuffed
     * @description TODO
     * @method
     * @private
     * @memberof CpCarousel
     **/

  }, {
    key: "_currentIndexBuffed",
    value: function _currentIndexBuffed(index) {
      var buffedIndex = index;
      var clonedSlidesLength = this.slider.querySelectorAll('.clone').length;
      var originalSlidesLength = this.totalSlides - clonedSlidesLength;

      if (this.options.isInfinit) {
        var startIndex = originalSlidesLength - clonedSlidesLength / 2 - 1;

        for (var i = 1; i < index; i++) {
          startIndex = startIndex === originalSlidesLength ? 1 : startIndex + 1;
        }

        buffedIndex = startIndex;
      } else {
        buffedIndex = buffedIndex + 1;
      }

      return buffedIndex;
    }
    /**
     * @name destroy
     * @description Responsible for destroying instance of CpCarousel class
     * @method
     * @public
     * @memberOf CpCarousel
     * @example
     * const myCarousel = new CpCarousel(document.querySelector('.cp-carousel'));
     * myCarousel.destroy();
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this._removeEvents();

      this._removeClonedChildren();

      this._disableCarousel();

      this._removeStyles();
    }
    /**
     * @name _disableCarousel
     * @description TODO
     * @method
     * @private
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_disableCarousel",
    value: function _disableCarousel() {
      this.element.classList.add('disabled');
      this.carouselDisabled = true;

      if (typeof this.disableCallback === 'function') {
        this.disableCallback(this.carouselDisabled);
      }
    }
    /**
     * @name _enableCarousel
     * @description TODO
     * @method
     * @private
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_enableCarousel",
    value: function _enableCarousel() {
      this.element.classList.remove('disabled');
      this.carouselDisabled = false;

      if (typeof this.disableCallback === 'function') {
        this.disableCallback(this.carouselDisabled);
      }
    }
    /**
     * @name onDisable
     * @description TODO
     * @method
     * @public
     * @memberof CpCarousel
     **/

  }, {
    key: "onDisable",
    value: function onDisable(disableCallback) {
      this.disableCallback = disableCallback;
    }
    /**
     * @name onSlideStart
     * @description Callback when carousel is going to change slides
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "onSlideStart",
    value: function onSlideStart(startCallback) {
      this.startCallBack = startCallback;
    }
    /**
     * @name onSlideStop
     * @description Callback when carousel has finished a slide change
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "onSlideStop",
    value: function onSlideStop(stopCallback) {
      this.stopCallBack = stopCallback;
    }
    /**
     * @name _updateA11y
     * @description TODO
     * @method
     * @private
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_updateA11y",
    value: function _updateA11y() {
      var _this2 = this;

      var lastSlideInView = this.currentSlide + Math.floor(this.options.slidesInView) - 1;
      this.slides.forEach(function (slide, index) {
        if (_this2.carouselDisabled) {
          slide.removeAttribute('tabindex');
          slide.removeAttribute('aria-hidden');
          slide.querySelectorAll('a').forEach(function (anchor) {
            anchor.removeAttribute('tabindex');
          });
        } else if (index >= _this2.currentSlide && index <= lastSlideInView) {
          slide.setAttribute('aria-hidden', false);
          slide.setAttribute('tabindex', '0');
          slide.querySelectorAll('a').forEach(function (anchor) {
            anchor.removeAttribute('tabindex');
          });
        } else if (!_this2.carouselDisabled) {
          slide.setAttribute('aria-hidden', true);
          slide.setAttribute('tabindex', '-1');
          slide.querySelectorAll('a').forEach(function (anchor) {
            anchor.setAttribute('tabindex', '-1');
          });
        }
      });
    }
    /**
     * @name _onClick
     * @description Click handler
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_onClick",
    value: function _onClick(event) {
      if (this.mousePosition.x !== 0) {
        event.preventDefault();
      }
    }
    /**
     * @name _onDown
     * @description Event handler for when mouse is held down
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_onDown",
    value: function _onDown() {
      this.animateTransition = false;
      this.mouseDown = true;
      this.mousePosition = {
        x: 0,
        y: 0
      };
      this.mouseMove = {
        x: event.clientX || event.touches[0].clientX,
        y: event.clientY || event.touches[0].clientY
      };
      this.carouselStartPosition = this.carouselPosition;
    }
    /**
     * @name _onMove
     * @description Event handler for when mouse is moving in the carousel
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_onMove",
    value: function _onMove(event) {
      // Calculate new positions
      var mouseMoveNew = {
        x: event.clientX || event.touches[0].clientX,
        y: event.clientY || event.touches[0].clientY
      };
      var mousePositionNew = {
        x: this.mousePosition.x + (mouseMoveNew.x - this.mouseMove.x),
        y: this.mousePosition.y + (mouseMoveNew.y - this.mouseMove.y)
      }; // Update properties

      this.mousePosition = mousePositionNew;
      this.mouseMove = mouseMoveNew; // Fire callback

      if (this.mouseDown && this.mousePosition.x === 0 && typeof this.startCallBack === 'function') {
        this.startCallBack({
          slideElement: this.slides[Math.ceil(this.currentSlide)],
          slideIndex: this._currentIndexBuffed(Math.ceil(this.currentSlide))
        });
      } // Only update the position of the slides if mouseDown/touchStart & moving horizontal


      if (this.mouseDown && Math.abs(this.mousePosition.x) > Math.abs(this.mousePosition.y)) {
        event.preventDefault();

        var position = this._calcDragPos(mousePositionNew.x / this.wrapperWidth * 100);

        this._updateSliderPosition(position);
      }
    }
    /**
     * @name _onNext
     * @description Event handler when next button is triggered
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "onNext",
    value: function onNext() {
      if (!this.isAnimating && !this.carouselDisabled) {
        // Fire callback
        if (typeof this.startCallBack === 'function') {
          this.startCallBack({
            slideElement: this.slides[Math.ceil(this.currentSlide)],
            slideIndex: this._currentIndexBuffed(Math.ceil(this.currentSlide))
          });
        }

        var targetSlidePosition = -((this.currentSlide + 1) * this.slideWidth);
        var safeSlidePosition = targetSlidePosition < this.maxSliderPosition ? this.maxSliderPosition : targetSlidePosition;

        if (this.options.isInfinit || safeSlidePosition >= this.maxSliderPosition && this.currentSlide < this.totalSlides - 1) {
          this.isAnimating = true;
          this.animateTransition = true;

          this._updateSliderPosition(safeSlidePosition);
        }
      }
    }
    /**
     * @name _onPrevious
     * @description Event handler when previous button is triggered
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "onPrevious",
    value: function onPrevious() {
      if (!this.isAnimating && !this.carouselDisabled) {
        // Fire callback
        if (typeof this.startCallBack === 'function') {
          this.startCallBack({
            slideElement: this.slides[Math.ceil(this.currentSlide)],
            slideIndex: this._currentIndexBuffed(Math.ceil(this.currentSlide))
          });
        }

        var targetSlidePosition = -((this.currentSlide - 1) * this.slideWidth);

        if (this.options.isInfinit || targetSlidePosition <= 0) {
          this.isAnimating = true;
          this.animateTransition = true;

          this._updateSliderPosition(targetSlidePosition);
        }
      }
    }
  }, {
    key: "_onResize",
    value: function _onResize(event) {
      var _this3 = this;

      console.log('*****', !this.carouselResizeTimeout, this.slider.style.minWidth);

      if (!this.carouselResizeTimeout) {
        this.slider.style.minWidth = "".concat(this.slider.clientWidth, "px");
      }

      clearTimeout(this.carouselResizeTimeout);
      this.carouselResizeTimeout = setTimeout(function () {
        // Remove min-width
        _this3.slider.style.removeProperty('min-width');

        _this3.carouselResizeTimeout = null;
      }, 1000);
    }
    /**
     * @name _onTouch
     * @description Handles touch specific events
     * @method
     * @private
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_onTouch",
    value: function _onTouch(event) {
      this.element.classList.add('touch');
    }
    /**
     * @name _onTransitionEnd
     * @description Event handler when slider is finished animating
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_onTransitionEnd",
    value: function _onTransitionEnd() {
      // If the carousel isInfinit we need to move the user from a cloned slide to the read slide
      if (this.options.isInfinit) {
        // Turn animate off so the user doesn't see the switch from the cloned slide to the real slide
        this.animateTransition = false;

        if (this.carouselPosition + this.slideWidth > 0) {
          var lastSlide = this.totalSlides - Math.ceil(this.showSlides) * 2;
          var goToPosition = -(lastSlide * this.slideWidth);

          this._updateSliderPosition(goToPosition);
        } else if (this.carouselPosition - this.slideWidth < this.maxSliderPosition) {
          var _goToPosition = -(this.slideWidth * Math.ceil(this.showSlides));

          this._updateSliderPosition(_goToPosition);
        }
      }

      this._updateA11y(); // Fire onSlideStop callback with currentSlideIndex


      if (typeof this.stopCallBack === 'function') {
        this.stopCallBack({
          options: _objectSpread({}, this.options),
          slideElement: this.slides[Math.ceil(this.currentSlide)],
          slideIndex: this._currentIndexBuffed(Math.ceil(this.currentSlide))
        });
      }

      this.isAnimating = false;
    }
    /**
     * @name _onUp
     * @description Event handler for when mouse is let go
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_onUp",
    value: function _onUp() {
      // Only execute if mouseDown/touchStart has been triggered
      if (this.mouseDown) {
        this.swipeNext = this.carouselStartPosition > this.carouselPosition;
        var snapPosition = Math.ceil(this.carouselPosition / this.slideWidth) * this.slideWidth; // Send the carousel in the other direction if swiping to the next slide

        if (this.swipeNext) {
          snapPosition = Math.floor(this.carouselPosition / this.slideWidth) * this.slideWidth;
        } // Override snapPosition if it is headed out of bounds


        if (this.carouselPosition <= this.maxSliderPosition || snapPosition <= this.maxSliderPosition) {
          snapPosition = this.maxSliderPosition;
        } else if (this.carouselPosition > 0) {
          snapPosition = 0;
        } // Set animation to true so the carousel animate when it snaps


        this.animateTransition = true;
        this.mouseDown = false;

        this._updateSliderPosition(snapPosition);
      }

      this.mouseDown = false;
    }
    /**
     * @name _removeClonedChildren
     * @description TODO
     * @method
     * @private
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_removeClonedChildren",
    value: function _removeClonedChildren() {
      var clonedSlides = this.slider.querySelectorAll('.clone');
      var clonedSlidesLength = clonedSlides.length;

      for (var index = 0; index < clonedSlidesLength; index++) {
        this.slider.removeChild(clonedSlides[index]);
      }

      this.slides = this.slider.querySelectorAll('.cp-carousel-slider-slide');
      this.totalSlides = this.slides.length;
    }
    /**
     * @name _setDimensions
     * @description Sets the slide width based on percent
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_setDimensions",
    value: function _setDimensions() {
      var _this4 = this;

      // Set slider width
      this.slider.style.width = "calc((".concat(this.totalSlides, " / ").concat(this.showSlides, ") * 100%)"); // Set slide widths

      this.slides.forEach(function (slide) {
        slide.style.width = "calc(100% / ".concat(_this4.totalSlides, ")");
      }); // Position carousel to currentSlide

      this._updateSliderPosition(this.carouselPosition);
    }
  }, {
    key: "_removeStyles",
    value: function _removeStyles() {
      this.slider.removeAttribute('style');
      this.slides.forEach(function (slide) {
        slide.removeAttribute('style');
      });
    }
    /**
     * @name _setProperties
     * @description Sets all the local properties
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_setProperties",
    value: function _setProperties() {
      this.totalSlides = this.slides.length;
      this.options.isInfinit = this.options.isInfinit && this.hasEnoughSlides;
      this.showSlides = this.options.slidesInView > this.totalSlides ? this.totalSlides : this.options.slidesInView;
      var safeGoToSlide = this.options.firstSlideIndex < 1 ? 1 : this.options.firstSlideIndex; // If carousel isInfinit and 'safeGoToSlide' is greater then total slides (not including clones)

      if (this.options.isInfinit && safeGoToSlide >= this.totalSlides - this.showSlides * 2) {
        safeGoToSlide = Math.ceil(this.showSlides);
      } // If carousel isInfinit and 'safeGoToSlide' exists
      else if (this.options.isInfinit && this.totalSlides > this.showSlides) {
          //safeGoToSlide = safeGoToSlide + Math.ceil(this.showSlides) - 1;
          safeGoToSlide = Math.ceil(safeGoToSlide) + Math.ceil(this.showSlides) - 1;
        } // If requested firstSlideIndex doesn't exist. (The number is too great) Show the first go to first slide
        else if (safeGoToSlide > this.totalSlides) {
            safeGoToSlide = 0;
          } // TODO:
          else if (safeGoToSlide + this.showSlides >= this.totalSlides + this.showSlides) {
              safeGoToSlide -= this.showSlides; // TODO:
            } else {
              safeGoToSlide -= 1;
            }

      if (!this.hasEnoughSlides) {
        this._disableCarousel();

        this._removeEvents();
      } else if (this.carouselDisabled) {
        this._enableCarousel();

        this._addEvents();
      }

      this.currentSlide = safeGoToSlide;
      this.slideWidth = 100 / this.showSlides;
      this.carouselPosition = -(this.currentSlide * this.slideWidth);
      this.carouselStartPosition = this.carouselPosition;
      this.slideQuotient = this.showSlides / this.totalSlides;
      this.wrapperWidth = this.wrapper.clientWidth;
      this.sliderWidth = this.wrapperWidth * (this.totalSlides / this.showSlides);
      this.maxSliderPosition = this._calcMaxPos(this.wrapperWidth, this.sliderWidth);

      this._setDimensions();

      this._updateA11y();
    }
    /**
     * @name updateOptions
     * @description Updates the options of the class. This is useful when handling window resize events.
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "updateOptions",
    value: function updateOptions(newOptions) {
      var _this5 = this;

      this.animateTransition = false;
      var currentSlideIndex = this.currentSlide;
      var clonedSlidesLength = this.slider.querySelectorAll('.clone').length;
      this.hasEnoughSlides = this.slides.length - clonedSlidesLength > newOptions.slidesInView; // Adjust currentSlideIndex if there are cloned slides

      if (clonedSlidesLength) {
        currentSlideIndex = Math.abs(this.currentSlide - Math.ceil(this.options.slidesInView));
      } // If isInfinit has changed to false


      if (newOptions.isInfinit === false && this.options.isInfinit === true || this.options.isInfinit === true && !this.hasEnoughSlides) {
        this._removeClonedChildren();

        this.options.firstSlideIndex = currentSlideIndex + 1;
      } // If 'isInfinit' has change to true OR 'slidesInView' have changed we need to update the cloned children


      if (this.hasEnoughSlides && (newOptions.isInfinit && !this.options.isInfinit || newOptions.slidesInView && newOptions.isInfinit)) {
        this._removeClonedChildren();

        this._cloneChildren(Math.ceil(newOptions.slidesInView || this.options.slidesInView));

        this.options.firstSlideIndex = currentSlideIndex + 1;
      } // Update options


      Object.keys(newOptions).forEach(function (option) {
        _this5.options[option] = newOptions[option];
      });

      if (!this.hasEnoughSlides) {
        this.options.isInfinit = false;
        this.options.slidesInView = this.slides.length;
      }

      this._setProperties();
    }
    /**
     * @name _updateSliderPosition
     * @description Updates the position of the slider
     * @method
     * @public
     * @memberof CpCarousel
     * @example
     * const myCarousel = new CpCarousel();
     **/

  }, {
    key: "_updateSliderPosition",
    value: function _updateSliderPosition(position) {
      // Re-Calculate the position so it can be used for translate
      var translatePosition = this.maxSliderPosition < 0 ? position * this.slideQuotient : 0; // Animate the slider

      if (this.animateTransition) {
        this.slider.style.transition = 'transform 0.3s';
      } else {
        this.slider.style.transition = 'transform 0s';
      } // Move the slider


      this.slider.style.webkitTransform = "translateX(".concat(translatePosition, "%)");
      this.slider.style.transform = "translateX(".concat(translatePosition, "%)"); // Update Properties

      this.carouselPosition = position;

      if (!this.mouseDown) {
        this.currentSlide = Math.abs(position / this.slideWidth);
      }
    }
  }]);

  return CpCarousel;
}();

exports.CpCarousel = CpCarousel;

},{}]},{},[1]);
