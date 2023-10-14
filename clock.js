// creating random arrays
const randomList = [585, 526, 901, 119, 200, 523, 911, 182, 60, 125, 209, 482, 919, 837, 777, 731, 201, 940, 953, 772, 329, 871, 951, 415, 
    885, 614, 519, 580, 242, 9, 933, 864, 553, 323, 339, 882, 146, 811, 793, 736, 534, 723, 834, 10, 421, 672, 746, 330, 796, 11, 474, 669, 
    517, 584, 163, 661, 522, 79, 452, 516, 855, 19, 765, 673, 151, 285, 737, 130, 853, 450, 913, 131, 621, 273, 797, 711, 631, 761, 160, 674, 
    844, 427, 159, 81, 410, 838, 662, 887, 863, 38, 499, 920, 705, 960, 75, 543, 467, 219, 37, 169, 813, 698, 268, 426, 216, 15, 564, 706, 
    605, 587, 798, 821, 599, 808, 717, 369, 229, 494, 598, 250, 636, 724, 269, 848, 532, 184, 884, 816, 288, 76, 510, 468, 172, 866, 108, 
    577, 435, 74, 492, 387, 860, 690, 142, 930, 571, 166, 959, 651, 846, 817, 829, 883, 189, 251, 727, 684, 751, 726, 136, 787, 814, 231, 
    839, 109, 138, 148, 638, 344, 862, 396, 957, 234, 315, 576, 579, 602, 171, 857, 733, 906, 157, 152, 174, 44, 218, 535, 301, 784, 87, 
    144, 194, 490, 739, 275, 942, 310, 394, 533, 105, 316, 695, 151, 133, 514, 393, 650, 305, 931, 992, 649, 281, 343, 243, 32, 292, 33,
     423, 483, 72, 914, 63, 81, 341, 4, 256, 371, 287, 962, 95, 788, 54, 422, 3, 798, 268, 531, 569, 770, 969, 814, 487, 425, 562, 660,
      972, 46, 56, 448, 453, 216, 573, 231, 364, 812, 762, 40, 731, 485, 648, 915, 636, 861, 817, 588, 254, 632, 266, 577, 639, 722,
       810, 652, 241, 441, 101, 827, 271, 677, 227, 575, 126, 611, 729, 232, 784, 11, 662, 382, 290, 31, 745, 741, 630, 435, 426,
        634, 947, 408, 504, 919, 57, 761, 332, 583, 754, 878, 180, 998, 889, 239, 107, 474, 183, 370, 953, 192, 952, 519, 728, 432,
         338, 765, 718, 25, 580, 497, 495, 900, 429, 297, 993, 246, 44, 624, 331, 642, 80, 373, 967, 498, 258, 139, 607, 875, 156,
          535, 221, 816, 778, 257, 795, 161, 706, 516, 96, 956, 831, 190, 155, 263, 981, 400, 38, 579, 410, 302, 184, 106, 212, 747, 238,
           405, 946, 698, 90, 59, 523, 848, 601, 9, 557, 293, 641, 322, 686, 834, 819, 826, 661, 195, 329, 658, 481, 30, 166, 277, 112, 543,
            918, 213, 8, 748, 320, 520, 541, 162, 289, 733, 291, 69, 526, 75, 666, 248, 355, 250, 830, 610, 356, 965, 735, 62, 845, 869, 791,
             774, 626, 702, 55, 522, 689, 379, 350, 612, 21, 913, 154, 463, 300, 637, 200, 628, 415, 468, 959, 249, 86, 466, 838, 996, 887, 
             673, 828, 208, 954, 599, 936, 629, 488, 418, 510, 542, 757, 786, 822, 847, 521, 354, 230, 451, 309, 537, 186, 353, 997, 752, 
             122, 894, 776, 933, 724, 528, 214, 614, 740, 742, 199, 433, 189, 175, 800, 442, 517, 67, 640, 769, 785, 377, 620, 911, 616, 
             833, 647, 545, 438, 727, 684, 394, 958, 929, 540, 908, 664, 715, 37, 47, 351, 13, 179, 763, 53, 10, 707, 820, 7, 971, 659, 
             255, 905, 61, 282, 790, 678, 604, 235, 574, 635, 138, 51, 738, 925, 85, 5, 904, 922, 852, 835, 572, 783, 719, 866, 502, 
             797, 553, 714, 49, 671, 744, 447, 631, 986, 64, 430, 163, 976, 276, 411, 330, 825, 253, 499, 380, 618, 259, 477, 196, 
             344, 881, 115, 280, 656, 529, 492, 301, 809, 159, 657, 103, 768, 655, 633, 141, 530, 496, 995, 142, 999, 378, 653, 
             170, 478, 491, 307, 284, 306, 323, 288, 840, 452, 104, 367, 416, 261, 621, 934, 711, 505, 328, 285, 856, 404, 333, 891, 203, 
             431, 843, 494, 602, 586, 871, 813, 444, 181, 712, 265, 552, 500, 957, 617, 70, 917, 935, 123, 398, 672, 643, 556, 595, 772, 15, 
             794, 298, 110, 176, 445, 513, 413, 217, 839, 773, 273, 121, 749, 24, 679, 205, 596, 486, 218, 687, 644, 71, 544, 511, 465, 100, 
             841, 251, 484, 173, 102, 366, 688, 449, 764, 638, 383, 600, 593, 342, 966, 942, 43, 867, 207, 721, 407, 584, 692, 670, 177, 168, 
             119, 460, 898, 691, 204, 590, 680, 308, 560, 842, 829, 79, 977, 52, 622, 766, 456, 269, 723, 206, 167, 146, 140, 385, 512, 270, 
             242, 12, 859, 681, 978, 759, 597, 260, 169, 401, 360, 950, 359, 753, 48, 26, 690, 224, 807, 129, 980, 592, 932, 568, 482, 23, 
             187, 454, 864, 450, 578, 775, 506, 93, 327, 576, 148, 125, 792, 789, 325, 412, 157, 896, 143, 849, 858, 780, 361, 434, 941, 880, 
             818, 853, 50, 349, 326, 455, 668, 267, 824, 479, 147, 767, 158, 77, 591, 760, 865, 219, 983, 964, 174, 726, 669, 654, 424, 548, 
             16, 985, 982, 501, 399, 924, 717, 876, 209, 223, 870, 42, 779, 699, 587, 571, 397, 144, 120, 862, 758, 1, 665, 369, 60, 868, 585,
              274, 525, 275, 909, 215, 874, 321, 228, 837, 713, 58, 821, 462, 555, 994, 805, 198, 458, 945, 66, 970, 97, 89, 910, 406, 278, 
              886, 550, 928, 117, 73, 317, 594, 694, 421, 473, 428, 220, 337, 907, 233, 804, 736, 391, 392, 109, 470, 806, 756, 124, 368, 
              883, 619, 229, 324, 720, 623, 210, 197, 14, 990, 17, 700, 533, 975, 538, 844, 979, 202, 362, 589, 98, 606, 471, 35, 518, 165, 
              118, 247, 857, 912, 987, 240, 319, 363, 803, 751, 860, 45, 939, 539, 802, 988, 991, 566, 676, 944, 419, 387, 340, 116, 799, 137, 
              613, 921, 443, 372, 930, 336, 222, 160, 164, 515, 65, 598, 895, 796, 490, 348, 295, 244, 974, 225, 524, 182, 113, 734, 315, 
              312, 36, 346, 417, 781, 264, 134, 375, 105, 461, 879, 683, 396, 374, 296, 427, 708, 645, 92, 973, 475, 777, 472, 808, 76, 178, 
              811, 559, 916, 493, 902, 836, 303, 41, 901, 508, 823, 489];


class clock {
    width = window.innerWidth;
    height = window.innerHeight;
    
    constructor(hours, minutes, seconds, millis){
        //    hours goes from 0-23
        //    minutes goes from 0-59
        //    seconds goes from 0-59
        //    millis goes from 0-999

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
                this.star(randomList[i], randomList[i+1], 5, 11.6, 3);
                fill(starsColor2);
                this.star(randomList[i], randomList[i+1], 11.6, 5, 3);
            } else {
                // reset to start
                let secondsResetsAfterFive = (seconds + randomList[i]) % 20;
                let secondsWithFraction = secondsResetsAfterFive + (millis / 1000.0);
                console.log(secondsWithFraction);
                let startX = map(secondsWithFraction, 0, 30, -70, this.width*2);

                this.drawCloud(startX, randomList[i+1]);
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
            var diameter = 100 / 2 - abs(cy - y) + offset + (randomList[i]/10);

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








