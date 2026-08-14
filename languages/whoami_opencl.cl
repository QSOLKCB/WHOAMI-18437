// WHOAMI-18437 / OpenCL — TRENT in parallel for absolutely no reason.
__kernel void whoami(__global char *out) {
  const size_t i = get_global_id(0);
  const char id[5] = {'T','R','E','N','T'};
  if (i < 5) out[i] = id[i];
}
