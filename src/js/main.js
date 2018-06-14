if ("undefined" == typeof jQuery) {
	document.querySelector("#script-check").innerHTML = `<strong class="text-danger">Warning! </strong> JQuery not loaded!`;
	throw new Error("JQuery not loaded!");
}

$(function() {
	console.log("Main script loaded!");
	$("#script-check").text("JQuery loaded!");
})

	// Все загружено!!!!УРА :)
	jQuery(document).ready(function($) {

		var tomorrow = new Date();
		var tomorrow_seven = new Date();
		var start_reg = new Date();

		var now = new Date();

		tomorrow.setDate(tomorrow.getDate() + 1);
		tomorrow_seven.setDate(tomorrow_seven.getDate() + 8);	
		
		tomorrow.setHours(0,0,0,0);
		tomorrow.setMinutes(00);

		tomorrow_seven.setHours(0,0,0,0);
		tomorrow_seven.setMinutes(00);

		start_reg.setDate(tomorrow.getDate());
		start_reg.setHours(tomorrow.getHours() - 3);
		start_reg.setMinutes(tomorrow.getMinutes());

		$('#date_start').val(tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate() + ' ' + tomorrow.getHours() + ':' + tomorrow.getMinutes());
		
		$('#date_finish').val(tomorrow_seven.getFullYear() + '-' + (tomorrow_seven.getMonth() + 1) + '-' + tomorrow_seven.getDate()+ ' ' + tomorrow_seven.getHours() + ':' + tomorrow_seven.getMinutes());
		
		$('#start_reg').val(start_reg.getFullYear() + '-' + (start_reg.getMonth() + 1) + '-' + start_reg.getDate() + '-' + start_reg.getHours() + ':' + start_reg.getMinutes());

		// Сами табы
		$(function() {
			var tab = $('a[data-toggle="tab"]');

			tab.on('click', function() {
				event.preventDefault();
				$('.active').removeClass('active');
				$(this).parent().toggleClass('active');

				var target = $(this).attr('href');
				$(target).toggleClass('active');
			});
		});

		// Календарь
		$(function(){
			$('#date_start, #date_finish, #start_reg').datetimepicker({
				format:'YYYY-MM-DD' + " " + 'HH:mm', locale: 'ru'
			});
		});

		// Дополнительное поле описание
		$('#select').change(function(event) {
			if ($(this).val() == "Рекламные промоакции"){
				$('.bonus_plus').css('display', 'block');
			} else {
				$('.bonus_plus').css('display', 'none');
			};
			if ($(this).val() == "Бонусные купоны"){
				$('ul li:last-child').css('display', 'block');
			} else {
				$('ul li:last-child').css('display', 'none');
			};
		});

		// Для чекбоксов(Можно было бы сделать через дата атрибуты, допустим, для большого колличества checkbox, но я пошел по друому пути, не подумал изначально):)
		$('#settings_check').on('change', function(event) {
			event.preventDefault();
			if (this.checked){
				$('#registrtion_peop').removeAttr('disabled');
			} else {
				$('#registrtion_peop').attr('disabled', '');
			};
		});

		$('#registrtion_peop').on('change', function(event) {
			event.preventDefault();
			if (this.checked){
				$('#finish_sale').removeAttr('disabled');
			} else {
				$('#finish_sale').attr('disabled', '');
			};
		});

		$('#finish_sale').on('change', function(event) {
			event.preventDefault();
			if (this.checked){
				$('.last_el select').removeAttr('disabled');
			} else {
				$('.last_el small, select').attr('disabled', '');
			};
		});

		// И когда все готово...
	$('form').on('submit', function(event) {
		event.preventDefault();

		// ПРоверка На длину названия
			if ($('#name').val().length < 5){
		 	alert("Название минимум 5 символов!");
		  } else {
		  	if (($('.bonus_plus').css('display') == 'block' ) && $('.bonus_plus').val().length < 20){
		  		alert('Сообщение слишком короткое!');
		  	};
		  };

		  var price = parseInt($('.price').val());
		 	if ((!(isFinite(price))) && (!(price % 1 == 0))){
		 	alert("Введите целое число");
		 } else {
		 	alert("Все проверки успешно выполнены!");
		 };

		 // Проверка даты
		 $(function(){
		 	var y = $('#date_start').val().split(' ')[0];

		 	var dateOneNow = new Date(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()).getTime(); 
		 	var dateOneStart = new Date(y).getTime();

		 	var one = Math.floor(dateOneNow / 1000);
		 	var two = Math.floor(dateOneStart / 1000);

		 	if (two > one){
		 		alert("Промоакция не может начаться раньше сегоднешнего числа!");
		 	};
		 });
	});
});
