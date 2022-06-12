﻿using CoursesAPI.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace CoursesAPI.Refactors
{
    public static class MailFactory
    {
        public static async void SendMail(User model, string messageBody)
        {
            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress("Kursy", "NoReply.Kursy@gmail.com");
            message.From.Add(from);
            MailboxAddress to = new MailboxAddress(model.UserName, model.Email);
            message.To.Add(to);

            message.Subject = "Szkolenia z jazd";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = messageBody;

            message.Body = bodyBuilder.ToMessageBody();


            SmtpClient smtpClient = new SmtpClient();
            smtpClient.CheckCertificateRevocation = false;
            await smtpClient.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.Auto);
            await smtpClient.AuthenticateAsync("javaprojektkursy@gmail.com", "qQ!23456");
            await smtpClient.SendAsync(message);
            await smtpClient.DisconnectAsync(true);
            smtpClient.Dispose();
        }
    }
}
