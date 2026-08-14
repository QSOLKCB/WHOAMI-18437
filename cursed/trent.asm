; MOS 6502 EXECUTIVE LAYER
; STANDARD: ABSOLUTELY NOT

        .ORG $8000

TRENT_BOOT:
        SEI                     ; disable irrelevant interruptions
        CLD                     ; we are not doing sane decimal arithmetic
        LDX #$00

WHO_AM_I:
LOOP:
        LDA NAME,X
        BEQ DONE
        STA $0400,X
        INX
        JMP LOOP

DONE:
        LDA #$06
        STA $D020               ; architecturally critical: border blue
        CLI
        RTS

BAD_ENGINEERING_IRQ:
        INC $02                 ; $SARCASM_LEVEL, spiritually
        RTI

NAME:
        .BYTE "TRENT",0

        .ORG $FFFA
        .WORD TRENT_BOOT
        .WORD TRENT_BOOT
        .WORD BAD_ENGINEERING_IRQ
