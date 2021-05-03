//ф-ция фильтруем введенных данных по типу // получаем масив
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	hideAllResponseBlocks = () => {
		//Array.from создаёт новый экземпляр Array из массивоподобного или итерируемого объекта
		//находим по селектору все блоки с возможными ответами
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//перебираем блоки и скрываем их
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks(); //запускаем функцию перебора блоков с ответами
		document.querySelector(blockSelector).style.display = 'block'; //ищем соответствующий селектор и показываем его пользователю
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText; //если есть #error или #ok оповещаем про ошибку или все хорошо
		}
	},
	//ф-ция показать ошибку
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	//ф-ция показать положит результат
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//ф-ция показать нет результата
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => {
		try {
			//eval()-выполняет JavaScript код, представленный строкой, запускаем функцию искать тип и записываем в масив, масив приводим в строку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ? //если масив данных не пуст
				`Данные с типом ${type}: ${valuesArray}` :  //показываем тип данных и выборку по фильтру
				`Отсутствуют данные типа ${type}`;   //иначе отрицательный результат
			showResults(alertMsg); // показываем положительный результат обработки
		} catch (e) {
			showError(`Ошибка: ${e}`);//показываем ошибку пользователю
		}
	};

const filterButton = document.querySelector('#filter-btn'); //кнопка фильтрации

filterButton.addEventListener('click', e => { //по клику на кнопку фильтрации
	const typeInput = document.querySelector('#type'); //селект выбор типа данных по которому фильтровать
	const dataInput = document.querySelector('#data');  //импут для ввода данных 

	if (dataInput.value === '') { //защита от пустого поля если не пусто 
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //вспливающее окошко
		showNoResults(); //запускаем ф-цию показать результат
	} else {
		dataInput.setCustomValidity(''); //окошко предупреждения нет
		e.preventDefault(); //отключаем стандартную отправку формы
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

