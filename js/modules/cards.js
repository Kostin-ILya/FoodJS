function cards() {
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
}

export default cards;
