// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//-- Глобальные переменные
//--

var APELSERG = {};

APELSERG.MAIN = {};
APELSERG.MODEL = {};
APELSERG.MODEL.DATA = {};
APELSERG.CANVA = {};
APELSERG.CONFIG = {};
APELSERG.CONFIG.KEY = {};
APELSERG.CONFIG.SET = {};
APELSERG.CONFIG.PROC = {};

APELSERG.CONFIG.KEY.Space = 32;
APELSERG.CONFIG.KEY.F1 = 112;
APELSERG.CONFIG.KEY.F2 = 113;

APELSERG.CONFIG.SET.CompatibleType = 0; //-- 0 - поддерживает Canvas

APELSERG.CONFIG.SET.Theme = [
    { contentNum: 3, name: "Снегопад", picture: "winter.jpg" },
    { contentNum: 3, name: "Звёздопад", picture: "stars.jpg" },
    { contentNum: 3, name: "Хаям", picture: "hayam.jpg" }
];

APELSERG.CONFIG.SET.ThemeSelector = 0; //-- выбор темы (должно быть 0)

APELSERG.CONFIG.SET.PicSrc = "winter.jpg"; //-- заставка канвы
APELSERG.CONFIG.SET.PicWidth = 0; //-- ширина заставки (устанавливается при старте)
APELSERG.CONFIG.SET.PicHeight = 0; //-- высота заставки (устанавливается при старте)
APELSERG.CONFIG.SET.PicBorder = 5; //-- ширина рамки

APELSERG.CONFIG.SET.BaseCommandX = 10; //-- базовая координата X строки команд
APELSERG.CONFIG.SET.BaseCommandY = 10; //-- базовая координата Y строки команд

APELSERG.CONFIG.SET.BaseLinkX = 10; //-- базовая координата X строки ссылок
APELSERG.CONFIG.SET.BaseLinkY = 50; //-- базовая координата Y строки ссылок

APELSERG.CONFIG.SET.CntHandle = 3; //-- сколько циклов пропустить при перерисовке канвы (статика, динамика в APELSERG.CONFIG.PROC.CntHandle )
APELSERG.CONFIG.SET.CntSelect = 3; //-- сколько циклов показывать красный цвет (статика, динамика в объекте)

APELSERG.CONFIG.SET.FlakesNum = 500; //-- число снежинок
APELSERG.CONFIG.SET.FlakesSize = 5; //-- максимальный размер снежинки
APELSERG.CONFIG.SET.FlakesMove = 0; //-- максимальная скорость снежинки

APELSERG.CONFIG.SET.ContentMove = 3; //-- скорость движения контента
APELSERG.CONFIG.SET.ContentFontSize = 25; //-- максимальный размер контента

APELSERG.CONFIG.PROC.CanvaID;
APELSERG.CONFIG.PROC.Ctx;
APELSERG.CONFIG.PROC.Img;

APELSERG.CONFIG.PROC.TimeoutID = 0;

APELSERG.CONFIG.PROC.CntHandle = 0;  //-- сколько циклов пропустить при перерисовке канвы (динамика)
APELSERG.CONFIG.PROC.ContentSelector = 0; //-- счётчик выбора контента (должно быть 0)

APELSERG.CONFIG.PROC.MouseClickX = -999;
APELSERG.CONFIG.PROC.MouseClickY = -999;

APELSERG.CONFIG.PROC.MouseMoveX = -999;
APELSERG.CONFIG.PROC.MouseMoveY = -999;

APELSERG.CONFIG.PROC.Stop = true; //-- только для того чтобы возобновить анимацию по двойному клику
APELSERG.CONFIG.PROC.CntStop = 0; //-- только для того чтобы маргнула рамка перед стопом

APELSERG.CONFIG.PROC.Pause = true;
APELSERG.CONFIG.PROC.CntPause = 0; //-- только для того чтобы маргнула рамка перед паузой

APELSERG.CONFIG.PROC.ShowCommands = false;

APELSERG.MODEL.DATA.Flakes = [];
APELSERG.MODEL.DATA.Commands = [];
APELSERG.MODEL.DATA.Links = [];
APELSERG.MODEL.DATA.Lables = [];
APELSERG.MODEL.DATA.Content = [];

//===
// старт
//===
APELSERG.MAIN.OnLoad = function () {
    APELSERG.MAIN.CheckCompatible();
    APELSERG.MAIN.ShowPage();
}

