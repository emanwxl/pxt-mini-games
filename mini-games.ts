//% block="Mini-games" color=#8c00ff icon="\uf11b"
namespace minigames {
    function showHand(hand: number): void {
        if (hand === 0) {
            basic.showLeds(`
                . . . . .
                . # # # .
                . # # # .
                . # # # .
                . . . . .
            `);
        } else if (hand === 1) {
            basic.showLeds(`
                . # # # .
                . # # # .
                . # # # .
                . # # # .
                . # # # .
            `);
        } else {
            basic.showIcon(IconNames.Scissors);
        }
    }
    //% block="play rock paper scissors %forever"
    export function rockPaperScissors(forever: Forever | boolean): void {
        let player: number = 0
        let turn: boolean = true;
        let wins: number = 0;
        let losses: number = 0;
        input.onButtonPressed(Button.A, (): void => {
            if (turn) {
                player = (player + 1) % 3;
                music.ringTone(Note.C5);
                basic.pause(300);
                music.stopAllSounds();
            }
        });
        input.onButtonPressed(Button.B, (): void => {
            if (turn) {
                turn = false;
                music.play(music.stringPlayable("C D E F G -", 300), music.PlaybackMode.UntilDone);
                let microbit: number = randint(0, 2);
                showHand(microbit);
                music.play(music.stringPlayable("- G F E D C", 300), music.PlaybackMode.UntilDone);
                basic.pause(500)
                if ((player - microbit + 3) % 3 === 1) {
                    wins++;
                    basic.showIcon(IconNames.Happy);
                    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.UntilDone);
                } else if ((player - microbit + 3) % 3 === 2) {
                    losses++;
                    basic.showIcon(IconNames.Sad);
                    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.UntilDone);
                } else {
                    basic.showIcon(IconNames.Asleep);
                }
                basic.pause(500);
                basic.clearScreen();
                if (typeof forever === "number") {
                    if (forever === 0) {
                        return;
                    }
                } else {
                    if (!forever) {
                        return;
                    }
                }
                basic.showString(`${wins} vs. ${losses}`, 95);
                basic.clearScreen();
                basic.pause(200);
                turn = true;
            }
        });
        basic.forever((): void => {
            if (turn) {
                showHand(player);
            }
        });
    }
}
