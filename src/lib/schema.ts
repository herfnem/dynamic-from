import z from "zod/v3";

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

const FILE_SCHEMA = z
  .custom<File & { preview: string }>((file) => {
    if (!(file instanceof File)) return false;
    const validType = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ].includes(file?.type);
    const validSize = file.size <= fileSizeLimit;
    return validType && validSize;
  }, "Invalid file")
  .refine((file) => file.size <= fileSizeLimit, {
    message: "File size should not exceed 5MB",
  });

const BANK_RECEIPT_SCHEMA = z.union([FILE_SCHEMA, z.string()]);

export const PaymentTrackingFormSchema = z.object({
  installmentData: z
    .array(
      z.object({
        receivedAmount: z.number().min(1, "Amount is required"),
        paidDate: z.date(),
      }),
    )
    .refine((val) => val.length > 0, {
      message: "At least one installment is required",
    }),
  bankReceipt: z
    .array(
      z.object({
        fileName: z.string(),
        imageUpdatedAt: z.string(),
        fileType: z.string(),
        signedObjectKey: BANK_RECEIPT_SCHEMA.refine((val) => val !== "", {
          message: "Bank receipt is required",
        }),
      }),
    )
    .optional(),

  notes: z.string().optional(),
});
export type PaymentTrackingFormSchemaType = z.infer<
  typeof PaymentTrackingFormSchema
>;
