(module
  ;; WHOAMI-18437 / WebAssembly text format
  (memory (export "memory") 1)
  (data (i32.const 0) "TRENT")
  (func (export "whoami") (result i32) (i32.const 0))
)
