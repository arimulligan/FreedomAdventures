class clock {
    width = window.innerWidth;
    height = window.innerHeight;
    
    constructor(hours, minutes, seconds, millis, randomList){
        this.randomList = randomList;
        // colors
        var blackSky = color(24, 5, 120);
        var blueSky = color(95, 182, 217);

        background(255, 208, 118); // background of image

        // changing the background according to the time of day.
        this.setBackground(hours, blackSky, blueSky);

        this.drawCloudsOrStars(millis, seconds, hours);

        // moving moon and sun
        let hoursFraction = hours + (minutes / 60.0);
        if (hours <= 6){ // moving down MOON in the morning
            this.drawMoon(map(hoursFraction, 0, 5, -30, 200));
        } else if (hours > 17){ // moving up MOON in the evening
            this.drawMoon(map(hoursFraction, 18, 23, 500, 60));
        } else if (hours > 6 && hours < 13){ // moving up SUN in the morning
            this.drawSun(map(hoursFraction, 7, 11, 500, 60));
        } else {
            this.drawSun(map(hoursFraction, 13, 17, -30, 200)); // moving down SUN in the afternoon
        }
    }

    /**
     * sets the background to a gradient, changing as the time changes
     * @param { The current hour of the day } hours
     * @param { What color is night time } blackSky
     * @param { What color is day time } blueSky
     */
    setBackground(hours, blackSky, blueSky){
        let currentColor = color(0);

        if (hours > 6 && hours <= 9){
            currentColor = this.lerpSkyColor(blackSky, blueSky, 6.0, 9.0, hours)
        }
        else if (hours > 9 && hours <= 18){
            currentColor = blueSky;
        }
        else if (hours > 18 && hours <= 21){
            currentColor = this.lerpSkyColor(blueSky, blackSky, 18.0, 21.0, hours)
        }
        else{
            currentColor = blackSky;
        }

        // for the alarm when zooming out
        fill(currentColor);
        rect(-100, -200, this.width+220, 200+this.width, 50, 50, 0, 0);
        // brackground gradient because city causes it to always be a little light
        for(let y = 0; y < this.height; y++){
            var n = map(y, 0, this.height, 0, 1);
            let newc = lerpColor(currentColor, color(200), n);
            stroke(newc);
            line(0, y, this.width, y);
        }
    }

    /**
     * draws the clouds or the stars and their colors
     * @param { What is the current milliseconds } millis
     * @param { What are the current seconds } seconds
     * @param { What are the current hours } hours
     */
    drawCloudsOrStars(millis, seconds, hours){
        var starsPulsing = 0;
        var starsPulsing2 = 0;
        if (seconds % 2 == 0){ // every other millis, make transparency go other way
            starsPulsing = map(millis, 0, 999, 50, 200);
            starsPulsing2 = map(millis, 0, 999, 200, 50);
        }
        else{
            starsPulsing = map(millis, 0, 999, 200, 50);
            starsPulsing2 = map(millis, 0, 999, 50, 200);
        }

        var starsColor1 = color(230, 199, 23, starsPulsing);
        var starsColor2 = color(230, 199, 23, starsPulsing2);

        // drawing the stars or the clouds
        noStroke();
        for (let i =0; i < 100; i+=2){
            if (hours < 6 || hours > 18) { // night time
                fill(starsColor1);
                this.star(this.randomList[i], this.randomList[i+1], 5, 11.6, 3);
                fill(starsColor2);
                this.star(this.randomList[i], this.randomList[i+1], 11.6, 5, 3);
            } else {
                // reset to start
                let secondsResetsAfterFive = (seconds + this.randomList[i]) % 50;
                let secondsWithFraction = secondsResetsAfterFive + (millis / 1000.0);
                console.log(secondsWithFraction);
                let startX = map(secondsWithFraction, 0, 30, -70, this.width*2);

                this.drawCloud(startX, this.randomList[i+1]);
            }
        }
    }

    /**
     * star function from p5.js reference
     * @param { x-coordinate } x
     * @param { y-coordinate } y
     * @param { radius of first triangle } radius1
     * @param { radius of second triangle } radius2
     * @param { number of points in the star } npoints
     */
    star(x, y, radius1, radius2, npoints) {
        var angle = TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius2;
            var sy = y + sin(a) * radius2;
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    /**
     * Drawing a cloud which 6 'puffs' of cloud
     * @param { x-coordinate } x
     * @param { y-coordinate } y
     */
    drawCloud(x, y) {
        noStroke();
        fill(255, 255, 255, 50); // Set the color of the cloud to white

        var step = 100 / (6 - 1); // Calculate the horizontal spacing between circles
        var offset = 100 / 6; // Offset to center the cloud

        // Loop through and draw the circles that form the cloud
        for (var i = 0; i < 6; i++) {
            var cx = x - 100 / 2 + i * step;
            var cy = y + cos(i * PI / (6 - 1)) * 100 / 4;
            var diameter = 100 / 2 - abs(cy - y) + offset + (this.randomList[i]/15);

            ellipse(cx, cy, diameter);
        }
    }

    /**
     * to change gradient of background according to time.
     * from https://stackoverflow.com/questions/60196138/lerp-background-colour-based-on-time-of-day
     * @param { Color changing from } from
     * @param { COlor its changing to } to
     * @param { Hour it starts from } startTime
     * @param { Hour it ends to } endTime
     * @param { The current hour } hours
     * @returns a lerp color
     */
    lerpSkyColor(from, to, startTime, endTime, hours){
        const lerpAmt = map(hours, startTime, endTime, 0, 1)
        return lerpColor(color(from), color(to), lerpAmt)
    }

    /**
     * My own function which draws a moon and moves according to the y coordinate
     * @param { How much the moon moves up or down } moveY
     */
    drawMoon(moveY){
        var moonColor = color(230, 199, 23);
        var moonDot = color(171, 151, 39);
        fill(moonColor);
        ellipse(this.width / 2, this.height / 2 + moveY, 350);

        // moon dots
        fill(moonDot);
        ellipse(this.width / 1.9, this.height / 2.1 + moveY, 80); // big dot
        ellipse(this.width / 1.7, this.height / 1.65 + moveY, 30); // smaller

        ellipse(this.width / 2.3, this.height / 1.7 + moveY, 70); // big dot
        ellipse(this.width / 2.3, this.height / 2.5 + moveY, 40); // medium
        ellipse(this.width / 2.4, this.height / 1.9 + moveY, 20); // smaller

        ellipse(this.width / 1.7, this.height / 2.2 + moveY, 40); // medium
    }

    /**
     * draw sun with transparent rays
     * @param { How much the moon moves up or down } moveY
     */
    drawSun(moveY) {
        let sunRadius = 175;
        let x = this.width / 2;
        let y = this.height / 2 - 70 + moveY;
        noStroke();

        // Draw the sun's body as an ellipse
        for (let i = 0; i< 5; i++){
            fill(255, 233, 80, i*20); // Set the color to fading yellow rays
            ellipse(x, y, (sunRadius * 5) - i*100);
        }
        fill(255, 233, 80);
        ellipse(x, y, sunRadius * 2);
    }
}








