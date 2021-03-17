import Folder from "../models/Folder";
import Media from "../models/Media";

export const addMedia = async (payload) => {
  const media = new Media({ ...payload.media, createdAt: new Date() });
  await media.save();
  const folder = await Folder.findOne({ _id: payload.folderId });
  if (!folder) {
    return { status: "error", message: "Folder does not exist" };
  }
  Folder.updateOne({ _id: payload.folderId }, { $push: { media: media._id } });

  return { status: "success", message: "Successfully created" };
};

export const getFolderMedia = async (folderId) => {
  const folder = await Folder.findOne({ _id: folderId }).populate({
    path: "media",
    match: { softDelete: false },
  });
  const subFolders = await Folder.find({ parent: folderId });

  if (!folder) {
    return {
      status: "error",
      message: "Folder does not exist",
    };
  }

  return {
    status: "success",
    data: {
      folder,
      subFolders,
    },
  };
};

export const renameMedia = async (mediaId, name) => {
  const lang = await Media.updateOne(
    { _id: mediaId, softDelete: false },
    { name, modifiedAt: new Date() }
  );
  console.log(lang);
  if (lang.n > 0)
    return {
      status: "success",
      message: "Media Successfully renamed",
    };
  else
    return {
      status: "fail",
      message: "Invalid Media ID",
    };
};

export const moveToTrashMedia = async (mediaId) => {
  const lang = await Media.updateOne(
    { _id: mediaId, softDelete: false },
    { softDelete: true, modifiedAt: new Date() }
  );
  console.log(lang);
  if (lang.n > 0)
    return {
      status: "success",
      message: "Media Successfully moved",
    };
  else
    return {
      status: "fail",
      message: "Invalid Media ID",
    };
};

export const moveToTrashFolder = async (folderId) => {
  const lang = await Folder.updateOne(
    { _id: folderId, softDelete: false },
    { softDelete: true, modifiedAt: new Date() }
  );
  console.log(lang);
  if (lang.n > 0)
    return {
      status: "success",
      message: "Folder Successfully moved",
    };
  else
    return {
      status: "fail",
      message: "Invalid Folder ID",
    };
};

export const createFolder = async (payload) => {
  const folder = new Folder(payload);
  await folder.save();

  return { status: "success", message: "Successfully created" };
};
export const renameFolder = async (folderId, name) => {
  const lang = await Folder.updateOne(
    { _id: folderId, softDelete: false },
    { name, modifiedAt: new Date() }
  );
  console.log(lang);
  if (lang.n > 0)
    return {
      status: "success",
      message: "Folder Successfully renamed",
    };
  else
    return {
      status: "fail",
      message: "Invalid Folder ID",
    };
};
