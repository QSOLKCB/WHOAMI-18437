/* WHOAMI-18437 / C
 * Five bytes of semantic payload, now with manual memory management nearby.
 */
#include <stdio.h>

static const char *whoami(void) {
    return "TRENT";
}

int main(void) {
    puts(whoami());
    return 0;
}
