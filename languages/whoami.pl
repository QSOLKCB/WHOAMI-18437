#!/usr/bin/env perl
# WHOAMI-18437 / Perl
# There is more than one way to do it. All of them should print TRENT.
use strict;
use warnings;

sub whoami { return 'TRENT'; }

print whoami(), "\n";
