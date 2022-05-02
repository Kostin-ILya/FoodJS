function slider() {
	// ======================= Slider 2 (animation + dots)

	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		arrowPrev = document.querySelector('.offer__slider-prev'),
		arrowNext = document.querySelector('.offer__slider-next'),
		current = document.querySelector('#current'),
		total = document.querySelector('#total'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1,
		offset = 0;

	function showActiveDot() {
		dots.forEach((dot) => (dot.style.opacity = '.5'));
		dots[slideIndex - 1].style.opacity = '1';
	}

	function showCurrentSlide() {
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	slidesWrapper.style.overflow = 'hidden';

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.3s all';

	slides.forEach((item) => {
		item.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ul'),
		dots = [];

	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if (i == 0) {
			dot.style.opacity = '1';
		}
		indicators.append(dot);
		dots.push(dot);
	}

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	arrowNext.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += parseInt(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		showCurrentSlide();
		showActiveDot();
	});

	arrowPrev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		showCurrentSlide();
		showActiveDot();
	});

	dots.forEach((dot) => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width);
			slidesField.style.transform = `translateX(-${offset}px)`;

			showCurrentSlide();
			showActiveDot();
		});
	});

	// =============================== Slider 1
	// const slides = document.querySelectorAll('.offer__slide'),
	// 	arrowPrev = document.querySelector('.offer__slider-prev'),
	// 	arrowNext = document.querySelector('.offer__slider-next'),
	// 	current = document.querySelector('#current'),
	// 	total = document.querySelector('#total');
	// let slideIndex = 1;
	// showSlides(slideIndex);
	// if (slides.length < 10) {
	// 	total.textContent = '0' + slides.length;
	// } else {
	// 	total.textContent = slides.length;
	// }
	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}
	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}
	// 	slides.forEach((slide) => {
	// 		slide.classList.add('hide');
	// 		slide.classList.remove('show');
	// 	});
	// 	slides[slideIndex - 1].classList.add('show');
	// 	if (slideIndex < 10) {
	// 		current.textContent = '0' + slideIndex;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }
	// function plusSlides(n) {
	// 	slideIndex += n;
	// 	showSlides(slideIndex);
	// }
	// arrowPrev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });
	// arrowNext.addEventListener('click', () => {
	// 	plusSlides(1);
	// });
}

export default slider;
