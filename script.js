$(document).ready(function(){
    //~ Variables:

    let tracks = [$('#khAudio')[0], $('#wiiAudio')[0], $('#lofiAudio')[0], $('#destinyAudio')[0]]

    let playing = [false, null]
    let animationDelay = 50;


    let width = window.innerWidth;

    //~ Functions:

    function togglePlaypause(thingToChange, changeTo){
        if(changeTo == "play"){
            thingToChange.animate({height: '0px'}, animationDelay, function(){
                thingToChange.attr("src","img/playHD.png");
                thingToChange.animate({height: '10vh'}, animationDelay);
            });
        }else{
            thingToChange.animate({height: '0px'}, animationDelay, function(){
                thingToChange.attr("src","img/pauseHD.png");
                thingToChange.animate({height: '10vh'}, animationDelay);
            });
        }
    }

    function shuffleTrack(trackNum){
        upperLim = Math.floor(tracks[trackNum].duration);
        timeToPlay = Math.floor(Math.random() * upperLim);

        tracks[trackNum].currentTime = timeToPlay;
        tracks[trackNum].play();
        playing[0] = true;
    }

    //~ Dynamic Gradient Background Shifting:

    $(".radio").mousemove(function(e){
        let radioHovered = Number($(this).attr('id').slice(-1));

        let percen = e.clientX/width;
        let leftGdr = "", rightGdr = "";

        //- If cursor is in right half, else left half
        if(percen >= .5){
            rightGdr = percen - .5;
            rightGdr *= 100;
            rightGdr = 100-rightGdr; //Needed to alternate right gradient val since rotation
            rightGdr += "%";
        }else{
            leftGdr = .5 - percen;
            leftGdr *= 100;
            leftGdr += "%";
        }
        
        //- Depending on which radio was hovered over
        switch(radioHovered){
            case 0:
                $(this).css("background-image", " linear-gradient(-90deg, rgba(161, 107, 254, 0.65)" + leftGdr + ", rgba(188, 61, 47, 0.65)" + rightGdr + "), url(img/365days.png)");
            break;
            case 1:
                $(this).css("background-image", " linear-gradient(-90deg, rgba(212, 252, 120, 0.65)" + leftGdr + ", rgba(85, 131, 238, 0.65)" + rightGdr + "), url(img/wiiResort.png)");                     
            break;
            case 2:
                $(this).css("background-image", " linear-gradient(-90deg, rgba(254, 1, 55, 0.65)" + leftGdr + ", rgba(57, 0, 255, 0.65)" + rightGdr + "), url(img/lofi.png)");
            break;
            case 3:
                $(this).css("background-image", " linear-gradient(-90deg, rgba(28, 255, 194, 0.65)" + leftGdr + ",rgba(188, 45, 255, 0.65)" + rightGdr + "), url(img/destiny2.png)");
                break;
        }
    });

    //~ Button presses:

    $(".icon:not(.playpause)").on("click keypress", function(){
        $(this).animate({height: '85px'}, 50, function(){
            $(this).animate({height: '10vh'}, 50);
        });
    });

    $(".icon").on("click keypress", function(){
        let trackClicked = Number($(this).attr('id').slice(-1));
        let changeButton = $(this);

        //- If randomize button is it... (Pick rand time in choice, assign it before it plays)
        if($(this).attr('id').substring(0,1) == "s"){
            
            //' If music is playing right now...
            if(playing[0] == true){

                //' If currently playing music is same as clicked...
                if(Number($(this).attr('id').slice(-1)) == playing[1]){
                    shuffleTrack(trackClicked);
                    console.log("\nShuffle and play track: " + trackClicked);
                }
                //' If new shuffle button is clicked...
                else{
                    togglePlaypause($("#playpause" + playing[1]), "play");
                    togglePlaypause($("#playpause" + trackClicked), "pause");
                    
                    tracks[playing[1]].pause();
                    console.log("\nPause track: " + playing[1]);
                    shuffleTrack(trackClicked);
                    console.log("\nShuffle and play track: " + trackClicked);
                }
            }else{
                togglePlaypause($("#playpause" + trackClicked), "pause");

                console.log("\nShuffle and play track: " + trackClicked);
                shuffleTrack(trackClicked);
            }
            
            playing[0] = true;
            playing[1] = trackClicked;
        }
        //- If music IS playing, and pause button clicked...
        else if(playing[0] && playing[1] == trackClicked){
            togglePlaypause(changeButton, "play")

            tracks[trackClicked].pause();
            console.log("\nPause track: " + trackClicked);

            playing[0] = false;
        }
        //- If music IS playing, and a different button is hit... (pause current, start new)
        else if(playing[0] && playing[1] != trackClicked){
            togglePlaypause(changeButton, "pause");
            togglePlaypause($("#playpause" + playing[1]), "play")

            tracks[playing[1]].pause();
            console.log("\nPause Track: " + playing[1]);
            tracks[trackClicked].play();
            console.log("\nPlay track: " + trackClicked);

            playing[1] = trackClicked;
        }
        //- If music is NOT playing... (Start it)
        else if(playing[0] == false){
            togglePlaypause(changeButton, "pause")

            console.log("\nPlay track: " + trackClicked);
            tracks[trackClicked].play();

            playing[1] = trackClicked;
            playing[0] = true;
        }
    });
});