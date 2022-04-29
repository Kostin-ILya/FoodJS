'use strict';

document.addEventListener('DOMContentLoaded', () => {
	//===================================== Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader');

	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');

			tabs.forEach((item) => {
				item.classList.remove('tabheader__item_active');
			});
		});
	}
	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');

		tabs[i].classList.add('tabheader__item_active');
	}

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		console.log(target);

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	hideTabContent();
	showTabContent();

	//=========================================== Timer

	const deadLine = '2022-08-01';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / (1000 * 60)) % 60),
			seconds = Math.floor(t / 1000) % 60;

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadLine);

	//===================================== Modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	// const timerModal = setTimeout(openModal, 50000);

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.querySelector('.modal__dialog').classList.remove('hide');
		document.body.style.overflow = '';
	}
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		// clearTimeout(timerModal);
	}
	function openModalByScroll() {
		if (
			window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.offsetHeight
		) {
			openModal();
			window.removeEventListener('scroll', openModalByScroll);
		}
	}

	window.addEventListener('scroll', openModalByScroll);
	openModalByScroll();

	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', () => {
			openModal();
		});
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.dataset.close == '') {
			closeModal();
		}
		// e.target.getAttribute('data-close') == ''
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// ====================================== Class

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.exchangeRate = 95;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
			this.changeToRUB();
		}

		changeToRUB() {
			this.price *= this.exchangeRate;
		}

		render() {
			const elem = document.createElement('div');
			const defaultClass = 'menu__item';

			if (this.classes.length === 0) {
				elem.classList.add(defaultClass);
			} else {
				this.classes.forEach((className) => {
					elem.classList.add(className);
				});
			}

			elem.innerHTML = `				
				<img src= ${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>				
			`;

			this.parent.append(elem);
		}
	}

	async function getResourse(url) {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Ошибочка ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getResourse('http://localhost:3000/menu')
		.then((data) => {
			data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(
					img,
					altimg,
					title,
					descr,
					price,
					'.menu .container'
				).render();
			});
		})
		.catch((err) => console.error(err));

	// axios
	// 	.get('http://localhost:3000/menu')
	// 	.then((value) => {
	// 		value.data.forEach(({ img, altimg, title, descr, price }) => {
	// 			new MenuCard(
	// 				img,
	// 				altimg,
	// 				title,
	// 				descr,
	// 				price,
	// 				'.menu .container'
	// 			).render();
	// 		});
	// 	})
	// 	.catch((err) => console.error(err));

	// new MenuCard(
	// 	'img/tabs/vegy.jpg',
	// 	'vegy',
	// 	'Меню "Фитнес"',
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	6,
	// 	'.menu .container'
	// ).render();
	// new MenuCard(
	// 	'img/tabs/elite.jpg',
	// 	'elite',
	// 	'Меню “Премиум”',
	// 	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но	и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!lorem lorem lorem lorem',
	// 	15,
	// 	'.menu .container'
	// ).render();
	// new MenuCard(
	// 	'img/tabs/post.jpg',
	// 	'post',
	// 	'Меню "Постное"',
	// 	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие	продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное		количество белков за счет тофу и импортных вегетарианских стейков.',
	// 	12,
	// 	'.menu .container'
	// ).render();

	// const newCard = new MenuCard(
	// 	'img/tabs/vegy.jpg',
	// 	'vegy',
	// 	'Меню "Фитнес"',
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	9,
	// 	'.menu .container'
	// );
	// newCard.render();

	// ============================ Forms (XMLHttpRequest) Fetch

	const forms = document.querySelectorAll('form');
	const messages = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Ожидайте, мы с Вами свяжемся',
		failure: 'Что-то пошло не так',
	};

	forms.forEach((item) => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: data,
		});
		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			// const r = new XMLHttpRequest();
			const formData = new FormData(form);

			const statusMessage = document.createElement('img');
			statusMessage.src = messages.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.after(statusMessage);
			// Вставка в виде HTML
			// form.insertAdjacentHTML(
			// 	'afterend',
			// 	`<img src='${messages.loading}' style ='display: block; margin: 0 auto;'>`
			// );
			// отправка на сервер JSON
			// если нужна отправка FormData, то надо удалить [r.setRequestHeader] и поменять в r.send(formData). XMLHttpRequest и FormData => не нужны HTTP заголовки, они проставляются авто

			// МЕТОДЫ ПАРСИНГА FORMDATA В JSON
			// const obj = {};
			// formData.forEach((value, key) => {
			// 	obj[key] = value;
			// });
			// const json = JSON.stringify(obj);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			// fetch('http://localhost:3000/requests', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-type': 'application/json',
			// 	},
			// 	body: JSON.stringify(obj),
			// })
			// 	.then((response) => response.text())
			postData('http://localhost:3000/requests', json)
				.then((data) => {
					console.log(data);
					showThanksModal(messages.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(messages.failure);
				})
				.finally(() => {
					form.reset();
				});
			// r.open('POST', 'server.php');
			// r.setRequestHeader('Content-type', 'application/json');
			// r.send(json);

			// r.addEventListener('load', () => {
			// 	if (r.status === 200) {
			// 		console.log(json);
			// 		showThanksModal(messages.success);
			// 		form.reset();
			// 		statusMessage.remove();
			// 	} else {
			// 		showThanksModal(messages.failure);
			// 	}
			// });
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		modal.append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			closeModal();
		}, 2000);
	}

	// fetch('https://jsonplaceholder.typicode.com/todos/67')
	// 	.then((data) => {
	// 		console.dir(data);
	// 		return data;
	// 	})
	// 	.then((response) => response.json())
	// 	.then((json) => {
	// 		console.log(json);
	// 	});

	// ======================================== Slider

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

	// ============================== Calc

	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.sex) {
		sex = localStorage.sex;
		// if (localStorage.getItem('sex')) {
		// 	sex = localStorage.getItem('sex')
		// }
	} else {
		sex = 'female';
		localStorage.sex = sex;
	}
	if (localStorage.ratio) {
		ratio = localStorage.ratio;
	} else {
		ratio = '1.375';
		localStorage.ratio = ratio;
	}
	// if (localStorage.getItem('height')) {
	// 	height = localStorage.getItem('height');
	// 	document.querySelector('#height').value = height;
	// }
	// if (localStorage.getItem('weight')) {
	// 	weight = localStorage.getItem('weight');
	// 	document.querySelector('#weight').value = weight;
	// }
	// if (localStorage.getItem('age')) {
	// 	age = localStorage.getItem('age');
	// 	document.querySelector('#age').value = age;
	// }

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
			);
		} else {
			result.textContent = Math.round(
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
			);
		}
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((elem) => {
			elem.classList.remove(activeClass);

			if (elem.id === localStorage.sex) {
				elem.classList.add(activeClass);
			}
			if (elem.dataset.ratio === localStorage.ratio) {
				// elem.getAttribute('data-ratio') === localStorage.getAttribute('ratio');
				elem.classList.add(activeClass);
			}
		});
	}

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((elem) => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.dataset.ratio;
					// ratio = +e.target.getAttribute('data-ratio');
					localStorage.ratio = ratio;
					// localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); У Ивана так
				} else {
					sex = e.target.getAttribute('id');
					// localStorage.setItem('sex', sex);
					localStorage.sex = sex;
				}

				elements.forEach((item) => item.classList.remove(activeClass));

				e.target.classList.add(activeClass);

				calcTotal();
			});
		});
	}

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		const error = document.createElement('div');
		error.innerHTML = 'Введите число';
		error.style.cssText = `
			color: red;
			transform: translateX(-30px);    
			display: flex;
			align-items: center;    
		`;

		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
				input.after(error);
			} else {
				input.style.border = '';
				error.remove();
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}

			calcTotal();
			// switch (input.getAttribute('id')) {
			// 	case 'height':
			// 		height = +input.value;
			// 		localStorage.setItem('height', height);
			// 		break;
			// 	case 'weight':
			// 		weight = +input.value;
			// 		localStorage.setItem('weight', weight);
			// 		break;
			// 	case 'age':
			// 		age = +input.value;
			// 		localStorage.setItem('age', age);
			// 		break;
			// }  Запись рост/вес/возраст в localStorage, но тогда дефолтные значения перекрывают placeholder и не понятно становится, что это за значения
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings(
		'.calculating__choose_big div',
		'calculating__choose-item_active'
	);

	calcTotal();

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation(
		'.calculating__choose_big div',
		'calculating__choose-item_active'
	);

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
});
