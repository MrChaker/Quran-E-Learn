import { Transporter } from 'nodemailer';

const mailer = async (
  html: string,
  to: string,
  subject: string,
  transporter: Transporter
) => {
  await transporter.sendMail({
    to,
    subject,
    html,
  });
};

export const mailConfirmation = async (
  transporter: Transporter,
  url: string,
  to: string
) => {
  await mailer(
    `انقر على هذا الرابط لتأكيد بريدك الالكتروني: <a target="_blank" href="${url}">${url}</a>`,
    to,
    'تأكيد الايميل',
    transporter
  );
};
