$(document).ready(function(){
    
var buttonColours=['red','blue','green','yellow']
var gamePattern=new Array()
var userClickedPattern=new Array()
var started=false;
var level=-1;

$(document).on('keypress',(event)=>{
    if(!started){
        nextSequence();
        started=true
    }
})

$('.btn').click(function(){
    var userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour)
    animatePress(userChosenColour)
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
    
})

function checkAnswer(currentLevel){
   if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    if(gamePattern.length==userClickedPattern.length){
        setTimeout(()=>{
            nextSequence()
        },1000)
    }
   }
   else{
    playSound('wrong');
    $('body').addClass('game-over');
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

    startOver();
   }
}
function nextSequence(){
    userClickedPattern=[];
    level=level+1;
    $('h1').html("Level "+level);
    var randomNumber=Math.floor(Math.random()*4)
    var randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    animatePress(randomChosenColour)
    playSound(randomChosenColour)
    
}

function playSound(src){
    const audio=new Audio('sounds/'+src+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('.'+currentColour).addClass('pressed')
    $('#'+currentColour).fadeOut(100).fadeIn(100);
    setTimeout(function(){
        $('.'+currentColour).removeClass('pressed');
    },100)
}

function startOver(){
    level=-1;
    started=false;
    gamePattern=[];
}
})
