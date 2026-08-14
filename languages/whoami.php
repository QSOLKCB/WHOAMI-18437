<?php
// WHOAMI-18437 / PHP
// Because the identity endpoint apparently needed server-side scripting too.
function whoami_trent(): string {
    return "TRENT";
}

echo whoami_trent(), PHP_EOL;
