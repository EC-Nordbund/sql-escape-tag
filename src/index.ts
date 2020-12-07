import { escape } from "sqlstring";

type primitive = number | boolean | string | object | null;

function isObject(str: primitive) {
  return str && typeof str === "object";
}

function jsonCapableEscape(str: primitive) {
  return escape(isObject(str) ? JSON.stringify(str) : str);
}

export function sql(queryParts: TemplateStringsArray, ...values: primitive[]) {
  return queryParts.reduce(
    (query, queryPart, i) =>
      query +
      queryPart +
      (i < values.length ? jsonCapableEscape(values[i]) : ""),
    ""
  );
}

export default sql;
