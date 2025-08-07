import { Contact } from "../models/contact.js";
export const getAllContact = async (req, res) => {
  try {
    const userContact = await Contact.find();

    if (!userContact) {
      return res.json({ message: "contact not found", success: false });
    }

    res.json({
      message: "fetched all contacts",
      userContact,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
};

export const newContact = async (req, res) => {
  try {
    const { email } = req.body;
    let userObj = await Contact.findOne({ email });
    if (userObj) {
      return res.json({
        message: "user already exist",
        success: false,
      });
    }
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.status(201).json({
      message: "user created successfully",
      savedContact,
      success: true,
    });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const contactId = async (req, res) => {
  const id = req.params.id;

  const userContact = await Contact.findById(id);

  if (!userContact)
    res.json({
      message: "not found",
      success: false,
    });

  res.json({ message: "contact found", userContact, success: true });
};

export const updateContactById = async (req, res) => {
  const id = req.params.id;

  const { name, email, phone, type } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: id },
    {
      name,
      email,
      phone,
      type,
    },
    { new: true }
  );

  if (!updatedContact)
    return res.json({
      message: "contact not exist",
      success: false,
    });
  res.json({
    message: "contact updated successfully",
    updatedContact,
    success: true,
  });
};

export const deleteContactById = async (req, res) => {
  const id = req.params.id;

  const deleteContact = await Contact.findByIdAndDelete({ _id: id });

  if (!deleteContact) {
    res.json({ message: "contact not found ", success: true });
  } else {
    res.json({ message: "conatact delete successfully", success: true });
  }
};
