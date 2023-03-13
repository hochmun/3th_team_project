package kr.co.gcInside.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "gc_member")
public class UserEntity {
    @Id
    @Column(name = "member_uid")
    private String member_uid;
    private String member_pass;
    private String member_email;
    private String member_nick;
    private int member_point;
    private String member_regip;
    private int member_grade;
    private int member_status;
    private String member_rdate;
    private String member_wdate;
    private String member_sanctions_rdate;
    private String member_sanctions_wdate;
    private int member_sanctions_grade;
}
