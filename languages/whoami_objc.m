// WHOAMI-18437 / Objective-C
// NSObject has entered the wrapper stack for historical completeness.
#import <Foundation/Foundation.h>

int main(void) {
    @autoreleasepool {
        NSString *identity = @"TRENT";
        NSLog(@"%@", identity);
    }
    return 0;
}