//===
// загрузить страницу
//===
APELSERG.MAIN.ShowPage = function () {

    if (APELSERG.CONFIG.SET.CompatibleType == 0) {

        document.getElementById('APELSERG_DivCanvas').innerHTML = "<canvas id='APELSERG_Canvas'></canvas>";

        //-- канва
        //--
        APELSERG.CONFIG.PROC.CanvaID = document.getElementById('APELSERG_Canvas');
        APELSERG.CONFIG.PROC.CanvaID.style.border = APELSERG.CONFIG.SET.PicBorder + "px solid silver"; //-- установка стиля
        APELSERG.CONFIG.PROC.Ctx = APELSERG.CONFIG.PROC.CanvaID.getContext('2d');

        APELSERG.CONFIG.PROC.Img = new Image();
        APELSERG.CONFIG.PROC.Img.src = APELSERG.CONFIG.SET.Theme[APELSERG.CONFIG.SET.ThemeSelector].picture;
        APELSERG.CONFIG.SET.PicSrc = APELSERG.CONFIG.PROC.Img.src;

        APELSERG.CONFIG.PROC.Img.onload = function () {

            APELSERG.CONFIG.SET.PicWidth = APELSERG.CONFIG.PROC.Img.width;
            APELSERG.CONFIG.SET.PicHeight = APELSERG.CONFIG.PROC.Img.height;

            APELSERG.MAIN.CanvasSize();

            APELSERG.MODEL.DATA.Links = APELSERG.MODEL.MakeLinks();
            APELSERG.MODEL.DATA.Commands = APELSERG.MODEL.MakeCommands();
            APELSERG.MODEL.DATA.Lables = APELSERG.MODEL.MakeLables();
            APELSERG.MODEL.DATA.Content = APELSERG.MODEL.MakeContent();

            APELSERG.CONFIG.SET.FlakesMove = 0;
            APELSERG.CONFIG.SET.FlakesSize = 5;
            (APELSERG.CONFIG.SET.ThemeSelector == 0) ? (APELSERG.CONFIG.SET.FlakesNum = 500) : (APELSERG.CONFIG.SET.FlakesNum = 200);

            APELSERG.MODEL.DATA.Flakes = APELSERG.MODEL.MakeFlakes(APELSERG.CONFIG.SET.FlakesNum);

            APELSERG.CONFIG.PROC.Stop = false;
            APELSERG.CONFIG.PROC.Pause = false;

            APELSERG.MAIN.Animation(); //-- старт рабочего цикла

            //===
            // Клик мыши
            //===
            APELSERG.CONFIG.PROC.CanvaID.addEventListener('click', function (event) {

                APELSERG.CONFIG.PROC.MouseClickX = event.clientX - APELSERG.CONFIG.PROC.CanvaID.offsetLeft - APELSERG.CONFIG.SET.PicBorder;
                APELSERG.CONFIG.PROC.MouseClickY = event.clientY - APELSERG.CONFIG.PROC.CanvaID.offsetTop - APELSERG.CONFIG.SET.PicBorder;
            });

            //===
            // Движения мыши
            //===
            APELSERG.CONFIG.PROC.CanvaID.addEventListener('mousemove', function (event) {

                APELSERG.CONFIG.PROC.MouseMoveX = event.clientX - APELSERG.CONFIG.PROC.CanvaID.offsetLeft - APELSERG.CONFIG.SET.PicBorder;
                APELSERG.CONFIG.PROC.MouseMoveY = event.clientY - APELSERG.CONFIG.PROC.CanvaID.offsetTop - APELSERG.CONFIG.SET.PicBorder;
            });

            //===
            // Двойной клик мыши
            //===
            APELSERG.CONFIG.PROC.CanvaID.addEventListener('dblclick', function (event) {

                if (APELSERG.CONFIG.PROC.Stop) {
                    APELSERG.CONFIG.PROC.Stop = false;
                    APELSERG.CONFIG.PROC.ShowCommands = false; //-- для защиты от ложных срабатываний
                    APELSERG.MAIN.Animation();
                }
            });
        }
    }
    if (APELSERG.CONFIG.SET.CompatibleType == 1) {
        document.getElementById('APELSERG_DivCanvas').innerHTML = APELSERG.MODEL.ContentAsHtmlText();
    }
}

