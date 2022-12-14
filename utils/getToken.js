export function getToken(value) {
  const result = {};
  const str = value.split(";");
  result.access_token = str[0].slice(15, str[0].length);
  result.refresh_token = str[3].slice(
    str[3].indexOf("Refresh=") + 8,
    str[3].length
  );
  return result;
}
