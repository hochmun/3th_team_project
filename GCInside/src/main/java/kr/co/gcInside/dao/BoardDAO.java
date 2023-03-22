package kr.co.gcInside.dao;

import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_articleVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * 2023/03/20 // 심규영 // 보드 dao 생성
 */
@Mapper
@Repository
public interface BoardDAO {
    // create

    /**
     * 2023/03/22 // 심규영 // 게시물 작성 DAO
     * @param data
     * @return
     */
    public int insertArticle(Map<String, String> data);

    // read

    /**
     * 2023/03/20 // 심규영 // 갤러리 정보 불러오기
     * @param gell_address
     * @return
     */
    public galleryVO selectGellInfo(@Param("gell_address") String gell_address);

    /**
     * 2023/03/22 // 심규영 // 갤러리 존재 유무 확인용
     * @param gell_num
     * @return
     */
    public int selectGellCheck(@Param("gell_num") String gell_num);

    /**
     * 2023/03/22 // 심규영 // 유저 존재 유무 확인용
     * @param member_uid
     * @return
     */
    public int  selectMemberCheck(@Param("member_uid") String member_uid);

    /**
     * 2023/03/22 // 심규영 // 말머리 확인용
     * @param sub_cate
     * @param gell_num
     * @return
     */
    public int selectSubCateCheck(@Param("sub_cate") String sub_cate, @Param("gell_num") String gell_num);

    // upload
    // delete
}