//===
// Проверка совместимости
//===
APELSERG.MAIN.CheckCompatible = function () {

    APELSERG.CONFIG.SET.CompatibleType = 0;
    if (!window.requestAnimationFrame || screen.width < 1000) APELSERG.CONFIG.SET.CompatibleType = 1;
}

//===
// Настройка канвы под размер экрана
//===
APELSERG.MAIN.CanvasSize = function () {

    var hybridDiv = document.getElementById('APELSERG_DivUiTextSpeed');

    if (APELSERG.CONFIG.SET.PicWidth < Math.round(window.innerWidth * 0.9) && APELSERG.CONFIG.PROC.CanvaID.width != APELSERG.CONFIG.SET.PicWidth) {

        APELSERG.CONFIG.PROC.CanvaID.width = APELSERG.CONFIG.SET.PicWidth;
        hybridDiv.style.left = Math.round(window.innerWidth * 0.9) / 2 + "px";
    }
    else if (APELSERG.CONFIG.SET.PicWidth > Math.round(window.innerWidth * 0.9) && APELSERG.CONFIG.PROC.CanvaID.width != Math.round(window.innerWidth * 0.9)) {

        APELSERG.CONFIG.PROC.CanvaID.width = Math.round(window.innerWidth * 0.9);
        hybridDiv.style.left = Math.round(window.innerWidth * 0.9) / 2 + "px";
    }

    if (APELSERG.CONFIG.SET.PicHeight < Math.round(window.innerHeight * 0.8) && APELSERG.CONFIG.PROC.CanvaID.height != APELSERG.CONFIG.SET.PicHeight) {

        APELSERG.CONFIG.PROC.CanvaID.height = APELSERG.CONFIG.SET.PicHeight;
        hybridDiv.style.top = Math.round(window.innerHeight * 0.8) / 2 + "px";
    }
    else if (APELSERG.CONFIG.SET.PicHeight > Math.round(window.innerHeight * 0.8) && APELSERG.CONFIG.PROC.CanvaID.height != Math.round(window.innerHeight * 0.8)) {
        APELSERG.CONFIG.PROC.CanvaID.height = Math.round(window.innerHeight * 0.8)
        hybridDiv.style.top = Math.round(window.innerHeight * 0.8) / 2 + "px";
    }
}

//===
// Показать настройки через HTML
//===
APELSERG.MAIN.ShowSettingsThemeSelect = function () {

    var htmlDiv = document.getElementById('APELSERG_DivUiThemeSelect');

    if (htmlDiv.innerHTML === undefined || htmlDiv.innerHTML == "") {

        htmlDiv.innerHTML = "Тема" +
            "<select id='APELSERG_UserComboBoxThemeSelect'>" +
                "<option value='0'>" + APELSERG.CONFIG.SET.Theme[0].name + "</option>" +
                "<option value='1'>" + APELSERG.CONFIG.SET.Theme[1].name + "</option>" +
                "<option value='2'>" + APELSERG.CONFIG.SET.Theme[2].name + "</option>" +
            "</select>" +
            "<input type='button' value='Применить' onclick='APELSERG.MAIN.ApplySettingsThemeSelect();' />";

        document.getElementById('APELSERG_UserComboBoxThemeSelect').value = APELSERG.CONFIG.SET.ThemeSelector;
    }
    else {
        htmlDiv.innerHTML = "";
    }
}

//===
// Применить изменение контента
//===
APELSERG.MAIN.ApplySettingsThemeSelect = function () {

    APELSERG.CONFIG.SET.ThemeSelector = parseInt(document.getElementById('APELSERG_UserComboBoxThemeSelect').value);
    APELSERG.CONFIG.PROC.ContentSelector = 0;

    document.getElementById('APELSERG_DivUiThemeSelect').innerHTML = "";

    APELSERG.CONFIG.PROC.Stop = true;
    APELSERG.MAIN.ShowPage();
}

//===
// Показать настройки скорости контента
//===
APELSERG.MAIN.ShowSettingsTextSpeed = function () {

    var hybridDiv = document.getElementById('APELSERG_DivUiTextSpeed');

    if (hybridDiv.style.zIndex != "1") {

        hybridDiv.innerHTML = "Текст" +
            "<select id='APELSERG_UserComboBoxTextSpeed'>" +
                "<option value='1'>Медленно</option>" +
                "<option value='3'>Нормально</option>" +
                "<option value='5'>Быстро</option>" +
                "<option value='7'>Очень быстро</option>" +
            "</select>" +
            "<input type='button' value='Применить' onclick='APELSERG.MAIN.ApplySettingsTextSpeed();' />";

        hybridDiv.style.zIndex = "1"
        document.getElementById('APELSERG_UserComboBoxTextSpeed').value = APELSERG.CONFIG.SET.ContentMove;
    }
    else {
        hybridDiv.innerHTML = "";
        hybridDiv.style.zIndex = "-1"
    }
}

