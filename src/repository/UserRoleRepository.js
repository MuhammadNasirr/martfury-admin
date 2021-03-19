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

export const getRoles = async () => {
  //console.log(payload)
  let userRole = await userRoleModel.find();
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
      "Ads",
      "Analytics",
      "Appearence",
      "Backup",
      "Blog",
      "Contacts",
      "Ecommerce",
      "FAQs",
      "FAQ Categories",
      "Media",
      "Newsletter",
      "Page",
      "Payments",
      "Product Tags",
      "Simple Slider",
      "Social Login",
      "System",
      "Translations",
    ],
  };
};
