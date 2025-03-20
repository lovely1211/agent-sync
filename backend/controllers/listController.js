const List = require("../models/List");
const Agent = require("../models/Agent");
const csv = require("csv-parser");
const fs = require("fs");
const { Readable } = require("stream");

// Upload and process CSV file, then distribute records among agents
exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let results = [];
    let readableStream;

    if (req.file.path) {
      readableStream = fs.createReadStream(req.file.path);
    } else {
      readableStream = new Readable();
      readableStream._read = () => {};
      readableStream.push(req.file.buffer);
      readableStream.push(null);
    }

    readableStream
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        if (req.file.path) fs.unlinkSync(req.file.path);

        const agents = await Agent.find();
        if (agents.length === 0) {
          return res.status(400).json({ message: "No agents found" });
        }

        const totalItems = results.length;
        const itemsPerAgent = Math.floor(totalItems / agents.length);
        const extraItems = totalItems % agents.length;
        let records = [];
        let index = 0;

        agents.forEach((agent, i) => {
          let count = itemsPerAgent + (i < extraItems ? 1 : 0);
          for (let j = 0; j < count; j++) {
            records.push({
              firstName: results[index].firstName,
              phone: results[index].phone,
              notes: results[index].notes,
              agentId: agent._id,
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

// Fetch and group lists by agent
exports.getGroupedAgentLists = async (req, res) => {
  try {
    const groupedLists = await List.aggregate([
      {
        $group: {
          _id: "$agentId",
          items: {
            $push: {
              firstName: "$firstName",
              phone: "$phone",
              notes: "$notes",
            },
          },
        },
      },
    ]);

    res.json(groupedLists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching grouped agent lists" });
  }
};


