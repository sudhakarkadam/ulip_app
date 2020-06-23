const prompts = require("prompts");
const copy = require("./copy-assets");

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "appName",
      message: "What's the name of your app in CamelCase? e.g (AwesomeApp)",
      validate: value => {
        if (value.trim()) return true;
        return "Please return a valid name.";
      }
    }
  ]);

  // trigger
  copy(response);
})();
