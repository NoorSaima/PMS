type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function CommonApi<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  token?: any,
  body?: object,
  entityName?: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    const raw = await res.text();

    let result: T | Record<string, any> = {};
    try {
      result = raw ? JSON.parse(raw) : {};
    } catch {
      // If JSON parsing fails, fallback to raw text wrapped in message
      result = { message: raw };
    }

    const name = entityName || "Resource";

    // Determine success based on res.ok (status 200-299)
    const success = res.ok;

    // Define messages per status code, method, and entity
    let message = "Something went wrong";

    if (success) {
      switch (method) {
        case "POST":
          message = `✅ ${name} created successfully`;
          break;
        case "PUT":
          message = `✅ ${name} updated successfully`;
          break;
        case "DELETE":
          message = `✅ ${name} deleted successfully`;
          break;
        case "GET":
        default:
          message = `✅ ${name} fetched successfully`;
          break;
      }
    } else {

      switch (res.status) {
        case 400:
          message = `⚠️ Bad Request – Please check your ${name.toLowerCase()} input`;
          break;
        case 401:
          message = `🔒 Unauthorized – Invalid token or credentials`;
          break;
        case 403:
          message = `🚫 Forbidden – You don't have permission to ${method.toLowerCase()} this ${name.toLowerCase()}`;
          break;
        case 404:
          message = `❓ Not Found – The ${name.toLowerCase()} does not exist`;
          break;
        case 409:
          message = `⚠️ Conflict – This ${name.toLowerCase()} already exists or cannot be duplicated`;
          break;
        case 500:
          message = `❌ Server error – Please try again later`;
          break;
        default:
          // Use message from result if present, else generic
          message = (result as any)?.message || (result as any)?.title || `Error: ${res.status}`;
          break;
      }
    }

    return {
      success,
      message,
      data: result as T,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal server error",
    };
  }
}
