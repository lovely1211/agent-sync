const List = require("../models/List");
const Agent = require("../models/Agent");
const csv = require("csv-parser");
const fs = require("fs");

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        fs.unlinkSync(req.file.path);

        const agents = await Agent.find();
        const numAgents = agents.length;
        const totalItems = results.length;

        if (numAgents === 0) {
          return res.status(400).json({ message: "No agents found" });
        }

        const itemsPerAgent = Math.floor(totalItems / numAgents);
        const extraItems = totalItems % numAgents;

        let records = [];
        let index = 0;

        agents.forEach((agent, i) => {
          let count = itemsPerAgent + (i < extraItems ? 1 : 0);

          for (let j = 0; j < count; j++) {
            records.push({
              firstName: results[index].firstName,
              phone: results[index].phone,
              notes: results[index].notes,
              agentId: agent._id, // Assign item to specific agent
            });
            index++;
          }
        });

        await List.insertMany(records);

        res.json({ message: "CSV Uploaded & Distributed Correctly", records });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing CSV" });
  }
};

exports.getAgentLists = async (req, res) => {
  try {
    const lists = await List.find({ agentId: req.params.id });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lists" });
  }
};

