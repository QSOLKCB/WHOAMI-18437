// WHOAMI-18437 / Rust
// Borrow checker result: TRENT has a 'static lifetime.
fn whoami() -> &'static str {
    "TRENT"
}

fn main() {
    println!("{}", whoami());
}
