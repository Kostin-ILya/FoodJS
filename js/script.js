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

	const timerModal = setTimeout(openModal, 50000);

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
		clearTimeout(timerModal);
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

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		6,
		'.menu .container'
	).render();
	new MenuCard(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но	и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!lorem lorem lorem lorem',
		15,
		'.menu .container'
	).render();
	new MenuCard(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие	продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное		количество белков за счет тофу и импортных вегетарианских стейков.',
		12,
		'.menu .container'
	).render();

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
		postData(item);
	});

	function postData(form) {
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
			const obj = {};
			formData.forEach((value, key) => {
				obj[key] = value;
			});
			// const json = JSON.stringify(obj);

			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(obj),
			})
				.then((response) => response.text())
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
});
