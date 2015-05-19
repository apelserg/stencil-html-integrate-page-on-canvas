"use strict";

//===
// Отрисовка
//===
APELSERG.CANVA.Rewrite = function () {

    var ctx = APELSERG.CONFIG.PROC.Ctx;

    ctx.drawImage(APELSERG.CONFIG.PROC.Img, 0, 0);

    for (var n = 0 in APELSERG.MODEL.DATA.Commands) {
        APELSERG.CANVA.CommandRewrite(ctx, APELSERG.MODEL.DATA.Commands[n]);
    }

    for (var n = 0 in APELSERG.MODEL.DATA.Links) {
        APELSERG.CANVA.LinkRewrite(ctx, APELSERG.MODEL.DATA.Links[n]);
    }

    for (var n = 0 in APELSERG.MODEL.DATA.Lables) {
        APELSERG.CANVA.LableRewrite(ctx, APELSERG.MODEL.DATA.Lables[n]);
    }

    for (var n = 0 in APELSERG.MODEL.DATA.Content) {
        APELSERG.CANVA.ContentRewrite(ctx, APELSERG.MODEL.DATA.Content[n]);
    }

    for (var n = 0 in APELSERG.MODEL.DATA.Flakes) {
        APELSERG.CANVA.FlakeRewrite(ctx, APELSERG.MODEL.DATA.Flakes[n]);
    }
}

//===
// Команда
//===
APELSERG.CANVA.CommandRewrite = function (ctx, command) {

    if (APELSERG.CONFIG.PROC.ShowCommands || command.Code == 'MENU') {

        if (command.ShowBorder) {
            if (command.SelectCnt == 0) ctx.strokeStyle = command.Color;
            else ctx.strokeStyle = command.SelectColor;
            ctx.strokeRect(command.X, command.Y, command.LengthX, command.LengthY);
        }

        ctx.font = command.FontHeight.toString() + "px Arial";
        ctx.textAlign = "left";

        if (command.SelectName && !APELSERG.CONFIG.PROC.Pause) ctx.fillStyle = command.SelectColor;
        else ctx.fillStyle = command.Color;

        ctx.fillText(command.Name, command.X + 5, command.Y + command.FontHeight);
    }
}

//===
// Ссылка
//===
APELSERG.CANVA.LinkRewrite = function (ctx, link) {

    if (APELSERG.CONFIG.PROC.ShowCommands) {
        if (link.ShowBorder) {
            if (link.SelectCnt == 0) ctx.strokeStyle = link.Color;
            else ctx.strokeStyle = link.SelectColor;
            ctx.strokeRect(link.X, link.Y, link.LengthX, link.LengthY);
        }

        ctx.font = link.FontHeight.toString() + "px Arial";
        ctx.textAlign = "left";

        if (link.SelectName && !APELSERG.CONFIG.PROC.Pause) ctx.fillStyle = link.SelectColor;
        else ctx.fillStyle = link.Color;

        ctx.fillText(link.Name, link.X + 5, link.Y + link.FontHeight);
    }
}

//===
// Лейбл
//===
APELSERG.CANVA.LableRewrite = function (ctx, lable) {
    if (APELSERG.CONFIG.PROC.ShowCommands) {
        if (lable.ShowBorder) {
            ctx.strokeStyle = lable.Color;
            ctx.strokeRect(lable.X, lable.Y, lable.LengthX, lable.LengthY);
        }

        ctx.font = lable.FontHeight.toString() + "px Arial";
        ctx.textAlign = "left";
        ctx.fillStyle = lable.Color;
        ctx.fillText(lable.Name, lable.X + 5, lable.Y + lable.FontHeight);
    }
}

//===
// Контент
//===
APELSERG.CANVA.ContentRewrite = function (ctx, content) {

    //-- по X координате
    //--
    //ctx.font = content.FontHeight.toString() + "px Arial";
    //ctx.fillStyle = content.Color;
    //ctx.fillText(content.Text, content.X, content.Y + content.FontHeight);

    //-- по центру окна
    //--
    if (content.X >= 0 && content.Y >= 0 && content.FontHeight > 0) {
        ctx.font = content.FontHeight.toString() + "px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = content.Color;
        ctx.fillText(content.Text, APELSERG.CONFIG.PROC.CanvaID.width / 2, content.Y);
    }
}

//===
// Снежинка
//===
APELSERG.CANVA.FlakeRewrite = function (ctx, flake) {

    ctx.beginPath();
    ctx.arc(flake.X, flake.Y, flake.Size / 2, 0, 2 * Math.PI); //, false);
    ctx.fillStyle = flake.Color;
    ctx.fill();
}

