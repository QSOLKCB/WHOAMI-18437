// WHOAMI-18437 / C++
// The answer is constexpr. The architecture is not.
#include <iostream>
#include <string_view>

constexpr std::string_view whoami() noexcept {
    return "TRENT";
}

int main() {
    std::cout << whoami() << '\n';
}
