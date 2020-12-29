/**
 *@name Global Scripts
 *@file This brings all the scripts together, to be used.
 *@copyright ChrisPond.com
 *@author Chris Pond
 *@version 1.0.0
 */

// COMPONENT SCRIPTS
import { CpCarousel } from '../../components/carousel/scripts';

// GLOBAL OBJECTS
window.CpCarousel = CpCarousel;

//Carousel Initialization
const cpCarousels = document.querySelectorAll('.cp-carousel');
const cpCarouselsLength = cpCarousels.length;

const cpCarouselOptionsHandler = (carouselWidth) => {
  if (carouselWidth <= 480) {
    return { slidesInView: 2.5, isInfinit: false };
  } else if (carouselWidth > 480 && carouselWidth <= 960) {
    return { slidesInView: 3.5, isInfinit: false };
  }

  return { slidesInView: 5.5, isInfinit: false };
};

const updateControls = (nextButton, prevButton, total, index) => {
  if (index <= 1) {
    disableButton(prevButton);
  } else if (index >= total) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
    enableButton(prevButton);
  }
};

const disableButton = (button) => {
  button.classList.add('disabled');
  button.setAttribute('aria-disabled', true);
};

const enableButton = (button) => {
  button.classList.remove('disabled');
  button.removeAttribute('aria-disabled');
};

if (cpCarouselsLength > 0) {
  for (let i = 0; i < cpCarouselsLength; i++) {
    const carouselElement = cpCarousels[i];
    const a11yLive = carouselElement.querySelector('.cp-carousel-a11y-live');
    const nextButton = carouselElement.querySelector('.cp-carousel-next');
    const prevButton = carouselElement.querySelector('.cp-carousel-prev');

    const carouselElementWidth = carouselElement.clientWidth;
    const initialCarouselOptions = cpCarouselOptionsHandler(
      carouselElementWidth
    );

    const carousel = new CpCarousel(carouselElement, initialCarouselOptions);

    // Add Next/Previous toggle controls
    prevButton.addEventListener('click', () => {
      carousel.onPrevious();
    });
    nextButton.addEventListener('click', () => {
      carousel.onNext();
    });

    if (!initialCarouselOptions.isInfinit) {
      updateControls(
        nextButton,
        prevButton,
        carouselElement.querySelectorAll('.cp-carousel-slider-slide').length,
        1
      );
    }

    // Handle carousel callback functions
    carousel.onSlideStop((slide) => {
      const { options, slideElement, slideIndex } = slide;

      console.log('*****', slide, slideElement);

      if (!options.isInfinit) {
        updateControls(
          nextButton,
          prevButton,
          carouselElement.querySelectorAll('.cp-carousel-slider-slide').length -
            options.slidesInView,
          slideIndex
        );
      } else {
        enableButton(nextButton);
        enableButton(prevButton);
      }

      // i18n: Announce slide update
      const slideLabel = slideElement.getAttribute('aria-label');
      a11yLive.textContent = slideLabel;
    });

    // Update carousel options onResize
    let updateCarousel;

    window.addEventListener('resize', () => {
      clearTimeout(updateCarousel);
      updateCarousel = setTimeout(() => {
        const itemWidth = carouselElement.clientWidth;
        carousel.updateOptions(cpCarouselOptionsHandler(itemWidth));
      }, 1000);
    });
  }
}
