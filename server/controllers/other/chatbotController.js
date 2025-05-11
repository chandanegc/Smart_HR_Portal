import { main } from "../../utils/helper.js";

export const chatbot = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await main(prompt);
    res.status(200).json({ msg: response });
  } catch (error) {
    res.json({ msg: error });
    console.log(error);
  }
};
