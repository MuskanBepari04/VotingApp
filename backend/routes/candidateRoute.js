const express = require("express");
const router = express.Router();
const Candidate = require("../models/candidateSchema");
const User = require("../models/userSchema");
const { auth } = require("../Authentication/auth");

const isAdmin = async (userId) => {
  try {
    const response = await User.findById(userId);
    if (response && response.role === "admin") {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

router.get("/", async (req, res) => {
  try {
    const allCandidates = await Candidate.find({});
    res.status(200).json(allCandidates);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const data = req.body;
    const id = req.user.id;
    if (!(await isAdmin(id))) {
      return res
        .status(401)
        .json({ message: "Only admins can add candidates" });
    }
    const newCandidate = await new Candidate(data);
    const respone = await newCandidate.save();
    res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/update/:CandidateId", auth, async (req, res) => {
  try {
    const data = req.body;
    const CandidateId = req.params.CandidateId;
    const userId = req.user.id;

    if (!(await isAdmin(userId)))
      return res
        .status(401)
        .json({ message: "Only admins can Update candidates" });

    const response = await Candidate.findByIdAndUpdate(CandidateId, data);
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    console.log("candidate data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

router.get("/:CandidateId", auth, async (req, res) => {
  try {
    const CandidateId = req.params.CandidateId;
    const userId = req.user.id;

    if (!(await isAdmin(userId)))
      return res
        .status(401)
        .json({ message: "Only admins can Update candidates" });

    const response = await Candidate.findById(CandidateId);
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

router.delete("/delete/:CandidateId", auth, async (req, res) => {
  try {
    const data = req.body;
    const candidateId = req.params.CandidateId;
    const userId = req.user.id;
    if (!(await isAdmin(userId)))
      return res
        .status(401)
        .json({ message: "Only admins can Delete candidates" });

    const response = await Candidate.findByIdAndDelete(candidateId);

    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    console.log("candidate data Deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
