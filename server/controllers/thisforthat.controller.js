const fetch = require("node-fetch");

export default class ThisForthatController {
  async getIdea(req, res) {
    fetch("http://itsthisforthat.com/api.php?json")
      .then((response) => response.json())
      .then((data) => {
        res.json({
          status: "success",
          text: `So, Basically, It's Like A ${data.this} for ${data.that}.`,
        });
      });
  }
}
