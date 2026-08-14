// WHOAMI-18437 / OpenCL — TRENT in parallel for absolutely no reason.
__kernel void whoami(__global char *out) {
  const char id[5] = {'T','R','E','N','T'};
  for (int i = 0; i < 5; ++i) out[i] = id[i];
}
