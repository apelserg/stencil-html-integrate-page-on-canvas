"use strict";

//===
// Команда
//===
APELSERG.MODEL.Command = function (cmdCode, cmdName, cmdX, cmdY, lengthX, lengthY, cmdColor) {
    this.Code = cmdCode;
    this.Name = cmdName;
    this.X = cmdX;
    this.Y = cmdY;
    this.LengthX = lengthX;
    this.LengthY = lengthY;
    this.Color = cmdColor;
    this.SelectColor = 'red';
    this.SelectCnt = 0;
    this.SelectName = false;
    this.ShowBorder = true;
    this.FontHeight = 20;
}

//===
// Массив команд
//===
APELSERG.MODEL.MakeCommands = function () {

    var сommands = [];

    var color = "white";

    var baseY = APELSERG.CONFIG.SET.BaseCommandY;
    var lengthY = 30;
    var spaceY = 10;

    var baseX = APELSERG.CONFIG.SET.BaseCommandX;
    var lengthX = 80;
    var spaceX = 10;

    сommands.push(new APELSERG.MODEL.Command("MENU", "Меню", baseX, baseY, lengthX, lengthY, color));

    baseX += lengthX + spaceX;
    сommands.push(new APELSERG.MODEL.Command("STOP", "Стоп", baseX, baseY, lengthX, lengthY, color));

    baseX += lengthX + spaceX;
    сommands.push(new APELSERG.MODEL.Command("PAUSE", "Пауза", baseX, baseY, lengthX, lengthY, color));

    baseX += lengthX + spaceX;
    lengthX = 30;
    сommands.push(new APELSERG.MODEL.Command("FLAKES--", "-", baseX, baseY, lengthX, lengthY, color));

    baseX += lengthX + spaceX + 90;
    сommands.push(new APELSERG.MODEL.Command("FLAKES++", "+", baseX, baseY, lengthX, lengthY, color));

    baseX += lengthX + spaceX;
    lengthX = 200;
    сommands.push(new APELSERG.MODEL.Command("SET_TEXT_MODE", "Текстовый режим", baseX, baseY, lengthX, lengthY, color));

    lengthX = 340;
    baseX = APELSERG.CONFIG.SET.BaseCommandX + 80 + spaceX;
    baseY += lengthY + spaceY;
    сommands.push(new APELSERG.MODEL.Command("THEME_SELECT", "Показать/скрыть выбор темы", baseX, baseY, lengthX, lengthY, color));

    baseY += lengthY + spaceY;
    сommands.push(new APELSERG.MODEL.Command("TEXT_SPEED", "Показать/скрыть скорость контента", baseX, baseY, lengthX, lengthY, color));


    return сommands;
}

//===
// Ссылка
//===
APELSERG.MODEL.Link = function (linkUrl, linkName, linkX, linkY, lengthX, lengthY, linkColor) {
    this.Url = linkUrl;
    this.Name = linkName;
    this.X = linkX;
    this.Y = linkY;
    this.LengthX = lengthX;
    this.LengthY = lengthY;
    this.Color = linkColor;
    this.SelectColor = 'lightblue';
    this.SelectCnt = 0;
    this.SelectName = false;
    this.ShowBorder = false;
    this.FontHeight = 20;
}

