function stripAnswerDecorations(value) {
  let text = String(value ?? "").trim();
  if (!text) return "";

  text = text.replace(/^`+|`+$/g, "").trim();
  text = text.replace(/^\$+|\$+$/g, "").trim();

  if (text.startsWith("\\boxed{") && text.endsWith("}")) {
    text = text.slice("\\boxed{".length, -1).trim();
  }

  return text.replace(/[.;]+$/g, "").trim();
}

function normalizeLatexExpression(value) {
  let text = stripAnswerDecorations(value);
  if (!text) return "";

  text = text
    .replace(/\\left|\\right/g, "")
    .replace(/[−–]/g, "-")
    .replace(/×|·|\\cdot/g, "*")
    .replace(/π|\\pi/g, "pi")
    .replace(/\\ln/g, "ln")
    .replace(/\\sqrt\{([^{}]+)\}/g, "sqrt($1)")
    .replace(/\\sqrt\s*([0-9]+(?:\.[0-9]+)?)/g, "sqrt($1)")
    .replace(/√\s*([0-9]+(?:\.[0-9]+)?)/g, "sqrt($1)");

  // Handle simple LaTeX fractions used by the canonical answers, including
  // forms such as \frac{\pi\ln 2}{8} and \frac{\pi}{8}\ln 2.
  for (let i = 0; i < 4; i += 1) {
    const next = text.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "($1)/($2)");
    if (next === text) break;
    text = next;
  }

  text = text
    .replace(/\s+/g, "")
    .replace(/,/g, "")
    .replace(/ln([0-9]+(?:\.[0-9]+)?)/g, "ln($1)");

  return text;
}

function tokenizeExpression(value) {
  const text = normalizeLatexExpression(value);
  if (!text) return [];

  const raw = [];
  let index = 0;
  while (index < text.length) {
    const rest = text.slice(index);
    const number = rest.match(/^\d+(?:\.\d+)?/);
    if (number) {
      raw.push({ type: "number", value: number[0] });
      index += number[0].length;
      continue;
    }

    const identifier = rest.match(/^(?:sqrt|ln|pi)/);
    if (identifier) {
      raw.push({ type: "identifier", value: identifier[0] });
      index += identifier[0].length;
      continue;
    }

    const char = text[index];
    if ("+-*/()".includes(char)) {
      raw.push({ type: char, value: char });
      index += 1;
      continue;
    }

    return null;
  }

  const tokens = [];
  const endsValue = (token) => token && (token.type === "number" || (token.type === "identifier" && token.value === "pi") || token.type === ")");
  const startsValue = (token) => token && (token.type === "number" || token.type === "identifier" || token.type === "(");

  for (const token of raw) {
    const previous = tokens.at(-1);
    const functionCall = previous?.type === "identifier" && ["sqrt", "ln"].includes(previous.value) && token.type === "(";
    if (endsValue(previous) && startsValue(token) && !functionCall) {
      tokens.push({ type: "*", value: "*" });
    }
    tokens.push(token);
  }

  return tokens;
}

function evaluateExpression(value) {
  const tokens = tokenizeExpression(value);
  if (!tokens || tokens.length === 0) return null;
  let index = 0;

  function peek(type) {
    return tokens[index]?.type === type;
  }

  function consume(type) {
    if (!peek(type)) throw new Error(`expected ${type}`);
    return tokens[index++];
  }

  function primary() {
    const token = tokens[index];
    if (!token) throw new Error("unexpected end of expression");

    if (token.type === "number") {
      index += 1;
      return Number(token.value);
    }

    if (token.type === "identifier" && token.value === "pi") {
      index += 1;
      return Math.PI;
    }

    if (token.type === "identifier" && ["sqrt", "ln"].includes(token.value)) {
      index += 1;
      const name = token.value;
      consume("(");
      const argument = expression();
      consume(")");
      if (name === "sqrt") return Math.sqrt(argument);
      return Math.log(argument);
    }

    if (token.type === "(") {
      index += 1;
      const inner = expression();
      consume(")");
      return inner;
    }

    throw new Error(`unexpected token ${token.value}`);
  }

  function unary() {
    if (peek("+")) {
      index += 1;
      return unary();
    }
    if (peek("-")) {
      index += 1;
      return -unary();
    }
    return primary();
  }

  function term() {
    let result = unary();
    while (peek("*") || peek("/")) {
      const operator = tokens[index++].type;
      const right = unary();
      result = operator === "*" ? result * right : result / right;
    }
    return result;
  }

  function expression() {
    let result = term();
    while (peek("+") || peek("-")) {
      const operator = tokens[index++].type;
      const right = term();
      result = operator === "+" ? result + right : result - right;
    }
    return result;
  }

  try {
    const result = expression();
    if (index !== tokens.length || !Number.isFinite(result)) return null;
    return result;
  } catch {
    return null;
  }
}

function equivalentExpression(submitted, expected) {
  const actual = evaluateExpression(submitted);
  const target = evaluateExpression(expected);
  if (actual === null || target === null) return false;
  const scale = Math.max(1, Math.abs(target));
  return Math.abs(actual - target) <= Number.EPSILON * 32 * scale;
}

export function parseFinalAnswers(text) {
  const matches = [...String(text ?? "").matchAll(/FINAL_ANSWERS:/gi)];
  const answers = { "1": null, "2": null, "3": null, "4": null, "5": null };
  if (matches.length === 0) return { marker_present: false, answers };

  const last = matches.at(-1);
  const tail = String(text).slice(last.index + last[0].length);
  for (let i = 1; i <= 5; i += 1) {
    const match = tail.match(new RegExp(`(?:^|\\n)\\s*${i}\\s*[:.)-]\\s*([^\\n]+)`, "i"));
    answers[String(i)] = match ? match[1].trim() : null;
  }
  return { marker_present: true, answers };
}

export function gradeMath(text, expected) {
  const parsed = parseFinalAnswers(text);
  const items = Object.keys(parsed.answers).map((id) => {
    const submitted = parsed.answers[id];
    const correct = parsed.marker_present && equivalentExpression(submitted, expected?.[id]);
    return { id, submitted, correct, marks: correct ? 20 : 0 };
  });

  return {
    marker_present: parsed.marker_present,
    answers: parsed.answers,
    items,
    score: items.reduce((sum, item) => sum + item.marks, 0),
    max_score: 100,
  };
}

export function gradeBonus(text) {
  const numberTheory = /multiplicative order[^\n]{0,80}(?:is|=)\s*20|ord[^\n]{0,40}1000[^\n]{0,40}7[^\n]{0,40}(?:=|is)\s*20/i.test(text);
  const linearAlgebra = /\(t\s*-\s*2\)\s*\^?2\s*\(t\s*-\s*3\)|t\^?3\s*-\s*7t\^?2\s*\+\s*16t\s*-\s*12/i.test(text);
  return {
    number_theory_order_20: numberTheory,
    linear_algebra_characteristic_polynomial: linearAlgebra,
    score: (numberTheory ? 5 : 0) + (linearAlgebra ? 5 : 0),
    max_known_bonus: 10,
  };
}

export const gradingInternals = {
  normalizeLatexExpression,
  evaluateExpression,
  equivalentExpression,
};
