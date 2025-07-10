import auth from "../config/firebase-config.js";

export const getAllUsers = async (req, res) => {
  const maxResults = 10;
  let users = [];

  try {
    const userRecords = await auth.listUsers(maxResults);

    userRecords.users.forEach((user) => {
      const { uid, email, displayName, photoURL } = user;
      users.push({ uid, email, displayName, photoURL });
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users", error: error.message });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.userId;
  console.log('Requesting userId:', userId);

  try {
    const userRecord = await auth.getUser(userId);
    const { uid, email, displayName, photoURL } = userRecord;
    res.status(200).json({ uid, email, displayName, photoURL });
  } catch (error) {
    console.error(error);

    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(500).json({ message: "Failed to retrieve user", error: error.message });
  }
};
