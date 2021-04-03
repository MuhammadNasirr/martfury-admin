import userRoleModel from "../models/UserRole";

export const createRole = async (payload) => {
  //console.log(payload)

  let user = new userRoleModel(payload);
  const userData = await user.save();
  return {
    status: "success",
    message: "role created",
  };
};

export const getRoles = async (query) => {
  //console.log(payload)
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  let userRole = await userRoleModel
    .find({ ...query })
    .populate({ path: "createdBy", select: "name -_id" })
    .select("-permissions");
  return {
    status: "success",
    data: userRole,
  };
};

export const getRoleDetails = async (id) => {
  //console.log(payload)
  let userRole = await userRoleModel
    .findOne({ id: id })
    .populate({ path: "createdBy", select: "name _id" });
  return {
    status: "success",
    data: userRole,
  };
};

export const updateRole = async (id, payload) => {
  console.log(id);
  let role = await userRoleModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  console.log(role);
  if (role.n > 0) {
    return {
      status: "success",
      message: "Role Successfully updated",
    };
  } else
    return {
      status: "fail",
      message: "Invalid` RoleId",
    };
};

export const deleteRole = async (id) => {
  const user = await userRoleModel.deleteOne({ id: id });
  console.log(user);
  if (user.n > 0)
    return {
      status: "success",
      message: "Role Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Invalid` RoleId",
    };
};

export const getPermissions = async () => {
  return {
    status: "success",
    permissions: [
      {
        title: "Ads",
        key: "Ads",
        children: [],
      },
      {
        title: "Analytics",
        key: "Analytics",
        children: [],
      },
      {
        title: " Appearance",
        key: " Appearance",
        children: [],
      },
      {
        title: "Backup",
        key: "Backup",
        children: [],
      },
      {
        title: "Blog",
        key: "Blog",
        children: [],
      },
      {
        title: "Contacts",
        key: "Contacts",
        children: [],
      },
      {
        title: " E-commerce",
        key: " E-commerce",
        children: [],
      },
      {
        title: "Faq",
        key: "Faq",
        children: [],
      },
      {
        title: "Faq Categories",
        key: "FaqCategories",
        children: [],
      },
      {
        title: "Flash sales",
        key: "Flashsales",
        children: [],
      },
      {
        title: "Media",
        key: "Media",
        children: [],
      },
      {
        title: "Newsletters",
        key: "Newsletters",
        children: [],
      },
      {
        title: "Page",
        key: "Page",
        children: [],
      },
      {
        title: "Payments",
        key: "Payments",
        children: [],
      },
      {
        title: "Product tags",
        key: "Producttags",
        children: [],
      },
      {
        title: "Simple Sliders",
        key: "Simple Sliders",
        children: [],
      },
      {
        title: "Social Login",
        key: "Social Login",
      },
      {
        title: "System",
        key: "System",
        children: [],
      },
      {
        title: "Translation",
        key: "Translation",
        children: [],
      },
    ],
  };
};
