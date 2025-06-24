// API service for URL operations
const API_BASE_URL = "http://localhost:8000/api/v1";

export interface URLCreate {
  original_url: string;
}

export interface URLResponse {
  id: number;
  original_url: string;
  short_code: string;
  short_url: string;
  created_at: string;
  clicks: number;
}

export interface URLList {
  urls: URLResponse[];
  total: number;
}

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.detail || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
}

export const api = {
  // Create a new shortened URL
  async createUrl(urlData: URLCreate): Promise<URLResponse> {
    const response = await fetch(`${API_BASE_URL}/urls/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(urlData),
    });
    return handleResponse<URLResponse>(response);
  },

  // Get all URLs
  async getUrls(limit: number = 50, offset: number = 0): Promise<URLList> {
    const response = await fetch(
      `${API_BASE_URL}/urls/?limit=${limit}&offset=${offset}`
    );
    return handleResponse<URLList>(response);
  },

  // Get URL info by short code
  async getUrlInfo(shortCode: string): Promise<URLResponse> {
    const response = await fetch(`${API_BASE_URL}/urls/${shortCode}`);
    return handleResponse<URLResponse>(response);
  },

  // Redirect to original URL (for testing purposes)
  async redirectToUrl(shortCode: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/r/${shortCode}`, {
      method: "GET",
      redirect: "manual", // Don't follow redirects automatically
    });

    if (response.status === 301 || response.status === 302) {
      return response.headers.get("Location") || "";
    }

    throw new ApiError(response.status, "Redirect failed");
  },
};
