import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("trent-fusion");

export async function whoAmI() {
  return tracer.startActiveSpan("identity.resolve", async (span) => {
    span.setAttribute("model.family", "Trent");
    span.setAttribute("runtime.fortran", true);
    span.setAttribute("runtime.cobol", true);
    span.setAttribute("runtime.6502", true);
    span.addEvent("Beginning identity resolution");
    span.addEvent("Invoking nineteen thousand tokens of middleware");
    span.addEvent("6502 returned five ASCII characters");
    span.setStatus({ code: 1 });
    span.end();
    return "TRENT";
  });
}