//===
// Применить изменение скорости контента
//===
APELSERG.MAIN.ApplySettingsTextSpeed = function () {

    APELSERG.CONFIG.SET.ContentMove = parseInt(document.getElementById('APELSERG_UserComboBoxTextSpeed').value);

    var hybridDiv = document.getElementById('APELSERG_DivUiTextSpeed');
    hybridDiv.innerHTML = "";
    hybridDiv.style.zIndex = "-1"
}

//===
// Установка текстовой страницы
//===
APELSERG.MAIN.SetTextMode = function () {

    APELSERG.CONFIG.PROC.Stop = true;
    window.cancelAnimationFrame(APELSERG.CONFIG.PROC.TimeoutID);

    APELSERG.CONFIG.SET.CompatibleType = 1;
    APELSERG.MAIN.ShowPage();
}

//===
// Установка анимационной страницы
//===
APELSERG.MAIN.SetCanvasMode = function () {

    APELSERG.MAIN.OnLoad();
}

//===
// Клавиатура
//===
window.addEventListener('keydown', function (event) {

    //console.log('Нажата : ' + event.keyCode);

    if (event.keyCode == APELSERG.CONFIG.KEY.F1) {
        window.cancelAnimationFrame(APELSERG.CONFIG.PROC.TimeoutID);
    }

    if (event.keyCode == APELSERG.CONFIG.KEY.F2) {

        APELSERG.CONFIG.PROC.Stop = true;
        window.cancelAnimationFrame(APELSERG.CONFIG.PROC.TimeoutID);

        if(APELSERG.CONFIG.PROC.Stop) {
            APELSERG.CONFIG.PROC.Stop = false;
            APELSERG.CONFIG.PROC.ShowCommands = false; //-- для защиты от ложных срабатываний
            APELSERG.MAIN.Animation();
        }
    }
});


//===
// Рабочий цикл анимации
//===
APELSERG.MAIN.Animation = function () {

    (APELSERG.CONFIG.PROC.CntHandle > 0) ? (APELSERG.CONFIG.PROC.CntHandle--) : (APELSERG.CONFIG.PROC.CntHandle = APELSERG.CONFIG.SET.CntHandle);

    if (APELSERG.CONFIG.PROC.CntHandle == 1) APELSERG.MODEL.UpdateButtons();

    if (!APELSERG.CONFIG.PROC.Pause) {
        if (APELSERG.CONFIG.PROC.CntHandle == 0) APELSERG.CANVA.Rewrite();
        if (APELSERG.CONFIG.PROC.CntHandle == 1) APELSERG.MAIN.CanvasSize();
        if (APELSERG.CONFIG.PROC.CntHandle == 2) APELSERG.MODEL.UpdateFlakes();
        if (APELSERG.CONFIG.PROC.CntHandle == 3) APELSERG.MODEL.UpdateContent();
    }
    else {
        //-- только для того чтобы маргнула рамка кнопки перед паузой
        //--
        if (APELSERG.CONFIG.PROC.CntPause > 0 && APELSERG.CONFIG.PROC.CntHandle == 0) {
            APELSERG.CONFIG.PROC.CntPause--;
            APELSERG.CANVA.Rewrite();
        }
    }

    //-- только для того чтобы маргнула рамка кнопки перед остановом
    //--
    if (APELSERG.CONFIG.PROC.CntStop > 0 && APELSERG.CONFIG.PROC.CntHandle == 0) {
        APELSERG.CONFIG.PROC.CntStop--;
        if (APELSERG.CONFIG.PROC.CntStop == 0) {
            APELSERG.CONFIG.PROC.Stop = true;
        }
        APELSERG.CANVA.Rewrite();
    }

    if (!APELSERG.CONFIG.PROC.Stop) {
        APELSERG.CONFIG.PROC.TimeoutID = window.requestAnimationFrame(function () {
            APELSERG.MAIN.Animation();
        });
    }
}
