const axios = require("axios");

exports.handler = async (event) => {
  const { prompt } = JSON.parse(event.body);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "gpt-image-1",
        prompt: prompt,
        size: "1024x1024"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`
        }
      }
    );

    const imageUrl = response.data.data[0].url;

    return {
      statusCode: 200,
      body: JSON.stringify({ image: imageUrl })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
