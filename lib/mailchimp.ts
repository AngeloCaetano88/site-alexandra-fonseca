import mailchimp from "@mailchimp/mailchimp_marketing";

export const hasMailchimp = Boolean(
  process.env.MAILCHIMP_API_KEY &&
    process.env.MAILCHIMP_AUDIENCE_ID &&
    process.env.MAILCHIMP_SERVER_PREFIX
);

if (hasMailchimp) {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });
}

export async function subscribeToNewsletter(email: string) {
  if (!hasMailchimp) return;

  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID!;
  await mailchimp.lists.addListMember(audienceId, {
    email_address: email,
    status: "subscribed",
  });
}
