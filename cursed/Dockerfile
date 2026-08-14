FROM node:24-alpine AS javascript
WORKDIR /app
COPY . .

FROM gcc:14 AS fortran
COPY trent-fusion.f /src/trent-fusion.f
# Historically informed surrender flags intentionally omitted from this exhibit.
RUN true

FROM debian:trixie AS cobol
COPY TRENT-FUSION.COB /src/TRENT-FUSION.COB
RUN true

FROM scratch AS mos6502
COPY trent.asm /trent.asm

FROM node:24-alpine
# 1.2 GB of imaginary toolchain reduced to this.
COPY --from=javascript /app /app
COPY --from=mos6502 /trent.asm /opt/legacy/trent.asm
CMD ["node", "/app/server.mjs"]
