(function(){
        var canvasHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 100;
        var canvas = document.querySelector("canvas");
        canvas.setAttribute("height", canvasHeight);
        canvas.setAttribute("width", canvasHeight);
        var cellSize = canvasHeight / 5;
        var cellSizeHalf = cellSize / 2;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var canDraw = true;
        var colorR = 150;
        var colorG = 255;
        var color = "rgb(" + colorR + ", " + colorG + ", 0)";

        var CenterX = cellSizeHalf;
        var CenterY = cellSizeHalf;
        var starSize = cellSizeHalf;

        var starPosX = 0;
        var starPosY = 0;

        var goal = document.querySelector("#js-message");

        document.onkeydown = checkKey;

        //draw lines inside canvas
        function DrawBoard()
        {
            var H2LineY = cellSize * 2;
            var H3LineY = cellSize * 3;
            var H4LineY = cellSize * 4;
            ctx.beginPath();
            //V1Line
            ctx.moveTo(cellSize*1, 0);
            ctx.lineTo(cellSize*1, cellSize*2);
            //V2Line
            ctx.moveTo(cellSize*2, cellSize*1);
            ctx.lineTo(cellSize*2, cellSize*2);
            //V3Line
            ctx.moveTo(cellSize*3, cellSize);
            ctx.lineTo(cellSize*3, cellSize*3);
            //V4Line
            ctx.moveTo(cellSize*4, 0);
            ctx.lineTo(cellSize*4, cellSize*2);
            //H1Line
            ctx.moveTo(cellSize, cellSize*2);
            ctx.lineTo(cellSize*2, cellSize*2);
            //H2Line
            ctx.moveTo(0, cellSize*3);
            ctx.lineTo(cellSize*3, cellSize*3);
            //H3Line
            ctx.moveTo(cellSize*4, cellSize*3);
            ctx.lineTo(cellSize*5, cellSize*3);
            //H4Line
            ctx.moveTo(cellSize*1, cellSize*4);
            ctx.lineTo(cellSize*5, cellSize*4);
            ctx.stroke();

        }

        function drawStar(ctx, x, y, r, p, m, color){
            ctx.save();
            ctx.beginPath();
            ctx.translate(x, y);
            ctx.moveTo(0,0-r);
            for (var i = 0; i < p; i++)
            {
                ctx.rotate(Math.PI / p);
                ctx.lineTo(0, 0 - (r*m));
                ctx.rotate(Math.PI / p);
                ctx.lineTo(0, 0 - r);
            }
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        }

        //Directions which star can move in each position
        var starDirection = [
            //V1
            [
                {up: false, down: true, right: false, left: false},
                {up: true, down: true, right: false, left: false},
                {up: true, down: false, right: true, left: false},
                {up: false, down: true, right: true, left: false},
                {up: true, down: false, right: true, left: false}
            ],
            //V2
            [
                {up: false, down: true, right: true, left: false},
                {up: true, down: false, right: false, left: false},
                {up: false, down: false, right: true, left: true},
                {up: false, down: false, right: true, left: true},
                {up: false, down: false, right: true, left: true}
            ],
            //V3
            [
                {up: false, down: true, right: true, left: true},
                {up: true, down: true, right: false, left: false},
                {up: true, down: false, right: false, left: true},
                {up: false, down: false, right: true, left: true},
                {up: false, down: false, right: true, left: true}
            ],
            //V4
            [
                {up: false, down: true, right: false, left: true},
                {up: true, down: true, right: false, left: false},
                {up: true, down: true, right: true, left: false},
                {up: true, down: false, right: true, left: true},
                {up: false, down: false, right: true, left: true}
            ],
            //V5
            [
                {up: true, down: true, right: false, left: false},
                {up: true, down: true, right: false, left: false},
                {up: true, down: false, right: false, left: true},
                {up: false, down: false, right: false, left: true},
                {up: false, down: false, right: false, left: true}
            ],
        ]

        //move star with arrow key down
        function checkKey(e) {
            e = e || window.event;

            switch (e.keyCode) {
                //arrow up
                case 38:
                    if(starDirection[starPosX][starPosY].up){                        eraseStar();
                        CenterY -= starSize*2;
                        // colorR += 3;
                        colorR < 255 ? colorR += 40 : colorR = 255;
                        color = "rgb(" + colorR + ", " + colorG + ", 0)";
                        drawStar(ctx, CenterX, CenterY, starSize, 5, 0.5, color);
                        console.log(color);
                        starPosY -= 1;
                    }
                    break;
                //arrow down
                case 40:
                    if(starDirection[starPosX][starPosY].down){
                        eraseStar();
                        CenterY +=starSize*2;
                        // colorR -= 3;
                        colorR > 0 ? colorR -= 40 : colorR = 0;
                        color = "rgb(" + colorR + ", " + colorG + ", 0)";
                        drawStar(ctx, CenterX, CenterY, starSize, 5, 0.5, color);
                        console.log(color);
                        starPosY += 1;
                    }
                    break;
                //arrow left
                case 37:
                    if(starDirection[starPosX][starPosY].left){
                        eraseStar();
                        CenterX -=starSize*2;
                        // colorG += 3;
                        colorG > 0 ? colorG -= 40 : colorG = 0;
                        color = "rgb(" + colorR + ", " + colorG + ", 0)";
                        drawStar(ctx, CenterX, CenterY, starSize, 5, 0.5, color);
                        console.log(color);
                        starPosX -= 1;
                    }
                    break;
                //arrow right
                case 39:
                    if(starDirection[starPosX][starPosY].right){
                        eraseStar();
                        CenterX +=starSize*2;
                        // colorG -= 3;
                        colorG < 255 ? colorG += 40 : colorG = 255;
                        color = "rgb(" + colorR + ", " + colorG + ", 0)";
                        drawStar(ctx, CenterX, CenterY, starSize, 5, 0.5, color);
                        console.log(color);
                        starPosX += 1;
                    }
                    if(isGoal()){
                        goal.classList.add("js-show");
                    }
                    break;
            }//switch
        }

        function eraseStar(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            DrawBoard();
        }

        function isGoal(){
            if(starPosX == 4 && starPosY == 4){
                return true;
            }
        }

        var restartBtn = document.querySelector(".js-restart");
        restartBtn.addEventListener("click", function(){
            eraseStar();
            CenterX = cellSizeHalf;
            CenterY = cellSizeHalf;
            starSize = cellSizeHalf;
            starPosX = 0;
            starPosY = 0;
            drawStar(ctx, CenterX, CenterY, starSize, 5, 0.5, color);
            goal.classList.remove("js-show");
        });

        DrawBoard();
        drawStar(ctx, CenterX, CenterY, starSize, 5, 0.5, color);

}());