//===
// Массив ссылок
//===
APELSERG.MODEL.MakeLinks = function () {

    var baseX = APELSERG.CONFIG.SET.BaseLinkX;
    var baseY = APELSERG.CONFIG.SET.BaseLinkY + 100;

    var links = [];

    var linksList = [
        { name: "Canvas справочник", url: "http://www.w3schools.com/tags/ref_canvas.asp" },
        { name: "Canvas обучение", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial"},
        { name: "Canvas примеры", url: "http://www.html5canvastutorials.com/" },
        { name: "Статья часть 1", url: "http://www.ibm.com/developerworks/ru/library/wa-htmlmark/" },
        { name: "Статья часть 2", url: "http://www.ibm.com/developerworks/ru/library/wa-htmlmark2/" },
        { name: "Этот проект на GitHub", url: "https://github.com/apelserg/stencil-html-integrate-page-on-canvas" }
    ];

    for (var n = 0 in linksList) {

        var color = "white";
        var link = new APELSERG.MODEL.Link(linksList[n].url, linksList[n].name, baseX, baseY + 30 * n, linksList[n].name.length * 10 + 30, 30, color);

        links.push(link);
    }
    return links;
}

//===
// Лейбл
//===
APELSERG.MODEL.Lable = function (lableName, lableX, lableY, lengthX, lengthY, lableColor) {
    this.Name = lableName;
    this.X = lableX;
    this.Y = lableY;
    this.LengthX = lengthX;
    this.LengthY = lengthY;
    this.Color = lableColor;
    this.ShowBorder = false;
    this.FontHeight = 20;
}

//===
// Массив лейблов
//===
APELSERG.MODEL.MakeLables = function () {

    var color = "white";
    var lables = [];

    lables.push(new APELSERG.MODEL.Lable("Анимация", 310, 10, 90, 30, color));

    return lables;
}

//===
// Строка контент
//===
APELSERG.MODEL.ContentLine = function (text, textX, textY, textColor) {
    this.Text = text;
    this.X = textX;
    this.Y = textY;
    this.Color = textColor;
    this.FontHeight = 0;
}

//===
// Контент
//===
APELSERG.MODEL.MakeContent = function () {

    var color = "white";
    var pointX = 0;
    var pointY = 0;
    if (APELSERG.CONFIG.SET.CompatibleType == 0) pointY = APELSERG.CONFIG.PROC.CanvaID.height;
    var addY = 30;
    var Cnt = 0;

    var content = [];

    switch (APELSERG.CONFIG.SET.ThemeSelector) {
        case 1:
            switch (APELSERG.CONFIG.PROC.ContentSelector) {
                case 1: 
                    content.push(new APELSERG.MODEL.ContentLine("Вот звёздное небо! Что видно на нём?", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Звёзды там светят далёким огнём", pointX, pointY + addY * Cnt++, color));
                    break;
                case 2:
                    content.push(new APELSERG.MODEL.ContentLine("Под оранжевым небом заката", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Моря гладь отражает лучи...", pointX, pointY + addY * Cnt++, color));
                    break;
                case 0:
                default:
                    content.push(new APELSERG.MODEL.ContentLine("Открылась бездна звезд полна", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Звездам числа нет, бездне дна", pointX, pointY + addY * Cnt++, color));
            }
            break;
        case 2:
            switch (APELSERG.CONFIG.PROC.ContentSelector) {
                case 1:
                    content.push(new APELSERG.MODEL.ContentLine("«Ад и рай – в небесах», - утверждают ханжи.", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Я в себя заглянув, убедился во лжи:", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Ад и рай - не круги во дворце мирозданья,", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Ад и рай – это две половинки души", pointX, pointY + addY * Cnt++, color));
                    break;
                case 2:
                    content.push(new APELSERG.MODEL.ContentLine("Бог даёт, Бог берёт - вот и весь тебе сказ,", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Что к чему - остаётся загадкой для нас.", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Сколько жить, сколько пить - отмеряют на глаз,", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Да и то норовят недолить каждый раз", pointX, pointY + addY * Cnt++, color));
                    break;
                case 0:
                default:
                    content.push(new APELSERG.MODEL.ContentLine("Океан состоящий из капель, велик", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Из пылинок слагается материк", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Твой приход и уход - не имеют значенья", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Просто муха в окно залетела на миг", pointX, pointY + addY * Cnt++, color));
            }
            break;
        case 0:
        default:
            switch (APELSERG.CONFIG.PROC.ContentSelector) {
                case 1:
                    content.push(new APELSERG.MODEL.ContentLine("Зима!.. Крестьянин, торжествуя", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("На дровнях обновляет путь", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Его лошадка, снег почуя", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Плетется рысью как-нибудь", pointX, pointY + addY * Cnt++, color));
                    break;
                case 2:
                    content.push(new APELSERG.MODEL.ContentLine("Сквозь волнистые туманы", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Пробирается луна", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("На печальные поляны", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Льет печально свет она", pointX, pointY + addY * Cnt++, color));
                    Cnt++;
                    content.push(new APELSERG.MODEL.ContentLine("По дороге зимней, скучной", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Тройка борзая бежит", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Колокольчик однозвучный", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Утомительно гремит", pointX, pointY + addY * Cnt++, color));
                    break;
                case 0:
                default:
                    content.push(new APELSERG.MODEL.ContentLine("В лесу родилась ёлочка", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("В лесу она росла", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Зимой и летом стройная", pointX, pointY + addY * Cnt++, color));
                    content.push(new APELSERG.MODEL.ContentLine("Зелёная была", pointX, pointY + addY * Cnt++, color));
            }
    }
    return content;
}

//===
// Снежинка
//===
APELSERG.MODEL.Flake = function (flakeX, flakeY, flakeSize, flakeColor) {
    this.BaseX = flakeX;    
    this.X = flakeX;
    this.Y = flakeY;
    this.Size = flakeSize;
    this.Color = flakeColor;
}

//===
// Массив снежинок
//===
APELSERG.MODEL.MakeFlakes = function (flakeNum) {

    var flakes = [];
    var color = "white";

    var x = 0;
    var y = 0;
    var s = 0;

    for(var n = 0; n < flakeNum; n++) {

        if (APELSERG.CONFIG.SET.ThemeSelector == 0) {
            x = Math.round(Math.random() * APELSERG.CONFIG.SET.PicWidth);
            y = Math.round(Math.random() * APELSERG.CONFIG.SET.PicHeight);
            s = n % APELSERG.CONFIG.SET.FlakesSize;
        }
        else if (APELSERG.CONFIG.SET.ThemeSelector == 1) {
            x = Math.round(Math.random() * APELSERG.CONFIG.SET.PicWidth);
            y = Math.round(Math.random() * APELSERG.CONFIG.SET.PicHeight / 2);
            s = n % 3;
        }
        else {
            x = Math.round(Math.random() * APELSERG.CONFIG.SET.PicWidth);
            y = Math.round(Math.random() * APELSERG.CONFIG.SET.PicHeight / 3);
            s = n % 3;
        }

        var flake = new APELSERG.MODEL.Flake(x, y, s, color);

        flakes.push(flake);
    }
    return flakes;
}

//===
// Управление командами
//===
APELSERG.MODEL.CommandHandle = function (command) {

    if(APELSERG.MODEL.CheckClickFrame(command) && !APELSERG.CONFIG.PROC.Pause) {

        if (command.Code == "MENU") {

            APELSERG.CONFIG.PROC.ShowCommands = !APELSERG.CONFIG.PROC.ShowCommands;
            command.SelectCnt = APELSERG.CONFIG.SET.CntSelect; //-- красный бордюр (здесь чтобы не было "ложного" нажатия)
        }
    }

    if(APELSERG.MODEL.CheckClickFrame(command) && APELSERG.CONFIG.PROC.ShowCommands) {

        if (command.Code == "PAUSE") {

            APELSERG.CONFIG.PROC.Pause = !APELSERG.CONFIG.PROC.Pause;
            command.SelectCnt = APELSERG.CONFIG.SET.CntSelect;

            if (APELSERG.CONFIG.PROC.Pause) {

                command.Name = 'Пуск';

                //-- успеть погасить красный бордюр перед паузой - добавить единицу
                //-- оставить красный бордюр перед остановкой - не добавлять единицу
                //--
                APELSERG.CONFIG.PROC.CntPause = APELSERG.CONFIG.SET.CntSelect; // + 1;
            }

            if (!APELSERG.CONFIG.PROC.Pause) {

                command.Name = 'Пауза';
            }
        }
    }

    if (APELSERG.MODEL.CheckClickFrame(command) && APELSERG.CONFIG.PROC.ShowCommands && !APELSERG.CONFIG.PROC.Pause) {

        if (command.Code == "STOP") {

            command.SelectCnt = APELSERG.CONFIG.SET.CntSelect;
            APELSERG.CONFIG.PROC.CntStop = APELSERG.CONFIG.SET.CntSelect; //-- показать красный бордюр перед остановкой
            APELSERG.CONFIG.PROC.ShowCommands = false; //-- для защиты от ложных срабатываний
        }

        if (command.Code == "FLAKES++" || command.Code == "FLAKES--") {

            if (APELSERG.CONFIG.SET.ThemeSelector == 0) {

                if (command.Code == "FLAKES++" && APELSERG.CONFIG.SET.FlakesNum < 5000) {

                    APELSERG.CONFIG.SET.FlakesNum += 400;
                    APELSERG.MODEL.DATA.Flakes = APELSERG.MODEL.MakeFlakes(APELSERG.CONFIG.SET.FlakesNum); //-- новый снег (здесь чтобы не было "ложного" срабатывания)
                    command.SelectCnt = APELSERG.CONFIG.SET.CntSelect; //-- красный бордюр (здесь чтобы не было "ложного" нажатия)
                }
                if (command.Code == "FLAKES--" && APELSERG.CONFIG.SET.FlakesNum > 100) {

                    APELSERG.CONFIG.SET.FlakesNum -= 400;
                    APELSERG.MODEL.DATA.Flakes = APELSERG.MODEL.MakeFlakes(APELSERG.CONFIG.SET.FlakesNum); //-- новый снег (здесь чтобы не было "ложного" срабатывания)
                    command.SelectCnt = APELSERG.CONFIG.SET.CntSelect; //-- красный бордюр (здесь чтобы не было "ложного" нажатия)
                }

                if (APELSERG.CONFIG.SET.FlakesNum >= 3000) {
                    APELSERG.CONFIG.SET.FlakesSize = 7;
                    APELSERG.CONFIG.SET.FlakesMove = 6;
                }
                else if (APELSERG.CONFIG.SET.FlakesNum >= 2000 && APELSERG.CONFIG.SET.FlakesNum <= 3000) {
                    APELSERG.CONFIG.SET.FlakesSize = 7;
                    APELSERG.CONFIG.SET.FlakesMove = 4;
                }
                else if (APELSERG.CONFIG.SET.FlakesNum >= 1000 && APELSERG.CONFIG.SET.FlakesNum <= 2000) {
                    APELSERG.CONFIG.SET.FlakesSize = 5;
                    APELSERG.CONFIG.SET.FlakesMove = 2;
                }
                else {
                    APELSERG.CONFIG.SET.FlakesSize = 5;
                    APELSERG.CONFIG.SET.FlakesMove = 0;
                }
            }
            else {
                if (command.Code == "FLAKES++" && APELSERG.CONFIG.SET.FlakesNum < 500) {

                    APELSERG.CONFIG.SET.FlakesNum += 100;
                    APELSERG.MODEL.DATA.Flakes = APELSERG.MODEL.MakeFlakes(APELSERG.CONFIG.SET.FlakesNum); //-- новые звёзды
                    command.SelectCnt = APELSERG.CONFIG.SET.CntSelect; //-- красный бордюр (здесь чтобы не было "ложного" нажатия)
                }
                if (command.Code == "FLAKES--" && APELSERG.CONFIG.SET.FlakesNum > 100) {

                    APELSERG.CONFIG.SET.FlakesNum -= 100;
                    APELSERG.MODEL.DATA.Flakes = APELSERG.MODEL.MakeFlakes(APELSERG.CONFIG.SET.FlakesNum); //-- новые звёзды
                    command.SelectCnt = APELSERG.CONFIG.SET.CntSelect; //-- красный бордюр (здесь чтобы не было "ложного" нажатия)
                }

                if (APELSERG.CONFIG.SET.FlakesNum >= 400) {
                    APELSERG.CONFIG.SET.FlakesSize = 7;
                }
                else {
                    APELSERG.CONFIG.SET.FlakesSize = 5;
                }

            }
        }
        if (command.Code == "TEXT_SPEED") {
            
            command.SelectCnt = APELSERG.CONFIG.SET.CntSelect; //-- показать красный бордюр 

            APELSERG.MAIN.ShowSettingsTextSpeed();
        }
        if (command.Code == "THEME_SELECT") {

            command.SelectCnt = APELSERG.CONFIG.SET.CntSelect; //-- показать красный бордюр 

            APELSERG.MAIN.ShowSettingsThemeSelect();
        }
        if (command.Code == "SET_TEXT_MODE") {

            command.SelectCnt = APELSERG.CONFIG.SET.CntSelect; //-- показать красный бордюр 

            APELSERG.MAIN.SetTextMode();
        }

    }
}

//===
// Проверка клика на кнопке
//===
APELSERG.MODEL.CheckClickFrame = function (frame) {

    if ((APELSERG.CONFIG.PROC.MouseClickX > frame.X)
        && (APELSERG.CONFIG.PROC.MouseClickX < frame.X + frame.LengthX)
        && (APELSERG.CONFIG.PROC.MouseClickY > frame.Y)
        && (APELSERG.CONFIG.PROC.MouseClickY < frame.Y + frame.LengthY)){

        return true;
    }
    return false;
}

//===
// Проверка мыши над кнопкой
//===
APELSERG.MODEL.CheckMoveFrame = function (frame) {

    if ((APELSERG.CONFIG.PROC.MouseMoveX > frame.X)
        && (APELSERG.CONFIG.PROC.MouseMoveX < frame.X + frame.LengthX)
        && (APELSERG.CONFIG.PROC.MouseMoveY > frame.Y)
        && (APELSERG.CONFIG.PROC.MouseMoveY < frame.Y + frame.LengthY)) {

        return true;
    }
    return false;
}

//===
// Нажатие кнопок
//===
APELSERG.MODEL.UpdateButtons = function () {

    for (var n = 0 in APELSERG.MODEL.DATA.Commands) {

        var command = APELSERG.MODEL.DATA.Commands[n];

        command.SelectName = APELSERG.MODEL.CheckMoveFrame(command);
        if (command.SelectCnt > 0) command.SelectCnt--;

        APELSERG.MODEL.CommandHandle(command);
    }

    for (var n = 0 in APELSERG.MODEL.DATA.Links) {

        var link = APELSERG.MODEL.DATA.Links[n];

        link.SelectName = APELSERG.MODEL.CheckMoveFrame(link);
        if (link.SelectCnt > 0) link.SelectCnt--;

        if (APELSERG.MODEL.CheckClickFrame(link) && APELSERG.CONFIG.PROC.ShowCommands && !APELSERG.CONFIG.PROC.Pause) {

            link.SelectCnt = APELSERG.CONFIG.SET.CntSelect;

            //document.location.href = link.Url;
            window.open(link.Url, "_blank");
        }
    }

    APELSERG.CONFIG.PROC.MouseClickX = -999;
    APELSERG.CONFIG.PROC.MouseClickY = -999;

    //APELSERG.CONFIG.PROC.MouseMoveX = -999;
    //APELSERG.CONFIG.PROC.MouseMoveY = -999;

}
//===
// Переместить снежинки
//===
APELSERG.MODEL.UpdateFlakes = function () {

    for (var n = 0 in APELSERG.MODEL.DATA.Flakes) {

        var flake = APELSERG.MODEL.DATA.Flakes[n];

        var dir = 1;
        if (Math.round(Math.random() * 100) % 2 == 0) dir = -1;
        var shift = Math.round(Math.random() * 100) % 3;
        var move = Math.round(Math.random() * 100) % 2 + APELSERG.CONFIG.SET.FlakesMove;

        if (APELSERG.CONFIG.SET.ThemeSelector == 0) { //-- снежинка

            if (((flake.X + shift * dir) < (flake.BaseX + 10)) && ((flake.X + shift * dir) > (flake.BaseX - 10))) {
                flake.X += shift * dir;
            }

            flake.Size += dir;
            if (flake.Size > APELSERG.CONFIG.SET.FlakesSize) flake.Size = APELSERG.CONFIG.SET.FlakesSize;
            if (flake.Size < 0) flake.Size = 0;

            flake.Y += move; // * dir + 1;
            if (flake.Y > APELSERG.CONFIG.SET.PicHeight) flake.Y = 1;
        }
        else { //-- звезда
            flake.Size += dir;
            if (flake.Size > 5) flake.Size = 5;
            if (flake.Size < 1) flake.Size = 1;
        }
    }
}

//===
// Контент селектор
//===
APELSERG.MODEL.ChangeContentSelector = function () {

    APELSERG.CONFIG.PROC.ContentSelector++;
    if (APELSERG.CONFIG.PROC.ContentSelector >= APELSERG.CONFIG.SET.Theme[APELSERG.CONFIG.SET.ThemeSelector].contentNum) {

        APELSERG.CONFIG.PROC.ContentSelector = 0;

        APELSERG.CONFIG.SET.ThemeSelector++;
        if (APELSERG.CONFIG.SET.ThemeSelector >= APELSERG.CONFIG.SET.Theme.length) {
            APELSERG.CONFIG.SET.ThemeSelector = 0;
        }

        APELSERG.CONFIG.PROC.Stop = true;
        APELSERG.CONFIG.PROC.Pause = true;

        APELSERG.MAIN.OnLoad();
    }
}

//===
//  Переместить контент
//===
APELSERG.MODEL.UpdateContent = function () {

    if (APELSERG.MODEL.DATA.Content[APELSERG.MODEL.DATA.Content.length - 1].Y < 100 && APELSERG.MODEL.DATA.Content[APELSERG.MODEL.DATA.Content.length - 1].FontHeight < 1) {

        APELSERG.MODEL.ChangeContentSelector();
        APELSERG.MODEL.DATA.Content = APELSERG.MODEL.MakeContent();
    }

    for (var n = 0; APELSERG.MODEL.DATA.Content.length > n; n++) {

        var contentLine = APELSERG.MODEL.DATA.Content[n];

        contentLine.Y -= APELSERG.CONFIG.SET.ContentMove;

        if (contentLine.Y > 150 && APELSERG.CONFIG.PROC.CanvaID.height - 50 > contentLine.Y) {
            if (contentLine.FontHeight < APELSERG.CONFIG.SET.ContentFontSize) contentLine.FontHeight++;
        }
        else {
            if (contentLine.FontHeight > 0) contentLine.FontHeight--;
        }
    }
}

//===
//  Контент как HTML (для несовместимого режима)
//===
APELSERG.MODEL.ContentAsHtmlText = function () {

    var themeSelector = APELSERG.CONFIG.SET.ThemeSelector;
    var contentSelector = APELSERG.CONFIG.PROC.ContentSelector;

    var htmlText = "<input type='button' value='Анимационный режим' onclick='APELSERG.MAIN.SetCanvasMode();' /> <br/><br/>";

    htmlText += "Полезные ссылки <br/><br/>";

    APELSERG.MODEL.DATA.Links = APELSERG.MODEL.MakeLinks();

    for (var n = 0 in APELSERG.MODEL.DATA.Links) {

        var link = APELSERG.MODEL.DATA.Links[n];

        htmlText += "<a href='" + link.Url + "'>" + link.Name + "</a><br/>";
    }

    htmlText += "<br/>"

    for (APELSERG.CONFIG.SET.ThemeSelector = 0; APELSERG.CONFIG.SET.Theme.length > APELSERG.CONFIG.SET.ThemeSelector; APELSERG.CONFIG.SET.ThemeSelector++) {

        var theme = APELSERG.CONFIG.SET.Theme[APELSERG.CONFIG.SET.ThemeSelector];

        htmlText += theme.name + "<br/><br/>";

        for (APELSERG.CONFIG.PROC.ContentSelector = 0; theme.contentNum > APELSERG.CONFIG.PROC.ContentSelector; APELSERG.CONFIG.PROC.ContentSelector++) {

            APELSERG.MODEL.DATA.Content = APELSERG.MODEL.MakeContent();

            for (var n = 0 in APELSERG.MODEL.DATA.Content) {

                htmlText += APELSERG.MODEL.DATA.Content[n].Text + "<br/>";

            }
            htmlText += "<br/>***<br/><br/>";
        }
    }

    APELSERG.CONFIG.SET.ThemeSelector = themeSelector;
    APELSERG.CONFIG.PROC.ContentSelector = contentSelector;

    return htmlText;

}
