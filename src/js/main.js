((function () {
    "use strict";

    let time = 1500;
    let animationDirection = "PutToRight";
    let speed = .2;
    let pagination = false;

/////////  TEMPLATE SLIDER BOX  //////////////////////////
    const createSlide = {

        createS: function (tag, classN = null, innerHtml = null, attrEl = null) {
            let el = document.createElement(tag);
            el.className = (classN) ? classN : "";
            el.innerHTML = (innerHtml) ? innerHtml : "";
            if (attrEl) {
                attrEl.map((elAttr) => el.setAttribute(elAttr.name, elAttr.value))
            }
            return el;
        },
        addChild: function (parrent, children) {
            children.map(el => parrent.appendChild(el));
            return parrent;
        }
    };

/////////  SLIDER OBJECT /////////////////////////////////
    const LineSlider = {
        /////////  CREATE SLIDER INSIDE YOUR CLASS  //////
        createLineSlide: function () {

            let sliderApearMs = createSlide.createS("div", "slider_box_ms");
            let sliderBox = createSlide.createS("div", "slider_wrapper_ms ");
            sliderBox.appendChild(sliderApearMs);

            for (let i = 0; i < 20; i++) {  /// => create line in
                createSlide.addChild(sliderApearMs, [createSlide.addChild(createSlide.createS("div", "slider_lines_ms"), [createSlide.createS("div", "slider_lines_twin_ms first_twin_ms"), createSlide.createS("div", "slider_lines_twin_ms second_twin_ms")])]);
            }
            return sliderBox
        },

        time: function (timing) {
            time = timing;
            return this
        },

        animationName: function (name) {
            animationDirection = name;
            return this
        },

        speed: function (speeding) {
            speed = speeding;
            return this
        },

        pagination: function (pug) {
            pagination = pug;
            return this
        },

        ///////  FINDE SLIDER  ////////////////////////////////////
        findSlider: function (elementClass) {
            this.elClass = elementClass;
            this.mainBox = Array.from(document.getElementsByClassName(this.elClass));
            for (let i = 0; i < this.mainBox.length; i++) {
                // this.mainBox[i].style.position = "absolute";
                this.mainBox[i].appendChild(LineSlider.createLineSlide())
                this.mainBox[i].classList.add(this.elClass + i) // => делаем классы для боксов с одинаковыми классами
            }
            return this
        },

        ///////  PLAY SLIDER  ////////////////////////////////////
        play: function () {

            let timeDefault;
            let timing = time;
            let lastLine;
            let timeOfChange;
            this.animationDirection = animationDirection;
            let positionBg = -0;
            let countImage = 0;
            let interval;

            for (let i = 0; i < this.mainBox.length; i++) {
                this.arrLines = Array.from(document.querySelectorAll('.' + this.elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.first_twin_ms'));
                for (let q = 0; q < this.arrLines.length; q++) {
                    this.arrLines[q].setAttribute("data-number_line", q);
                }

                if (this.animationDirection == "StepToRight") {
                    this.animationOfName = "StepToRight_ms"
                } else if (this.animationDirection == "StepToLeft") {
                    this.animationOfName = "StepToLeft_ms";
                } else if (this.animationDirection == "PutToRight") {
                    this.animationOfName = "PutToRight_ms";
                } else if (this.animationDirection == "PutToLeft") {
                    this.animationOfName = "PutToLeft_ms";
                } else if (this.animationDirection == "CoverToRight") {
                    this.animationOfName = "CoverToRight_ms";
                } else if (this.animationDirection == "CoverToLeft") {
                    this.animationOfName = "CoverToLeft_ms";
                } else if (this.animationDirection == "mix") {
                    this.animationOfName = "mix_ms";
                }

                let y = 0.2;
                if (this.animationOfName == "StepToRight_ms" || this.animationOfName == "PutToRight_ms" || this.animationOfName == "CoverToRight_ms") {
                    for (let i = 0; i < this.arrLines.length; i++) {
                        this.arrLines[i].style.animationDelay = y + "s";
                        (speed) ? y += speed : y += 0.2
                    }
                } else if (this.animationOfName == "StepToLeft_ms" || this.animationOfName == "PutToLeft_ms" || this.animationOfName == "CoverToLeft_ms") {
                    for (let i = this.arrLines.length - 1; i >= 0; i--) {
                        this.arrLines[i].style.animationDelay = y + "s";
                        (speed) ? y += speed : y += 0.2
                    }
                } else if (this.animationOfName == "mix_ms") {
                    for (let i = 0; i < this.arrLines.length; i++) {
                        this.arrLines[i].style.animationDelay = y + "s";
                        (speed) ? y += speed : y += 0.2
                    }
                }
            }

            /////  CREATE DIRECTIONS AND ANIMATION`S NAMES /////////

            function playPag(mainBox, elClass, animationOfName) {
                for (let i = 0; i < mainBox.length; i++) {

                    let desc = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.background_ms > div.desc_ms'));
                    let boxS = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms'));
                    let firstSlidesLine = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.first_twin_ms'));
                    let secondSlidesLine = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.second_twin_ms'));
                    let imgPath = Array.from(document.querySelectorAll('.' + elClass + i + '>div.background_ms'));
                    let pugBox = createSlide.createS("div", "pagination_block_ms");
                    let pugBtnBox = createSlide.createS("div", "pagination_block_btn_ms");
                    let pugBoxCover = createSlide.createS("div", "pagination_block_cover_ms");
                    createSlide.addChild(pugBox, [pugBoxCover, pugBtnBox]);
                    for (let q = 0; q < imgPath.length; q++) {
                        let pugBtn = createSlide.createS("div", "pagination_btn_ms");
                        pugBtn.setAttribute("data-pugnumber", q)
                        pugBtnBox.appendChild(pugBtn)
                    }
                    mainBox[i].appendChild(pugBox)


                    let btn = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.pagination_block_ms > div.pagination_block_btn_ms > div.pagination_btn_ms'));
                    let btnBlock = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.pagination_block_ms > div.pagination_block_cover_ms'));
                    let pugBlock = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.pagination_block_ms'))

                    if (pagination == false) {
                        pugBlock.map((el)=>{el.style.display = "none"})
                    } else if (pagination == true) {
                        pugBlock.map((el)=>{el.style.display = "block"})
                    }

                    if (animationOfName == "StepToRight_ms" || animationOfName == "PutToRight_ms" || animationOfName == "CoverToRight_ms") {
                        lastLine = getComputedStyle(firstSlidesLine[firstSlidesLine.length - 1]).animationDelay;
                    } else if (animationOfName == "StepToLeft_ms" || animationOfName == "PutToLeft_ms" || animationOfName == "CoverToLeft_ms") {
                        lastLine = getComputedStyle(firstSlidesLine[0]).animationDelay;
                    }

                    ////////  Timing  /////////////////////////////////////
                    timeOfChange = parseInt(lastLine + 1000) * 1000;
                    (timing) ? timeDefault = timing : timeDefault = 1000;
                    console.log("...");


                    ///////  create BG Position  /////////////////////////
                    for (let q = 0; q < firstSlidesLine.length; q++) {
                        firstSlidesLine[q].style.backgroundPositionX = positionBg + "%";
                        // secondSlidesLine[q].style.backgroundPositionX = positionBg + "%";
                        positionBg = positionBg + 5.26;  ///// initially 5.2560
                        firstSlidesLine[q].style.zIndex = "1000";
                    }
                    ////////  create FIRST IMG  //////////////////////////
                    for (let q = 0; q < firstSlidesLine.length; q++) {
                        firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImage].dataset.path_img})`;
                        firstSlidesLine[q].style.animationName = animationOfName;
                        setTimeout(function () {
                            boxS[0].style.backgroundSize = "100% 100%"
                            boxS[0].style.backgroundImage = `url(${imgPath[countImage].dataset.path_img})`;
                        }, timeOfChange + timeDefault)
                    }
                    btn[0].classList.add("btn_active_ms");

                    setTimeout(function () {
                        btnBlock[0].style.zIndex = 1
                        for (let q = 0; q < btn.length; q++) {
                            btn[q].classList.remove("btn_disable_ms");
                            btn[q].classList.add("btn_enable_ms");

                            if (btn[q].dataset.pugnumber == +countImageS) {
                                btn[countImageS].classList.add("btn_active_ms");
                            }
                        }
                    }, timeOfChange + 500);

                    setTimeout(function () {
                        desc[0].style.opacity = 1
                        desc[0].style.zIndex = 100000000
                    }, timeOfChange + 500);  //// +700 ???

                    let countImageS;

                    let startPlay = function (countImg) {
                        countImageS = +countImg;

                        for (let q = 0; q < firstSlidesLine.length; q++) {
                            firstSlidesLine[q].style.opacity = 0;
                            firstSlidesLine[q].style.animationName = "none";

                            setTimeout(function () {
                                firstSlidesLine[q].style.animationName = animationOfName;
                                firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImageS].dataset.path_img})`;
                            }, 70);
                        }

                        interval = setInterval(function () {
                            desc[countImageS].style.opacity = 0;
                            desc[countImageS].style.zIndex = 0;
                            btnBlock[0].style.zIndex = 1000;

                            for (let c = 0; c < btn.length; c++) {
                                btn[c].classList.remove("btn_enable_ms");
                                btn[c].classList.remove("btn_active_ms");
                                btn[c].classList.add("btn_disable_ms");
                            }

                            if (countImageS < btn.length-1) {
                                btn[countImageS].classList.remove("btn_active_ms");        //// little pug
                                btn[countImageS + 1].classList.add("btn_active_ms");
                            }
                            if (countImageS == btn.length - 1) {
                                btn[0].classList.add("btn_active_ms");
                            }

                            setTimeout(function () {
                                desc[countImageS].style.opacity = 1;
                                desc[countImageS].style.zIndex = 10000000000;
                                btnBlock[0].style.zIndex = 1;

                                for (let c = 0; c < btn.length; c++) {
                                    btn[c].classList.remove("btn_disable_ms");
                                    btn[c].classList.remove("btn_active_ms");
                                    btn[c].classList.add("btn_enable_ms")

                                    if (btn[c].dataset.pugnumber == +countImageS) {  //// big pug
                                        btn[c].classList.add("btn_active_ms");
                                    }

                                }
                            }, timeOfChange + 700);

                            for (let i = 0; i < boxS.length; i++) {
                                boxS[0].style.backgroundImage = `url(${imgPath[countImageS].dataset.path_img})`;
                                for (let q = 0; q < firstSlidesLine.length; q++) {
                                    firstSlidesLine[q].style.opacity = 0;
                                    setTimeout(function () {
                                        firstSlidesLine[q].style.animationName = "none";
                                    }, 0)

                                    setTimeout(function () {
                                        firstSlidesLine[q].style.animationName = animationOfName;
                                        firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImageS].dataset.path_img})`;
                                    }, 50)
                                }
                            }
                            countImageS += 1;
                            if (countImageS == imgPath.length) {
                                countImageS = 0
                            }
                        }, timeOfChange + timeDefault);
                        return this
                    };

                    let secondPlay = function (countImg) {
                        setTimeout(function () {
                            desc[countImg].style.opacity = 1
                            desc[countImg].style.zIndex = 100000000
                            btnBlock[0].style.zIndex = 1

                            for (let c = 0; c < btn.length; c++) {
                                btn[c].classList.remove("btn_disable_ms");
                                btn[c].classList.remove("btn_active_ms");
                                btn[c].classList.add("btn_enable_ms");
                            }
                            if (btn[countImageS].dataset.pugnumber == countImageS){
                                btn[countImageS].classList.add("btn_active_ms");
                            }
                        }, timeOfChange + 500);  //// +700 ???
                        startPlay(countImageS)
            };

                    btn.map((el) => {
                        el.addEventListener("click", function (e) {
                            clearInterval(interval);
                            desc[countImageS].style.opacity = 0;
                            desc[countImageS].style.zIndex = 0;
                            btnBlock[0].style.zIndex = 1000000;

                            for (let c = 0; c < btn.length; c++) {
                                btn[c].classList.remove("btn_enable_ms");
                                btn[c].classList.remove("btn_active_ms");
                                btn[c].classList.add("btn_disable_ms");
                            }
                            e.target.classList.add("btn_active_ms");
                            boxS[0].style.backgroundImage = `url(${imgPath[countImageS].dataset.path_img})`;
                            countImageS = e.target.dataset.pugnumber;

                            secondPlay(countImageS)
                        })
                    });
                    startPlay(countImage)
                }
            }


            playPag(this.mainBox, this.elClass, this.animationOfName);

            animationDirection = "PutToRight";
            speed = 0.2;
            time = 1500;
            pagination = false;
            return this
        }
    };

    window.LineSlider = LineSlider;
    return window.LineSlider

}))();

function check() {
    let x = Array.from(document.getElementsByClassName("direction_check"))
    let xx = document.getElementById("direction_check_1")
    let xxx = document.getElementById("direction_check_2")
    let y = document.getElementById("xxx");
    let c = [xx, xxx]
    c.map((el)=>{
        el.addEventListener("click", function () {
            for (let i = 0; i < c.length; i++) {
                if (c[i].checked == true) {
                    if (c[i] == xx){
                        y.style.background = "yellow"
                    }
                    else if (c[i] == xxx){
                        y.style.background = "green"
                    }
                }
            }
        })
    })


}
check()

// LineSlider.findSlider("box")
//     .time(3000)
//     .speed(0.1)
//     .pagination(true)
//     // .animationName("PutToRight")
//     //     .animationName("StepToRight")
//     //     .animationName("PutToRight")
//     .play();

LineSlider.findSlider("slider_block_cover")
    .time(3000)
    .speed(0.1)
    .pagination(true)
    .animationName("PutToRight")
    .play();

// LineSlider.findSlider("picture_monna")
//     .time(2000)
//     .speed(0.1)
//     .animationName("PutToRight")
//     .pagination(true)
//     .play();
//
// LineSlider.findSlider("picture_right")
//     .time(3000)
//     .speed(0.1)
//     .animationName("StepToLeft")
//     .pagination(true)
//     .play();


// LineSlider.findSlider("box")
//     // .time(3000)
//     // .speed(0.1)
//     .animationName("StepToLeft")
//     .play();