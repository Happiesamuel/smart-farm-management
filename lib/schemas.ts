import z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ message: "Please enter your email" })
    .email({ message: "Please enter a valid email address" }),
  password: z.string({ message: "Please enter your password" }).min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
export const forgottenPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});
export const recoverPasswordFormSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set error on confirmPassword field
  });
export const setPasswordFormSchema = z
  .object({
    password: z.string({ message: "Please enter your password" }).min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z
      .string({ message: "Please enter your password" })
      .min(8, {
        message: "Password must be at least 8 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set error on confirmPassword field
  });
export const signupFormSchema = z
  .object({
    fullName: z.string({ message: "Please enter your full name" }).min(2, {
      message: "full name must be at least 2 characters.",
    }),
    phone: z.string({ message: "Please enter your phone number" }).min(11, {
      message: "Phone number must be at least 11 characters.",
    }),
    // country: z.string({
    //   required_error: "Please select a country.",
    // }),
    email: z
      .string({ message: "Please enter your email" })
      .email({ message: "Please enter a valid email address" }),
    password: z.string({ message: "Please enter your password" }).min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z
      .string({ message: "Please enter your password" })
      .min(8, {
        message: "Password must be at least 8 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set error on confirmPassword field
  });
export const profileFormSchema = z
  .object({
    curPassword: z
      .string({ message: "Please enter your current password" })
      .min(8, {
        message: "Password must be at least 8 characters.",
      }),
    password: z.string({ message: "Please enter your password" }).min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z
      .string({ message: "Please enter your password" })
      .min(8, {
        message: "Password must be at least 8 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export const financeSaleSchema = z.object({
  crop: z
    .string({ message: "Please select a crop" })
    .min(1, "Please select a crop"),
  field: z.string({ message: "Field is required" }).min(1, "Field is required"),
  quantity: z.string({ message: "Quantity is required" }).min(1, {
    message: "Quantity must be at least a characters.",
  }),
  unit: z.string({ message: "Unit is required" }).min(1, "Please select  unit"),
  unitPrice: z.string({ message: "Please enter unit price" }).min(2, {
    message: "Unit price must be at least 2 characters.",
  }),
  totalAmount: z.string({ message: "Please enter total amount" }).min(2, {
    message: "Total amountt must be at least 2 characters.",
  }),
  saleDate: z
    .string({ message: " Date is required" })
    .min(1, "Date is required"),
  buyer: z.string({ message: "Please enter buyer's name" }).min(2, {
    message: "Buyer's must be at least 2 characters.",
  }),
  paymentMethod: z
    .string({ message: "Please select payment method" })
    .min(1, "Please select a payment method"),
  notes: z.string().optional(),
});
export const createFarmSchema = z.object({
  farmName: z.string({ message: "Farm name is required" }).min(4, {
    message: "Farm name must be at least 4 characters.",
  }),
  size: z.string({ message: "Total size is required" }).min(1, {
    message: "Total size must be at least a characters.",
  }),
  unit: z.string({ message: "Unit is required" }).min(1, "Please select  unit"),
  location: z.object(
    {
      address: z.string(),
      lat: z.number(),
      lng: z.number(),
    },
    { message: "Location is required" },
  ),
  description: z
    .string({ message: "descripton is required" })
    .min(10, { message: "description must be at least 10 characters." }),
  paymentMethod: z
    .string({ message: "Please select payment method" })
    .min(1, "Please select a payment method"),
  notes: z.string().optional(),
  soilType: z
    .string({ message: "Please select a soil type" })
    .min(1, "Please select a soil type"),
  status: z
    .string({ message: "Please select a status" })
    .min(1, "Please select a status"),
  farmImage: z
    .instanceof(File, { message: "Please upload farm image." })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: "image must be smaller than 5MB.",
    }),
});
export const createFieldSchema = z.object({
  fieldName: z.string({ message: "Field name is required" }).min(4, {
    message: "Field name must be at least 4 characters.",
  }),
  farm: z
    .string({ message: "Please select farm" })
    .min(1, "Please select a farm"),
  size: z.string({ message: "Total size is required" }).min(1, {
    message: "Total size must be at least a characters.",
  }),
  unit: z.string({ message: "Unit is required" }).min(1, "Please select  unit"),
  soilType: z
    .string({ message: "Please select a soil type" })
    .min(1, "Please select a soil type"),
  irrigationType: z
    .string({ message: "Please select a irrigation type" })
    .min(1, "Please select a irrigation type")
    .optional(),
  cropType: comboSchema("Crop type is required"),
  plantingToHarvest: z
    .object(
      {
        from: z.date({
          error: "Planting date is required",
        }),
        to: z.date({
          error: "Harvest date is required",
        }),
      },
      { message: "Planting date to Harvest date is required" },
    )
    .refine((data) => data.to > data.from, {
      message: "Harvest date must be after planting date",
      path: ["to"],
    }),

  description: z
    .string({ message: "descripton is required" })
    .min(10, { message: "description must be at least 10 characters." }),
});
export const FarmInformationSchema = z.object({
  farmName: z.string({ message: "Field name is required" }).min(4, {
    message: "Field name must be at least 4 characters.",
  }),
  location: z.object(
    {
      address: z.string(),
      lat: z.number(),
      lng: z.number(),
    },
    { message: "Location is required" },
  ),
  irrigationType: z
    .string({ message: "Please select a irrigation type" })
    .min(1, "Please select a irrigation type")
    .optional(),
  farm: z
    .string({ message: "Please select farm" })
    .min(1, "Please select a farm"),

  farmSize: z.string({ message: "Expected yield is required" }).min(1, {
    message: "Expected Yield must be at least a characters.",
  }),
  unit: z.string({ message: "Unit is required" }).min(1, "Please select  unit"),

  date: z.string({ message: " Date is required" }).min(1, "Date is required"),

  status: z
    .string({ message: "Please select a status" })
    .min(1, "Please select a status"),
  soilType: z
    .string({ message: "Please select a soil type" })
    .min(1, "Please select a soil type"),
  description: z
    .string({ message: "descripton is required" })
    .min(10, { message: "description must be at least 10 characters." }),
});
export const createHarvestSchema = z.object({
  cropName: comboSchema("Crop is required"),
  buyer: z
    .string({ message: "Buyers' is required" })
    .min(4, {
      message: "Buyers' must be at least 4 characters.",
    })
    .optional(),
  date: z.string({ message: " Date is required" }).min(1, "Date is required"),
  farm: z
    .string({ message: "Please select farm" })
    .min(1, "Please select a farm"),
  field: z
    .string({ message: "Please select field" })
    .min(1, "Please select a field"),

  quantity: z.string({ message: "harvest quantity is required" }).min(1, {
    message: "harvest quantity must be at least a characters.",
  }),
  unit: z.string({ message: "Unit is required" }).min(1, "Please select  unit"),

  status: z
    .string({ message: "Please select a status" })
    .min(1, "Please select a status"),
  quality: z
    .string({ message: "Please select a quality" })
    .min(1, "Please select a quality"),
  amount: z.string({ message: "Please enter total amount" }).min(2, {
    message: "Total amountt must be at least 2 characters.",
  }),
  description: z
    .string({ message: "descripton is required" })
    .min(10, { message: "description must be at least 10 characters." }),
});
export const createCropSchema = z.object({
  cropName: comboSchema("Crop is required"),
  plantingToHarvest: z
    .object(
      {
        from: z.date({
          error: "Planting date is required",
        }),
        to: z.date({
          error: "Harvest date is required",
        }),
      },
      { message: "Planting date to Harvest date is required" },
    )
    .refine((data) => data.to > data.from, {
      message: "Harvest date must be after planting date",
      path: ["to"],
    }),
  irrigationType: z
    .string({ message: "Please select a irrigation type" })
    .min(1, "Please select a irrigation type")
    .optional(),
  farm: z
    .string({ message: "Please select farm" })
    .min(1, "Please select a farm"),
  field: z
    .string({ message: "Please select field" })
    .min(1, "Please select a field"),
  variety: z
    .string({ message: "Please select variety" })
    .min(1, "Please select variety"),
  expectedYield: z.string({ message: "Expected yield is required" }).min(1, {
    message: "Expected Yield must be at least a characters.",
  }),
  yieldUnit: z
    .string({ message: "Unit is required" })
    .min(1, "Please select  unit"),
  seedQuantity: z.string({ message: "Seed quantity is required" }).min(1, {
    message: "Seed quantity must be at least a characters.",
  }),
  seedUnit: z
    .string({ message: "Unit is required" })
    .min(1, "Please select  unit"),
  areaPlanted: z.string({ message: "Area planted is required" }).min(1, {
    message: "Area planted must be at least a characters.",
  }),
  areaUnit: z
    .string({ message: "Unit is required" })
    .min(1, "Please select  unit"),
  status: z
    .string({ message: "Please select a status" })
    .min(1, "Please select a status"),
  soilType: z
    .string({ message: "Please select a soil type" })
    .min(1, "Please select a soil type"),
  description: z
    .string({ message: "descripton is required" })
    .min(10, { message: "description must be at least 10 characters." }),
});
export const createTaskSchema = z.object({
  taskTitle: z.string({ message: "Task title is required" }).min(4, {
    message: "Task title must be at least 4 characters.",
  }),
  farm: z
    .string({ message: "Please select farm" })
    .min(1, "Please select a farm"),
  field: z
    .string({ message: "Please select farm field" })
    .min(1, "Please select farm field"),
  //optional
  priority: z
    .string({ message: "Please select priority" })
    .min(1, "Please select priority"),
  assignTo: z
    .string({ message: "Please select assignee" })
    .min(1, "Please select assignee"), //assign

  description: z
    .string({ message: "descripton is required" })
    .min(10, { message: "description must be at least 10 characters." }),

  dueDate: z
    .string({ message: " Date is required" })
    .min(1, "Date is required"),
});
export const financeExpenseSchema = z.object({
  category: z
    .string({ message: "Please select a category" })
    .min(1, "Please select a category"),

  amount: z.string({ message: "Please enter total amount" }).min(2, {
    message: "Total amountt must be at least 2 characters.",
  }),
  date: z.string({ message: " Date is required" }).min(1, "Date is required"),

  paymentMethod: z
    .string({ message: "Please select payment method" })
    .min(1, "Please select a payment method"),
  notes: z.string().optional(),
  description: z
    .string({ message: "descripton is required" })
    .min(10, { message: "description must be at least 10 characters." }),
  receipt: z
    .any()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB",
    })
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
      {
        message: "Only JPG, PNG or PDF allowed",
      },
    )
    .optional(),
});
function comboSchema(message: string) {
  return z.object(
    {
      id: z.string().optional(),
      name: z.string().min(1, message),
      isCustom: z.boolean().optional(),
    },
    { message: message },
  );
}
