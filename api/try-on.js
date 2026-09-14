export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const {
      customerPhotoBase64,
      garmentImageUrl,
      category
    } = req.body || {};

    if (!customerPhotoBase64) {
      return res.status(400).json({
        error: "Customer photo is required."
      });
    }

    if (!garmentImageUrl) {
      return res.status(400).json({
        error: "Garment image is required."
      });
    }

    if (!process.env.CORLEN_API_KEY) {
      return res.status(500).json({
        error: "CORLEN_API_KEY is not configured."
      });
    }

    const response = await fetch(
      "https://corlen.io/api/v1/tryon",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CORLEN_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerPhotoBase64,
          garmentImageUrl,
          category: category || "upper_body"
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error || "Corlen request failed."
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Try-on error:", error);

    return res.status(500).json({
      error: "Something went wrong while starting the try-on."
    });
  }
}
