"use server";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContactForm(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please complete the required fields before sending your inquiry.",
    };
  }

  // TODO: Connect this action to the founder's preferred email, CRM, or automation tool.
  return {
    status: "success",
    message:
      "Thanks for reaching out. This MVP placeholder confirms submission and is ready to be connected to your inbox.",
  };
}

export async function submitNewsletterForm(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return {
      status: "error",
      message: "Please enter an email address before subscribing.",
    };
  }

  // TODO: Connect this action to ConvertKit, MailerLite, or your newsletter provider of choice.
  return {
    status: "success",
    message: "You are on the list. Connect a real newsletter provider here when launch data is ready.",
  };
}
