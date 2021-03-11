import multer from "multer";
import * as langRepo from "../repository/LanguageRepository";

export const addMedia = async (req, res, next) => {
  //   const { code, name } = req.body;
  //   let payload = {
  //     code,
  //     name,
  //   };
  //   try {
  //     let respo = await langRepo.createLang(payload);
  //     if (respo.status === "success") {
  //       res.status(200).json(respo);
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

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now());
    },
  });

  var upload = multer({ storage: storage });
  console.log(upload);
};

// export const getLang = async (req, res, next) => {
//   //   console.log(req);
//   try {
//     let respo = await langRepo.getLang();
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
// };

// // export const getContactDetails = async (req, res, next) => {
// //   //   console.log(req);
// //   const { contactId } = req.params;
// //   console.log(contactId);
// //   let id = parseInt(contactId);

// //   if (!id) {
// //     const err = new Error("Invalid ContactId provided");
// //     err.status = "fail";
// //     err.statusCode = 400;
// //     next(err);
// //     return;
// //   }

// //   try {
// //     let respo = await langRepo.getContactDetails(id, req.jwtPayload.userid);
// //     if (respo.status === "success") {
// //       if (respo.data) res.status(200).json(respo);
// //       else res.status(204).json(respo);
// //     } else {
// //       const err = new Error(respo.message);
// //       err.status = respo.status;
// //       err.statusCode = 400;
// //       next(err);
// //       return;
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     next(error);
// //   }
// // };

// // export const getPublishedTags = async (req, res, next) => {
// //   //   console.log(req);
// //   try {
// //     console.log(req.jwtPayload);
// //     let respo = await langRepo.getPublishedTags(req.jwtPayload.userid);
// //     if (respo.status === "success") {
// //       if (respo.data.length) res.status(200).json(respo);
// //       else {
// //         res.status(204).json(respo);
// //       }
// //     } else {
// //       const err = new Error(respo.message);
// //       err.status = respo.status;
// //       err.statusCode = 400;
// //       next(err);
// //       return;
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     next(error);
// //   }
// //};

// // export const updateContact = async (req, res, next) => {
// //   //   console.log(req);
// //   const { contactId } = req.params;
// //   const payload = { ...req.body };
// //   let id = parseInt(contactId);
// //   if (!id) {
// //     const err = new Error("Invalid ContactId provided");
// //     err.status = "fail";
// //     err.statusCode = 400;
// //     next(err);
// //     return;
// //   }
// //   try {
// //     let respo = await langRepo.updateContact(
// //       id,
// //       payload,
// //       req.jwtPayload.userid
// //     );
// //     if (respo.status === "success") {
// //       res.status(200).json(respo);
// //     } else {
// //       const err = new Error(respo.message);
// //       err.status = respo.status;
// //       err.statusCode = 400;
// //       next(err);
// //       return;
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     next(error);
// //   }
// // };

// // export const addReply = async (req, res, next) => {
// //   //   console.log(req);
// //   const { contactId } = req.params;
// //   const { content } = req.body;
// //   const payload = {
// //     content,
// //     createdAt: new Date(),
// //     author: req.jwtPayload.userid,
// //   };
// //   let id = parseInt(contactId);
// //   if (!id) {
// //     const err = new Error("Invalid ContactId provided");
// //     err.status = "fail";
// //     err.statusCode = 400;
// //     next(err);
// //     return;
// //   }
// //   try {
// //     let respo = await langRepo.addReply(id, payload, req.jwtPayload.userid);
// //     if (respo.status === "success") {
// //       res.status(200).json(respo);
// //     } else {
// //       const err = new Error(respo.message);
// //       err.status = respo.status;
// //       err.statusCode = 400;
// //       next(err);
// //       return;
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     next(error);
// //   }
// // };

// export const deleteLang = async (req, res, next) => {
//   //   console.log(req);
//   const { langId } = req.params;
//   let id = langId;
//   if (!id) {
//     const err = new Error("Invalid LanguageId provided");
//     err.status = "fail";
//     err.statusCode = 400;
//     next(err);
//     return;
//   }
//   try {
//     let respo = await langRepo.deleteLang(id);
//     if (respo.status === "success") {
//       res.status(200).json(respo);
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
// };
