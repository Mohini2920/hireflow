export async function retryGemini(fn, maxRetries = 5) {
  let delay = 1000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const status =
        error?.status ||
        error?.error?.code ||
        error?.response?.status;

      console.error(
        `Gemini Error (Attempt ${attempt}/${maxRetries})`,
        status,
        error?.message
      );

      // Retry only for temporary errors
      if (
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504
      ) {
        if (attempt === maxRetries) {
          throw new Error(
            "Gemini service is currently busy. Please try again after a few minutes."
          );
        }

        console.log(`Retrying in ${delay} ms...`);

        await new Promise((resolve) => setTimeout(resolve, delay));

        delay *= 2;
        continue;
      }

      // Don't retry for permanent errors
      throw error;
    }
  }
}