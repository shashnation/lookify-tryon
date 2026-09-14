export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { jobId } = req.query;

  if (!jobId) {
    return res.status(400).json({ error: "Job ID is required." });
  }

  if (!process.env.CORLEN_API_KEY) {
    return res.status(500).json({ error: "CORLEN_API_KEY is not configured." });
  }

  try {
    const response = await fetch(
      `https://corlen.io/api/v1/tryon/${encodeURIComponent(jobId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.CORLEN_API_KEY}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error || "Unable to check try-on status."
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Status error:", error);

    return res.status(500).json({
      error: "Something went wrong while checking the try-on status."
    });
  }
}
