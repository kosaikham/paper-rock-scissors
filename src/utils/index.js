export const PAPER = 'paper';
export const ROCK = 'rock';
export const SCISSORS = 'scissors';

export const weapons = [PAPER, ROCK, SCISSORS];

export const compare = (choice1, choice2) => {
    if(choice1 === choice2){
        return 0;
    }

    if(choice1 === PAPER){
        if(choice2 === ROCK){
            return 1;
        }else{
            return 2;
        }
    }

    if(choice1 === ROCK){
        if(choice2 === PAPER){
            return 2;
        }else{
            return 1;
        }
    }

    if(choice1 === SCISSORS){
        if(choice2 === PAPER){
            return 1;
        }else{
            return 2;
        }
    }
}