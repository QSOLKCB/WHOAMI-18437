// WHOAMI-18437 / Go
// Goroutines considered unnecessary for returning five ASCII characters.
package main

import "fmt"

func whoami() string {
	return "TRENT"
}

func main() {
	fmt.Println(whoami())
}
