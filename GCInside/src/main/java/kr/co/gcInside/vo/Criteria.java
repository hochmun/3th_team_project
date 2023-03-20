package kr.co.gcInside.vo;

import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@Data
public class Criteria {
    private int pageNum;
    private int amount;

    private String type;
    private String keyword;

    // 1번은 생성자로 무조건 실행
    // 기본페이지를 1페이지에 10개씩
    public Criteria() {
        this(1, 10);
    }

    // 매개변수로 들어오는 값을 이용하여 조정
    public Criteria(int pageNum, int amount){
        this.pageNum= pageNum;
        this.amount= amount;
    }

    public String getListLink() {
        UriComponentsBuilder builder = UriComponentsBuilder.fromPath("")
                .queryParam("pageNum",pageNum)
                .queryParam("amount",amount);

        return builder.toUriString();
    }

    public String[] getTypeArr() { // get으로 시작해야만 mybatis에서 찾음
        return type == null ? new String[]{} : type.split("");
    }
}
