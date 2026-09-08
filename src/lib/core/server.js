const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.message || "Request failed"
    );
  }

  return data;
};

export const serverMutation = async (
  path,
  data,
  method = "POST"
) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result?.message || "Request failed"
    );
  }

  return result;
};