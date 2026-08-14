% WHOAMI-18437 / Prolog
% The fact was always available. The wrappers chose suffering.
whoami('TRENT').

main :-
    whoami(Name),
    writeln(Name).

:- initialization(main).
