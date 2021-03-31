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
  let userRole = await userRoleModel
    .find()
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
        children: [
          {
            title: "Create",
            key: "AdsCreate",
            children: [],
          },
          {
            title: "Edit",
            key: "AdsEdit",
            children: [],
          },
          {
            title: "Delete",
            key: "AdsDelete",
          },
        ],
      },
      {
        title: "Analytics",
        key: "Analytics",
        children: [
          {
            title: " Top Page",
            key: "AnalyticsTop Page",
          },
          {
            title: " Top Browser",
            key: "AnalyticsTop Browser",
          },
          {
            title: " Top Referrer",
            key: "AnalyticsTop Referrer",
          },
        ],
      },
      {
        title: " Appearance",
        key: " Appearance",
        children: [
          {
            title: "Menu",
            key: "AppearanceMenu",
            children: [
              {
                title: "Create",
                key: "AppearanceMenuCreate",
              },
              {
                title: "Edit",
                key: "AppearanceMenuEdit",
              },
              {
                title: "Delete",
                key: "AppearanceMenuDelete",
              },
            ],
          },
          {
            title: "Theme",
            key: "AppearanceTheme",
            children: [
              {
                title: "Activate",
                key: "AppearanceThemeActivate",
              },
              {
                title: "Remove",
                key: "AppearanceThemeRemove",
              },
            ],
          },
          {
            title: "Theme options",
            key: "AppearanceTheme options",
          },
          {
            title: "Custom CSS",
            key: "AppearanceCustom CSS",
          },
          {
            title: "Widgets",
            key: "AppearanceWidgets",
          },
        ],
      },
      {
        title: "Backup",
        key: "Backup",
        children: [
          {
            title: "Create",
            key: "BackupCreate",
            children: [],
          },
          {
            title: "Restore",
            key: "BackupRestore",
            children: [],
          },
          {
            title: "Delete",
            key: "BackupDelete",
          },
        ],
      },
      {
        title: "Blog",
        key: "Blog",
        children: [
          {
            title: "Posts",
            key: "BlogPosts",
            children: [
              {
                title: "Create",
                key: "BlogPostsCreate",
              },
              {
                title: "Edit",
                key: "BlogPostsEdit",
              },
              {
                title: "Delete",
                key: "BlogPostsDelete",
              },
            ],
          },
          {
            title: "Categories",
            key: "BlogCategories",
            children: [
              {
                title: "Create",
                key: "BlogCategoriesCreate",
              },
              {
                title: "Edit",
                key: "BlogCategoriesEdit",
              },
              {
                title: "Delete",
                key: "BlogCategoriesDelete",
              },
            ],
          },
          {
            title: "Tags",
            key: "BlogTags",
            children: [
              {
                title: "Create",
                key: "BlogTagsCreate",
              },
              {
                title: "Edit",
                key: "BlogTagsEdit",
              },
              {
                title: "Delete",
                key: "BlogTagsDelete",
              },
            ],
          },
        ],
      },
      {
        title: "Contacts",
        key: "Contacts",
        children: [
          {
            title: "Edit",
            key: "ContactsEdit",
          },
          {
            title: "Delete",
            key: "ContactsDelete",
          },
        ],
      },
      {
        title: " E-commerce",
        key: " E-commerce",
        children: [
          {
            title: "Reports",
            key: " E-commerceReports",
          },
          {
            title: "Products",
            key: "E-commerceProducts",
            children: [
              {
                title: "Create",
                key: "E-commerceProductsCreate",
              },
              {
                title: "Edit",
                key: "E-commerceProductsEdit",
              },
              {
                title: "Delete",
                key: "E-commerceProductsDelete",
              },
            ],
          },
          {
            title: "Product categories",
            key: "E-commerceProduct categories",
            children: [
              {
                title: "Create",
                key: "E-commerceProduct categoriesCreate",
              },
              {
                title: "Edit",
                key: "E-commerceProduct categoriesEdit",
              },
              {
                title: "Delete",
                key: "E-commerceProduct categoriesDelete",
              },
            ],
          },
          {
            title: "Brands",
            key: " E-commerceBrands",
            children: [
              {
                title: "Create",
                key: "E-commerceBrandsCreate",
              },
              {
                title: "Edit",
                key: "E-commerceBrandsEdit",
              },
              {
                title: "Delete",
                key: "E-commerceBrandsDelete",
              },
            ],
          },
          {
            title: "Product collections",
            key: "E-commerceProduct collections",
            children: [
              {
                title: "Create",
                key: "E-commerceProduct collectionsCreate",
              },
              {
                title: "Edit",
                key: "E-commerceProduct collectionsEdit",
              },
              {
                title: "Delete",
                key: "E-commerceProduct collectionsDelete",
              },
            ],
          },
          {
            title: "Product Attributes Sets",
            key: "E-commerceProduct Attributes Sets",
            children: [
              {
                title: "Create",
                key: "E-commerceProduct Attributes SetsCreate",
              },
              {
                title: "Edit",
                key: "E-commerceProduct Attributes SetsEdit",
              },
              {
                title: "Delete",
                key: "E-commerceProduct Attributes SetsDelete",
              },
            ],
          },
          {
            title: "Products Attributes",
            key: "E-commerceProducts Attributes",
            children: [
              {
                title: "Create",
                key: "E-commerceProducts AttributesCreate",
              },
              {
                title: "Edit",
                key: "E-commerceProducts AttributesEdit",
              },
              {
                title: "Delete",
                key: "E-commerceProducts AttributesDelete",
              },
            ],
          },
          {
            title: "Taxes",
            key: "E-commerceTaxes",
            children: [
              {
                title: "Create",
                key: "E-commerceTaxesCreate",
              },
              {
                title: "Edit",
                key: "E-commerceTaxesEdit",
              },
              {
                title: "Delete",
                key: "E-commerceTaxesDelete",
              },
            ],
          },
          {
            title: "Reviews",
            key: "E-commerceReviews",
            children: [
              {
                title: "Create",
                key: "E-commerceReviewsCreate",
              },
              {
                title: "Edit",
                key: "E-commerceReviewsEdit",
              },
              {
                title: "Delete",
                key: "E-commerceReviewsDelete",
              },
            ],
          },
          {
            title: "Shipping",
            key: "E-commerceShipping",
          },
          {
            title: "Orders",
            key: "E-commerceOrders",
            children: [
              {
                title: "Create",
                key: "E-commerceOrdersCreate",
              },
              {
                title: "Edit",
                key: "E-commerceOrdersEdit",
              },
            ],
          },
          {
            title: "Discounts",
            key: "E-commerceDiscounts",
            children: [
              {
                title: "Create",
                key: "E-commerceDiscountsCreate",
              },
              {
                title: "Edit",
                key: "E-commerceDiscountsEdit",
              },
              {
                title: "Delete",
                key: "E-commerceDiscountsDelete",
              },
            ],
          },
          {
            title: "Customers",
            key: "E-commerceCustomers",
            children: [
              {
                title: "Create",
                key: "E-commerceCustomersCreate",
              },
              {
                title: "Edit",
                key: "E-commerceCustomersEdit",
              },
              {
                title: "Delete",
                key: "E-commerceCustomersDelete",
              },
            ],
          },
        ],
      },
      {
        title: "Faq",
        key: "Faq",
        children: [
          {
            title: "Create",
            key: "FaqCreate",
          },
          {
            title: "Edit",
            key: "FaqEdit",
          },
          {
            title: "Delete",
            key: "FaqDelete",
          },
        ],
      },
      {
        title: "Faq Categories",
        key: "FaqCategories",
        children: [
          {
            title: "Create",
            key: "FaqCategoriesCreate",
          },
          {
            title: "Edit",
            key: "FaqCategoriesEdit",
          },
          {
            title: "Delete",
            key: "FaqCategoriesDelete",
          },
        ],
      },
      {
        title: "Flash sales",
        key: "Flashsales",
        children: [
          {
            title: "Create",
            key: "FlashsalesCreate",
          },
          {
            title: "Edit",
            key: "FlashsalesEdit",
          },
          {
            title: "Delete",
            key: "FlashsalesDelete",
          },
        ],
      },
      {
        title: "Media",
        key: "Media",
        children: [
          {
            title: "File",
            key: "MediaFile",
            children: [
              {
                title: "Create",
                key: "MediaFileCreate",
              },
              {
                title: "Edit",
                key: "MediaFileEdit",
              },
              {
                title: "Trash",
                key: "MediaFileTrash",
              },
              {
                title: "Delete",
                key: "MediaFileDelete",
              },
            ],
          },
          {
            title: "Folder",
            key: "MediaFolder",
            children: [
              {
                title: "Create",
                key: "MediaFolderCreate",
              },
              {
                title: "Edit",
                key: "MediaFolderEdit",
              },
              {
                title: "Trash",
                key: "MediaFolderTrash",
              },
              {
                title: "Delete",
                key: "MediaFolderDelete",
              },
            ],
          },
        ],
      },
      {
        title: "Newsletters",
        key: "Newsletters",
        children: [
          {
            title: "Delete",
            key: "NewslettersDelete",
          },
        ],
      },
      {
        title: "Page",
        key: "Page",
        children: [
          {
            title: "Create",
            key: "PageCreate",
          },
          {
            title: "Edit",
            key: "PageEdit",
          },
          {
            title: "Delete",
            key: "PageDelete",
          },
        ],
      },
      {
        title: "Payments",
        key: "Payments",
        children: [
          {
            title: "Settings",
            key: "PaymentsSettings",
          },
          {
            title: "Delete",
            key: "PaymentsDelete",
          },
        ],
      },
      {
        title: "Product tags",
        key: "Producttags",
        children: [
          {
            title: "Create",
            key: "ProducttagsCreate",
          },
          {
            title: "Edit",
            key: "ProducttagsEdit",
          },
          {
            title: "Delete",
            key: "ProducttagsDelete",
          },
        ],
      },
      {
        title: "Simple Sliders",
        key: "Simple Sliders",
        children: [
          {
            title: "Create",
            key: "Simple SlidersCreate",
          },
          {
            title: "Edit",
            key: "Simple SlidersEdit",
          },
          {
            title: "Delete",
            key: "Simple SlidersDelete",
          },
          {
            title: "Slider Items",
            key: "Simple Slidersslider Items",
          },
        ],
      },
      {
        title: "Social Login",
        key: "Social Login",
      },
      {
        title: "System",
        key: "System",
        children: [
          {
            title: "Users",
            key: "SystemUsers",
            children: [
              {
                title: "Create",
                key: "SystemUsersCreate",
              },
              {
                title: "Edit",
                key: "SystemUsersEdit",
              },
              {
                title: "Delete",
                key: "SystemUsersDelete",
              },
            ],
          },
          {
            title: "Roles",
            key: "SystemRoles",
            children: [
              {
                title: "Create",
                key: "SystemRolesCreate",
              },
              {
                title: "Edit",
                key: "SystemRolesEdit",
              },
              {
                title: "Delete",
                key: "SystemRolesDelete",
              },
            ],
          },
          {
            title: "Settings",
            key: "SystemSettings",
            children: [
              {
                title: "Email",
                key: "SystemSettingsEmail",
              },
              {
                title: "Media",
                key: "SystemSettingsMedia",
              },
            ],
          },
          {
            title: "Plugins",
            key: "SystemPlugins",
            children: [
              {
                title: "Activate/Deactivate",
                key: "SystemPluginsActivate/Deactivate",
              },
              {
                title: "Remove",
                key: "SystemPluginsRemove",
              },
            ],
          },
          {
            title: "Activity Logs",
            key: "SystemActivity Logs",
            children: [
              {
                title: "Delete",
                key: "SystemActivity LogsDelete",
              },
            ],
          },
        ],
      },
      {
        title: "Translation",
        key: "Translation",
        children: [
          {
            title: "Edit",
            key: "TranslationEdit",
          },
        ],
      },
    ],
  };
};
