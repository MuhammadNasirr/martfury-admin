import * as contactRepo from "../repository/ContactRepository";

export const createContact = async (req, res, next) => {
  const { name, email, phone, status, content, address, subject } = req.body;
  let payload = {
    name,
    email,
    phone,
    status,
    content,
    address,
    subject,
    createdAt: new Date(),
    author: req.jwtPayload.userid,
  };
  try {
    let respo = await contactRepo.createContact(payload);
    if (respo.status === "success") {
      res.status(200).json(respo);
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  try {
    let respo = await contactRepo.getContacts(
      page - 1 || 0,
      req.jwtPayload.userid
    );
    if (respo.status === "success") {
      if (respo.data.contacts.length) res.status(200).json(respo);
      else {
        res.status(204).json(respo);
      }
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getContactDetails = async (req, res, next) => {
  //   console.log(req);
  const { contactId } = req.params;
  console.log(contactId);
  let id = parseInt(contactId);

  if (!id) {
    const err = new Error("Invalid ContactId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await contactRepo.getContactDetails(id, req.jwtPayload.userid);
    if (respo.status === "success") {
      if (respo.data) res.status(200).json(respo);
      else res.status(204).json(respo);
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// export const getPublishedTags = async (req, res, next) => {
//   //   console.log(req);
//   try {
//     console.log(req.jwtPayload);
//     let respo = await contactRepo.getPublishedTags(req.jwtPayload.userid);
//     if (respo.status === "success") {
//       if (respo.data.length) res.status(200).json(respo);
//       else {
//         res.status(204).json(respo);
//       }
//     } else {
//       const err = new Error(respo.message);
//       err.status = respo.status;
//       err.statusCode = 400;
//       next(err);
//       return;
//     }
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
//};

export const updateContact = async (req, res, next) => {
  //   console.log(req);
  const { contactId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(contactId);
  if (!id) {
    const err = new Error("Invalid ContactId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await contactRepo.updateContact(
      id,
      payload,
      req.jwtPayload.userid
    );
    if (respo.status === "success") {
      res.status(200).json(respo);
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addReply = async (req, res, next) => {
  //   console.log(req);
  const { contactId } = req.params;
  const { content } = req.body;
  const payload = {
    content,
    createdAt: new Date(),
    author: req.jwtPayload.userid,
  };
  let id = parseInt(contactId);
  if (!id) {
    const err = new Error("Invalid ContactId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await contactRepo.addReply(id, payload, req.jwtPayload.userid);
    if (respo.status === "success") {
      res.status(200).json(respo);
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  //   console.log(req);
  const { contactId } = req.params;

  let id = parseInt(contactId);
  if (!id) {
    const err = new Error("Invalid ContactId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await contactRepo.deleteContact(id, req.jwtPayload.userid);
    if (respo.status === "success") {
      res.status(200).json(respo);
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
