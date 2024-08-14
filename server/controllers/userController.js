const userModel = require("../models/userModel");

const userCreate = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const { email } = newUser;
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Utilisateur existant" });
    }

    const savedData = await newUser.save();
    res.status(200).json({message:"Utilisateur créé avec succès"});
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userData = await userModel.find();

    if (!userData || userData.length === 0) {
      return res.status(400).json({ message: "Aucun utilisateur trouvé" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    const updatedData = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({message: "Utilisateur modifié avec succès"});
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = {
  userCreate,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
};
