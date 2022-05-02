function calc() {
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
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
			);
		} else {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
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
					// sex = e.target.id;
					localStorage.sex = sex;
					// localStorage.setItem('sex', sex);
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
		error.textContent = 'Введите число';
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
}

export default calc;
