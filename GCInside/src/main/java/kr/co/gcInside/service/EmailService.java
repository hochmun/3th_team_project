package kr.co.gcInside.service;

import net.bytebuddy.utility.RandomString;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;
    @Autowired
    private MemberService service;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
    public String sendEmail(String toEmail, String subject, String body) throws EmailException {
        HtmlEmail email = new HtmlEmail();
        email.setHostName("smtp.gmail.com");
        email.setSmtpPort(587);
        email.setAuthenticator(new DefaultAuthenticator("me03454@gmail.com", "qpkpcresxpujrnqt"));
        email.setSSLOnConnect(true);
        email.setFrom("me03454@gmail.com", "관리자");
        email.addTo(toEmail);
        email.setSubject(subject);
        email.setCharset("utf-8"); 
        email.setContent(body, "text/html; charset=utf-8"); // 한글깨져서 추가
        return email.send();
    }
    public String sendEmailCode(String toEmail, HttpSession session)throws EmailException{
        String code = RandomStringUtils.random(8, true, true);//인증코드 8자리
        String subject = "지시인사이드 인증코드 입니다."; // 이메일 제목
        String body = "인증코드는 "+code+"<br>드래그후 복사하여 입력하세요."; // 이메일 내용
        session.setAttribute("code", code);
        sendEmail(toEmail,subject,body);
        return code;
    }

}
