package kr.co.gcInside.utill;


import kr.co.gcInside.dto.PagingDTO;

/**
 * 페이징 처리 도구<br>
 * 2023/03/23 // 심규영 // 페이지당 게시물 개수 지정 가능하게 변경
 * @since 2023/02/09 // 심규영 // 페이징 처리 도구 생성
 */
public class PagingUtil {

    /**
     * 페이지 시작값 계산
     * @since 2023/02/09 // 심규영 // 최초작성
     * @param currntPage 현재 페이지
     * @return int // 페이지 시작값
     */
    public int getLimitStart(int currntPage, int count) {
        return (currntPage - 1) * count;
    }

    /**
     * 현재 페이지 계산
     * @since 2023/02/09 // 심규영 // 최초작성
     * @param pg // 현재 페이지 값(String)
     * @return int // 현재 페이지
     */
    public int getCurrentPage(String pg) {
        int currnetPage = 1;

        if(pg != null && pg != "") currnetPage = Integer.parseInt(pg);

        return currnetPage;
    }

    /**
     * 마지막 페이지 번호 계산
     * @since 2023/02/09 // 심규영 // 최초작성
     * @param total // 게시물 전체 갯수
     * @return int // 마지막 페이지 번호 리턴
     */
    public int getLastPageNum(int total, int count) {
        int lastPage = 0;

        if(total == 0) return 1;

        if (total % count == 0) {
            lastPage = (int) (total / count);
        } else {
            lastPage = (int) (total / count) + 1;
        }

        return lastPage;
    }

    /**
     * 페이지 시작 번호 계산
     * @since 2023/02/09 // 심규영 // 최초작성
     * @param total 게시물 전체 갯수
     * @param start 페이지 시작 값
     * @return 페이지 시작 번호 리턴
     */
    public int getPageStartNum(int total, int start) {
        return (int) (total - start);
    }

    /**
     * 페이지 그룹 시작 번호 및 끝 번호 계산
     * @since 2023/02/09 // 심규영 // 최초작성
     * @param currentPage 현재 페이지 번호
     * @param lastPage 마지막 페이지 번호
     * @return 그룹 시작 번호, 그룹 끝 번호
     */
    public int[] getPageGroup(int currentPage, int lastPage, int groupCount) {
        int groupCurrent = (int) Math.ceil(currentPage / (double)groupCount);
        int groupStart = (groupCurrent - 1) * groupCount + 1;
        int groupEnd = groupCurrent * groupCount;

        if(groupEnd > lastPage) groupEnd = lastPage;

        int[] groups = {groupStart, groupEnd};

        return groups;
    }

    /**
     * 페이징 처리후 DTO에 담아서 리턴<br>
     * 기본 페이지당 게시물 개수 10개
     * @since 2023/02/09 // 심규영 // 최초작성
     * @return PagingDTO // 데이터 저장 객체
     */
    public PagingDTO getPagingDTO(String pg, int total) {
        int currentPage = getCurrentPage(pg);
        int start = getLimitStart(currentPage, 10);
        int lastPage = getLastPageNum(total, 10);
        int pageStartNum = getPageStartNum(total, start);
        int groups[] = getPageGroup(currentPage, lastPage, 10);

        return new PagingDTO(groups[0], groups[1], currentPage,lastPage,start);
    }

    /**
     * 2023/03/23 // 심규영 // 페이지당 개수 지정 추가 <br>
     * 잘못된 형태 사용하지 말것
     * @param pg
     * @param total
     * @param count
     * @return
     */
    public PagingDTO getPagingDTO(String pg, int total, String count) {
        int countNum = Integer.parseInt(count);
        int currentPage = getCurrentPage(pg);
        int start = getLimitStart(currentPage, countNum);
        int lastPage = getLastPageNum(total, countNum);
        int pageStartNum = getPageStartNum(total, start);
        int groups[] = getPageGroup(currentPage, lastPage, countNum);

        return new PagingDTO(groups[0], groups[1], currentPage,lastPage,start);
    }

    /**
     * 2023/04/05 // 심규영 // 페이지당 개수 지정 및 그룹당 페이지 개수 지정
     * @param pg
     * @param total
     * @param count
     * @return
     */
    public PagingDTO getPagingDTO(String pg, int total, String count, String groupCount) {
        int countNum = Integer.parseInt(count);
        int groupCountNum = Integer.parseInt(groupCount);
        int currentPage = getCurrentPage(pg);
        int start = getLimitStart(currentPage, countNum);
        int lastPage = getLastPageNum(total, countNum);
        int pageStartNum = getPageStartNum(total, start);
        int groups[] = getPageGroup(currentPage, lastPage, groupCountNum);

        return new PagingDTO(groups[0], groups[1], currentPage,lastPage,start);
    }

}
